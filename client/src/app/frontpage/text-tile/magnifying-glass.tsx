import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const size = 80;
const useStyles = makeStyles({
    root: {
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        border: 'solid 2px #fff',
        overflow: 'hidden',
    },
    scale: {
        transform: 'scale(1.5)',
        position: 'absolute',
    }
});

interface MagnifyingGlassProps {
    x: number,
    y: number,
    zIndex: number,
}

const MagnifyingGlass: React.FC<MagnifyingGlassProps> = ({children, x, y, zIndex}) => {
    const classes = useStyles();
    const xOffset = x - 0.5 * size;
    const yOffset = y - 0.5 * size;

    return (
        <div
            style={{left: `${xOffset}px`, top: `${yOffset}px`, zIndex: zIndex}}
            className={classes.root}
        >
            <div
                style={{left: `${-xOffset}px`, top: `${-yOffset}px`, transformOrigin: `${x}px ${y}px`}}
                className={classes.scale}
            >
                { children }
            </div>
        </div>
    )
};

export default MagnifyingGlass
