const https = require('https');
const sizeOf = require('image-size');
const sharp = require('sharp');
const cors = require('cors');
const corsOptions = {
  origin: ['http://localhost:3000'],
  maxAge: 31536000,
  methods: 'POST'
};

const IMAGE_COUNT = 3;

const getCoverImage = (app) => {

  const cachedOriginalImages = getOriginalImages();

  app.get('/api/xiaoxihome/get-cover-image', cors(corsOptions), async (req, res) => {
    try {
      const isReturningViewer = req.query.isReturningViewer === 'true';
      const width = parseInt(req.query.width);
      const height = parseInt(req.query.height);

      const imageOrder = initImageOrder(isReturningViewer);

      // use cache if image is already cached
      // otherwise request image and set cache
      let image;
      if (cachedOriginalImages[imageOrder]) {
        image = cachedOriginalImages[imageOrder]
      } else {
        const url = getImageUrl(imageOrder);
        image = await loadImage(url);
        cachedOriginalImages[imageOrder] = image
      }

      const base64 = await toBase64(image, width, height);
      const prefix = "data:image/jpeg;base64,";

      res.json({
        status: 'ok',
        data: `${prefix}${base64}`
      })
    } catch (e) {
      console.log(e);
      res.json({
        status: 'error',
        data: 'server error'
      })
    }
  });
};

// return buffer
function loadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const data = [];

      res.on('data', (chunk) => {
        data.push(chunk);
      });

      res.on('end', () => {
        resolve(Buffer.concat(data));
      });

      res.on('error', (e) => {
        reject(e)
      })
    });
  })
}

function toBase64(image, width, height) {
  return new Promise((resolve, reject) => {
    const imageSize = sizeOf(image);

    const sourceWidth = imageSize.width;
    const sourceHeight = imageSize.height;
    const targetWidth = width || sourceWidth;
    const targetHeight = height || sourceHeight;
    const sourceWidthStretched = sourceWidth * height / sourceHeight;

    let sx = 0;
    let sy = 0;
    let sw = 0;
    let sh = 0;

    if (sourceWidthStretched >= targetWidth) {
      const offsetXPercentage = (sourceWidthStretched - targetWidth) / 2 / sourceWidthStretched;
      sx = offsetXPercentage * sourceWidth;
      sw = sourceWidth - 2 * offsetXPercentage * sourceWidth;
      sh = sourceHeight;
    } else {
      const sourceHeightStretched = sourceHeight * targetWidth / sourceWidth;
      const offsetYPercentage = (sourceHeightStretched - targetHeight) / 2 / sourceHeightStretched;
      sy = offsetYPercentage * sourceHeight;
      sw = sourceWidth;
      sh = sourceHeight - 2 * offsetYPercentage * sourceHeight;
    }

    const option = {left: sx, top: sy, width: sw, height: sh};
    Object.keys(option).forEach(key => option[key] = Math.round(option[key]));

    sharp(image)
      .extract(option)
      .resize(targetWidth, targetHeight)
      .jpeg()
      // default 80 quality for jpeg
      .toBuffer((err, buffer) => {
        if (err) {
          reject(err);
        }
        resolve(buffer.toString('base64'))
      });
  });
}

const getOriginalImages = () => {
  const cachedOriginalImages = {};
  const promises = [];
  for (let i=0; i<IMAGE_COUNT; i++) {
    promises.push(loadImage(getImageUrl(i)))
  }

  Promise.all(promises)
    .then(images => {
      images.forEach((image, i) => {
        cachedOriginalImages[i] = image
      })
    })
    .catch(e => console.log(e));

  return cachedOriginalImages
};

/**
 * if visited first time, return 1
 * else return a number in range [1, 3]
 * used to determine image file name
 */
function initImageOrder(isReturningViewer) {
  let imageOrder = 0;
  if (isReturningViewer) {
    imageOrder = (Date.now() % IMAGE_COUNT);
  }
  return imageOrder;
}

function getImageUrl(imageIndex) {
  return `https://xiaoxihome.s3.us-east-2.amazonaws.com/galleryphoto/cover/cover-${imageIndex + 1}-original.jpg`
}

module.exports = getCoverImage;
