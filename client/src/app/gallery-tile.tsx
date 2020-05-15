import React, {CSSProperties} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const SCALE_DURATION = 500;
const DURATION_DEFAULT = 100;
const DURATIONS: {[keys: string]: number} = {
    borderTop: DURATION_DEFAULT,
    borderRight: DURATION_DEFAULT,
    borderBottom: DURATION_DEFAULT,
    borderLeft: DURATION_DEFAULT,
    titleBackground: DURATION_DEFAULT
};
const [DELAYS, OUT_DELAYS] = (() => {
    const delays = {...DURATIONS};
    const outDelays = {...DURATIONS};
    const keys = Object.keys(delays);
    const values = Object.values(delays);
    let accumulator = 0;
    const valuesAccumulated = values.map(_ => {
        accumulator += _;
        return accumulator;
    });
    const valuesAccumulatedReversed = valuesAccumulated.slice().reverse();
    keys.forEach((_, i) => {
        delays[_] = valuesAccumulated[i];
        outDelays[_] = valuesAccumulatedReversed[i]
    });
    return [delays, outDelays]
})();
const SMALLER_SCREEN = '@media only screen and (max-width: 800px)';

const animationGroupCommon: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
};
const animationPseudoElementCommon: CSSProperties = {
    position: 'absolute',
    content: '""',
    backgroundColor: '#fff'
};
const BORDER_WIDTH = 2;
const useStyles = makeStyles({
    root: {
        width: 390,
        height: 243,
        margin: 5,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: 'radial-gradient(#434343, #000000)',
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        [SMALLER_SCREEN]: {
            width: '100%',
            height: 'calc((100vw - 10px) * 0.5625)', /* 16:9 */
            margin: '5px 0',
            // background-size: 100%,
        }
    },
    image: {
        width: '100%',
        height: '100%',
        '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: `transform ${SCALE_DURATION}ms`,
            transformOrigin: '50% 50%',
            transform: 'scale(1.1)'
        },
        '&:hover img': {
            transform: 'scale(1)'
        }
    },
    hoverAnimationGroup1: {
        ...animationGroupCommon,
        '&::before': {
            ...animationPseudoElementCommon,
            top: 0,
            left: 0,
            width: 0,
            height: BORDER_WIDTH,
            transition: `width ${DURATIONS['borderTop']}ms ${OUT_DELAYS['borderTop']}ms`
        },
        '&:hover::before': {
            width: '100%',
            transition: `width ${DURATIONS['borderTop']}ms ${DELAYS['borderTop']}ms`
        },
        '&::after': {
            ...animationPseudoElementCommon,
            top: 0,
            right: 0,
            width: BORDER_WIDTH,
            height: 0,
            transition: `height ${DURATIONS['borderRight']}ms ${OUT_DELAYS['borderRight']}ms`
        },
        '&:hover::after': {
            height: '100%',
            transition: `height ${DURATIONS['borderRight']}ms ${DELAYS['borderRight']}ms`
        },
    },
    hoverAnimationGroup2: {
        ...animationGroupCommon,
        '&::before': {
            ...animationPseudoElementCommon,
            bottom: 0,
            right: 0,
            width: 0,
            height: BORDER_WIDTH,
            transition: `width ${DURATIONS['borderBottom']}ms ${OUT_DELAYS['borderBottom']}ms`
        },
        '&:hover::before': {
            width: '100%',
            transition: `width ${DURATIONS['borderBottom']}ms ${DELAYS['borderBottom']}ms`
        },
        '&::after': {
            ...animationPseudoElementCommon,
            bottom: 0,
            left: 0,
            width: BORDER_WIDTH,
            height: 0,
            transition: `height ${DURATIONS['borderLeft']}ms ${OUT_DELAYS['borderLeft']}ms`
        },
        '&:hover::after': {
            height: '100%',
            transition: `height ${DURATIONS['borderLeft']}ms ${DELAYS['borderLeft']}ms`
        },
    },
    title: {
        width: '100%',
        height: '100%',
        color: '#fff',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0))',
        backgroundSize: '100% 0%',
        backgroundPosition: `${BORDER_WIDTH}px ${BORDER_WIDTH}px`,
        backgroundRepeat: 'no-repeat',
        transition: `background-size ${DURATIONS['titleBackground']}ms ${OUT_DELAYS['titleBackground']}ms`,
        '&:hover': {
            backgroundSize: '100% 100%',
            transition: `background-size ${DURATIONS['titleBackground']}ms ${DELAYS['titleBackground']}ms`,
        },
        '& h5': {
            position: 'absolute',
            top: 5,
            left: 5,
            transformOrigin: '0 0',
            transition: `transform ${SCALE_DURATION}ms`
        },
        '&:hover h5': {
            transform: 'scale(1.5, 1.5)'
        }
    }
});

interface GalleryTileProps {
    title: string;
    imgUrl: string;
    link: string;
}

const GalleryTile: React.FC<GalleryTileProps> = ({title, imgUrl}) => {
    const classes = useStyles();

    return (
        <div
            className={classes.root}
            // style={{backgroundImage: `url("${imgUrl}")`}}
        >
            <div className={classes.image}>
                <img alt={title} src={imgUrl}/>
                <div className={classes.hoverAnimationGroup1}>
                    <div className={classes.hoverAnimationGroup2}>
                        <div className={classes.title}>
                            <h5>{title}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default GalleryTile
