import React, {useEffect, useRef, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from 'clsx';

const drawImageOnCanvas = (canvas: HTMLCanvasElement, width: number, height: number, x: number, y: number, image: HTMLImageElement) => {
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(image, x, y, width, height, 0, 0, canvas.width, canvas.height)
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
    transform: 'rotateX(180deg)',
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
  back: {
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
  animationDuration: number
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
     animationDuration
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
        if(!frontRef || !frontRef.current || !image) return;
        drawImageOnCanvas(frontRef.current, width, height, x, y, image)
      })
    }, [image]);

    useEffect(() => {
      setTimeout(() => {
        if(!backRef || !backRef.current || !preloadImage) return;
        drawImageOnCanvas(backRef.current, width, height, x, y, preloadImage)
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
