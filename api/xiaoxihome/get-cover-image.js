const { createCanvas, loadImage } = require('canvas');

const IMAGE_COUNT = 3;

const getCoverImage = (app) => {

  const cachedOriginalImages = getOriginalImages();

  app.get('/api/xiaoxihome/get-cover-image', async (req, res) => {
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
  let canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  const sourceWidth = image.naturalWidth;
  const sourceHeight = image.naturalHeight;
  const sourceWidthStretched = sourceWidth * height / sourceHeight;

  if (sourceWidthStretched >= width) {
    const offsetXPercentage = (sourceWidthStretched - width) / 2 / sourceWidthStretched;
    ctx.drawImage(
      image,
      offsetXPercentage * sourceWidth,
      0,
      sourceWidth - 2 * offsetXPercentage * sourceWidth,
      sourceHeight,
      0, 0, width, height);
  } else {
    const sourceHeightStretched = sourceHeight * width / sourceWidth;
    const offsetYPercentage = (sourceHeightStretched - height) / 2 / sourceHeightStretched;
    ctx.drawImage(
      image,
      0,
      offsetYPercentage * sourceHeight,
      sourceWidth,
      sourceHeight - 2 * offsetYPercentage * sourceHeight,
      0, 0, width, height);
  }

  return canvas.toDataURL('image/jpeg', 0.7);
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
