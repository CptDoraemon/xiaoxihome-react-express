import React, {useEffect, useRef, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from 'clsx';

// in order to make flip box to work properly in Firefox, in both desktop AND mobile
// 1. the element that flips has to be the direct parent of .front and .back, i.e. .wrapper
// 2. .front does not rotate at the beginning while .back 'rotateX(180deg)'
// 3. backfaceVisibility: 'hidden' on both .front and .back
// 4. right order of DOM element (.back is actually on TOP of .front), this one is important for Android Firefox.

const drawImageOnCanvas = (canvas: HTMLCanvasElement, width: number, height: number, x: number, y: number, image: HTMLImageElement, scale?: number) => {
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (scale && scale !== 1) {
    ctx?.drawImage(
      image,
      Math.floor(x / scale),
      Math.floor(y / scale),
      Math.ceil(width / scale),
      Math.ceil(height / scale), 0, 0, canvas.width, canvas.height)
  } else {
    ctx?.drawImage(image, x, y, width, height, 0, 0, canvas.width, canvas.height)
  }
};

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    perspective: '1000px'
  },
  wrapper: {
    position: 'relative',
    transformStyle: 'preserve-3d'
  },
  active: {
    transform: 'rotateX(180deg)'
  },
  front: {
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
  back: {
    transform: 'rotateX(180deg)',
    position: 'absolute',
    backfaceVisibility: 'hidden',
  }
});

interface CoverBackgroundTileProps {
  image: HTMLImageElement | null,
  preloadImage: HTMLImageElement | null,
  delay: number,
  x: number,
  y: number,
  width: number,
  height: number,
  animationDuration: number,
  scale: number
}

const CoverBackgroundTile: React.FC<CoverBackgroundTileProps> =
  ({
    image,
    preloadImage,
    delay,
    x,
    y,
    width,
    height,
     animationDuration,
     scale
   }) => {
    const classes = useStyles();
    const [active, setActive] = useState(false);
    const frontRef = useRef<HTMLCanvasElement>(null);
    const backRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      if (image) {
        setTimeout(() => {
          setActive(true)
        }, delay)
      }
    }, [image]);

    useEffect(() => {
      setTimeout(() => {
        if(!backRef || !backRef.current || !image) return;
        drawImageOnCanvas(backRef.current, width, height, x, y, image, scale)
      })
    }, [image]);

    useEffect(() => {
      setTimeout(() => {
        if(!frontRef || !frontRef.current || !preloadImage) return;
        drawImageOnCanvas(frontRef.current, width, height, x, y, preloadImage)
      })
    }, [preloadImage]);


    return (
      <div
        className={classes.root}
        style={{
          top: y,
          left: x,
          width,
          height,
        }}
      >
        <div className={clsx(classes.wrapper, active && classes.active)}
             style={{
               width,
               height,
               transition: `transform ${animationDuration}ms`
             }}>
          <canvas
            ref={frontRef}
            className={classes.front}
          />
          <canvas
            ref={backRef}
            className={classes.back}
          />
        </div>
      </div>
    )
  };

export default CoverBackgroundTile
