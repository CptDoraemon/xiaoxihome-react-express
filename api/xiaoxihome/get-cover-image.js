const { createCanvas, loadImage } = require('canvas');
// loadImage has memory leak somehow in canvas library
const https = require('https');
const cors = require('cors');
const corsOptions = {
  origin: '*',
  maxAge: 31536000,
  methods: 'GET'
};

const IMAGE_COUNT = 3;

const getCoverImage = (app) => {

  const cachedOriginalImages = getOriginalImages();

  app.get('/api/xiaoxihome/get-cover-image', cors(corsOptions), async (req, res) => {
    // logMemoryUsage();
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

      const base64 = toBase64(image, width || image.naturalWidth, height || image.naturalHeight);

      // logMemoryUsage();
      res.json({
        status: 'ok',
        data: base64
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

function toBase64(image, width, height) {
  let targetWidth = width;
  let targetHeight = height;
  const sourceWidth = image.naturalWidth;
  const sourceHeight = image.naturalHeight;
  const sourceWHRatio = sourceWidth / sourceHeight;

  // do not enlarge, max size of the canvas is the size of the source image
  if (width > sourceWidth) {
    const targetWHRatio = width / height;
    // use sourceWidth
    targetWidth = sourceWidth;
    targetHeight = targetWidth / targetWHRatio;
    if (targetHeight > sourceHeight) {
      targetHeight = sourceHeight;
      targetWidth = targetWHRatio * targetHeight;
    }
  } else if (height > sourceHeight) {
    // use sourceHeight
    const targetWHRatio = width / height;
    targetHeight = sourceHeight;
    targetWidth = targetHeight * targetWHRatio;
    if (targetWidth > sourceWidth) {
      targetWidth = sourceWidth;
      targetHeight = targetWidth / targetWHRatio;
    }
  }

  const canvas = createCanvas(targetWidth, targetHeight);
  const ctx = canvas.getContext('2d');
  const sourceWidthStretched = sourceWHRatio * targetHeight;

  if (sourceWidthStretched >= targetWidth) {
    const offsetXPercentage = (sourceWidthStretched - targetWidth) / 2 / sourceWidthStretched;
    ctx.drawImage(
      image,
      offsetXPercentage * sourceWidth,
      0,
      sourceWidth - 2 * offsetXPercentage * sourceWidth,
      sourceHeight,
      0, 0, targetWidth, targetHeight);
  } else {
    const sourceHeightStretched = sourceHeight * targetWidth / sourceWidth;
    const offsetYPercentage = (sourceHeightStretched - targetHeight) / 2 / sourceHeightStretched;
    ctx.drawImage(
      image,
      0,
      offsetYPercentage * sourceHeight,
      sourceWidth,
      sourceHeight - 2 * offsetYPercentage * sourceHeight,
      0, 0, targetWidth, targetHeight);
  }

  return  canvas.toDataURL('image/jpeg', 0.7);
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
  return `https://xiaoxihome.s3.us-east-2.amazonaws.com/galleryphoto/cover/cover-${imageIndex + 1}-5k.jpg`
}

function logMemoryUsage() {
  const obj = process.memoryUsage();
  Object.keys(obj).forEach(key => obj[key] = obj[key] / 1024 / 1024);
  console.log(obj)
}

function _loadImage(url) {
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

module.exports = getCoverImage;
