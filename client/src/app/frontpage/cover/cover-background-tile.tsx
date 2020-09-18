import React, {useEffect, useRef, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    transition: 'transform 1.5s',
    transformStyle: 'preserve-3d',
    backfaceVisibility: 'visible',
    position: 'absolute'
  },
  active: {
    transform: 'rotateX(0deg)'
  },
  inactive: {
    transform: 'rotateX(180deg)'
  }
});

interface CoverBackgroundTileProps {
  image: HTMLImageElement,
  delay: number,
  x: number,
  y: number,
  width: number,
  height: number
}

const CoverBackgroundTile: React.FC<CoverBackgroundTileProps> =
  ({
    image,
    delay,
    x,
    y,
    width,
    height
   }) => {
    const classes = useStyles();
    const [active, setActive] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      setTimeout(() => {
        setActive(true)
      }, delay)
    }, []);

    useEffect(() => {
      if(!canvasRef || !canvasRef.current) return;
      const canvas = canvasRef.current;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      ctx?.drawImage(image, x, y, width, height, 0, 0, canvas.width, canvas.height)
    }, []);


    return (
      <canvas
        // src={srcUrl}
        // alt={`cover image`}
        ref={canvasRef}
        className={clsx(classes.root, active && classes.active, !active && classes.inactive)}
        style={{
          top: y,
          left: x
        }}
      />
    )
  };

export default CoverBackgroundTile
