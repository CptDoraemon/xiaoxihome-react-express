import React, {useEffect, useMemo, useRef, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CoverBackgroundTile from "./cover-background-tile";

interface ScreenTile {
  x: number,
  y: number,
  width: number,
  height: number,
  xIndex: number,
  yIndex: number
}

const divideScreen = (width: number, height: number): ScreenTile[] => {
  // divide the screen into square tiles
  // the size of tiles are determined by the shorter edge of the screen
  // the number of the tiles in a row at the shorter edge is bounded by the min and max
  // I want the number of tiles to be as large as possible but the tile size cannot be smaller by minSize
  // edge case: if the tile size is smaller than minSize even at minTilesInRow, calculate the tile size according to minTilesInRow then.
  const tiles = [];
  const minTilesInRow = 2;
  const maxTilesInRow = 4;
  const minSize = 200;

  const shorter = Math.min(width, height);
  let count = minTilesInRow;
  while (count < maxTilesInRow) {
    if (shorter / (count + 1) < minSize) {
      break
    }
    count++
  }
  const tileSize = Math.floor(shorter / count);

  // there might be residuals after the screen is divided into square tiles
  // pad those residuals into the edge tiles
  // make sure everything is an integer so that there won't be gaps in canvas
  const xResidual = width % tileSize;
  const yResidual = height % tileSize;
  const xPaddingFirst = Math.floor(xResidual / 2);
  const yPaddingFirst = Math.floor(yResidual / 2);
  const xPaddingLast = xResidual - xPaddingFirst;
  const yPaddingLast = yResidual - yPaddingFirst;
  const countX = Math.floor(width / tileSize);
  const countY = Math.floor(height / tileSize);

  for (let y=0; y<countY; y++) {
    for (let x=0; x<countX; x++) {
      tiles.push({
        x: x === 0 ? 0 : x * tileSize + xPaddingFirst,
        y: y === 0 ? 0 : y * tileSize + yPaddingFirst,
        width: x === 0 ? tileSize + xPaddingFirst : x === countX - 1 ? tileSize + xPaddingLast : tileSize,
        height: y === 0 ? tileSize + yPaddingFirst : y === countY - 1 ? tileSize + yPaddingLast : tileSize,
        xIndex: x,
        yIndex: y
      })
    }
  }

  return tiles
};

const useGetPreloadImage = (ref: React.RefObject<HTMLDivElement>) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if(!ref || !ref.current) return;
    const canvas = document.createElement('canvas');
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const grd = ctx.createLinearGradient(0, 0, 0, height);
    grd.addColorStop(0, "#0F2027");
    grd.addColorStop(0.5, "#203A43");
    grd.addColorStop(1, "#2C5364");

    ctx.fillStyle = grd;
    ctx.rect(0, 0, width, height);
    ctx.fill();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = "white";
    ctx.font = `800 ${Math.floor(Math.min(width, height) / 10)}px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif`;
    ctx.fillText('XIAOXIHOME', width / 2, height / 2);

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const image = new Image();
      image.src = url;
      image.onload = (() => {
        setImage(image);
        URL.revokeObjectURL(url)
      });
      canvas.parentNode?.removeChild(canvas)
    });
  }, []);

  return image
};

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
    position: 'relative'
  }
});

interface CoverBackgroundProps {
  image: HTMLImageElement | null,
  maxDelay: number,
  duration: number
}

const CoverBackground: React.FC<CoverBackgroundProps> =
  ({
    image,
    maxDelay,
    duration
  }) => {
  const classes = useStyles();
  const containerRef = useRef<HTMLDivElement>(null);
  const preloadImage = useGetPreloadImage(containerRef);

  const imageTiles = useMemo(() => {
    if (!containerRef || !containerRef.current) return [];

    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const tiles = divideScreen(width, height);
    const animationGap = maxDelay / (tiles[tiles.length - 1].xIndex + tiles[tiles.length - 1].yIndex);

    return tiles.map((obj, i) => (
      <CoverBackgroundTile
        image={image}
        preloadImage={preloadImage}
        key={i}
        delay={(obj.xIndex + obj.yIndex + 1) * animationGap}
        animationDuration={duration}
        x={obj.x}
        y={obj.y}
        width={obj.width}
        height={obj.height}
      />
    ));
  }, [image, preloadImage]);

  return (
    <div ref={containerRef} className={classes.root}>
      {imageTiles}
    </div>
  )
};

export default CoverBackground
