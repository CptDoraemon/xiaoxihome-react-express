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
  const tiles = [];
  const minTilesInRow = 2;
  const maxTilesInRow = 4;

  const shorter = Math.min(width, height);
  let count = minTilesInRow;
  while (shorter / count > 200 && count <= maxTilesInRow) {
    count++
  }
  if (count === maxTilesInRow + 1) count--;
  const tileSize = Math.floor(shorter / count);

  const xResidual = width % tileSize;
  const yResidual = height % tileSize;
  const xEdgeAdd = Math.floor(xResidual / 2);
  const yEdgeAdd = Math.floor(yResidual / 2);
  const countX = Math.floor(width / tileSize);
  const countY = Math.floor(height / tileSize);

  for (let y=0; y<countY; y++) {
    for (let x=0; x<countX; x++) {
      tiles.push({
        x: x === 0 ? 0 : x * tileSize + xEdgeAdd,
        y: y === 0 ? 0 : y * tileSize + yEdgeAdd,
        width: x === 0 || x === countX - 1 ? tileSize + xEdgeAdd : tileSize,
        height: y === 0 || y === countY - 1 ? tileSize + yEdgeAdd : tileSize,
      })
    }
  }

  console.log(tiles);
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
