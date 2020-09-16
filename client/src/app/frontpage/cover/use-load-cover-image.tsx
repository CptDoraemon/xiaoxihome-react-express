import {useEffect, useMemo, useState, RefObject} from "react";
import Pica from 'pica'

const pica = new Pica();

/**
 * if visited first time, return 1
 * else return a number in range [1, 3]
 * used to determine image file name
 */
function initImageOrder() {
  const isReturningViewer = window.localStorage.getItem('isReturningViewer') === 'true';
  let imageOrder;
  const imageCount = 3;
  if (isReturningViewer) {
    imageOrder = (Date.now() % imageCount) + 1;
  } else {
    window.localStorage.setItem('isReturningViewer', 'true');
    imageOrder = 1;
  }
  return imageOrder;
}

function loadImage (src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.onload = () => resolve(image);
    image.onerror = err => reject(err);
    image.src = src;
  });
}

function resize(image: HTMLImageElement, width: number, height: number) {
 return new Promise<string>((resolve, reject) => {
   let canvas: null | HTMLCanvasElement = document.createElement('canvas');
   const ctx = canvas.getContext('2d');
   canvas.width = width;
   canvas.height = height;

   const sourceWidth = image.naturalWidth;
   const sourceHeight = image.naturalHeight;

   const sourceWidthStretched = sourceWidth * height / sourceHeight;
   if (sourceWidthStretched >= width) {
     const offsetXPercentage = (sourceWidthStretched - width) / 2 / sourceWidthStretched;
     ctx?.drawImage(
       image,
       offsetXPercentage * sourceWidth,
       0,
       sourceWidth - 2 * offsetXPercentage * sourceWidth,
       sourceHeight,
       0, 0, width, height);
   } else {
     const sourceHeightStretched = sourceHeight * width / sourceWidth;
     const offsetYPercentage = (sourceHeightStretched - height) / 2 / sourceHeightStretched;
     ctx?.drawImage(
       image,
       0,
       offsetYPercentage * sourceHeight,
       sourceWidth,
       sourceHeight - 2 * offsetYPercentage * sourceHeight,
       0, 0, width, height);
   }

   const url = canvas.toDataURL('image/jpeg', 1.0);
   canvas?.parentNode?.removeChild(canvas);
   canvas = null;

   resolve(url)
 })
}

const useLoadCoverImage = (animationDuration: number, imageContainerRef: RefObject<HTMLDivElement>) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [src, setSrc] = useState('');
  const [isLoaderShown, setIsLoaderShown] = useState(true);

  const coverImageUrl = useMemo(() => {
    const imageOrder = initImageOrder();
    return window.innerWidth <= 800
      ? `https://xiaoxihome.s3.us-east-2.amazonaws.com/galleryphoto/cover/cover-${imageOrder}-mobile.jpg`
      : `https://xiaoxihome.s3.us-east-2.amazonaws.com/galleryphoto/cover/cover-${imageOrder}-5k.jpg`;
  }, []);

  useEffect(() => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    setWidth(rect.width);
    setHeight(rect.height);
  }, []);

  useEffect(() => {
    if (!width || !height) return;
    if (src !== '') return;

    (async () => {
      try {
        const image = await loadImage(coverImageUrl);
        const resizedSrc = await resize(image, width, height);
        setSrc(resizedSrc);
        setTimeout(() => setIsLoaderShown(false), animationDuration * 1.5)
      } catch (e) {
        console.log(e);
      }
    })();
  }, [width, height, src]);

  return {
    src,
    isLoaderShown,
  }
};

export default useLoadCoverImage
