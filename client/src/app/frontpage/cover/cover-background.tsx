import React, {useMemo, useRef} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CoverBackgroundTile from "./cover-background-tile";

interface ScreenTile {
  x: number,
  y: number,
  width: number,
  height: number
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
    if (shorter / count < minSize) {
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
      })
    }
  }

  return tiles
};

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
    position: 'relative',
    perspective: 1000
  }
});

interface CoverBackgroundProps {
  image: HTMLImageElement | null
  animationDuration: number
}

const CoverBackground: React.FC<CoverBackgroundProps> =
  ({
     image,
     animationDuration
  }) => {
  const classes = useStyles();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageLoaded = image !== null;


  const imageTiles = useMemo(() => {
    if (!containerRef || !containerRef.current || image === null) return [];

    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const tiles = divideScreen(width, height);

    return tiles.map((obj, i) => (
      <CoverBackgroundTile
        image={image}
        key={i}
        delay={Math.ceil(Math.random() * 5) * 200}
        x={obj.x}
        y={obj.y}
        width={obj.width}
        height={obj.height}/>
    ));
  }, [image]);

  return (
    <div ref={containerRef} className={classes.root}>
      {
        imageLoaded && imageTiles
      }
    </div>
  )
};

export default CoverBackground
