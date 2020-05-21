import {Link} from "react-router-dom";
import React, {useEffect, useMemo, useRef, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles} from "@material-ui/core/styles";
import MagnifyingGlass from "./magnifying-glass";

const zIndices = {
    magnifyingGlass: 40,
    text: 30,
    ribbon: 20,
    backgroundColor: 10,
};
const SMALLER_SCREEN = '@media only screen and (max-width: 800px)';
const tileCommons = createStyles({
    common: {
        height: 192,
        backgroundColor: 'rgba(255,255,255,0.2)',
        margin: 5,
        textTransform: 'capitalize',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& h3': {
            wordSpacing: '100vw',
            color: '#fff',
            textAlign: 'center',
        },
        '&:hover': {
            cursor: 'pointer'
        },
        [SMALLER_SCREEN]: {
            height: 'auto',
            margin: '5px 0',
            padding: '15px 0',
            transition: 0,
            width: '100%',
            '& h3': {
                fontSize: '16px'
            }
        }
    }
});
const useStyles = makeStyles({
    root: {
        position: 'relative'
    },
    big: {
        ...tileCommons.common,
        width: 385,
    },
    small: {
        ...tileCommons.common,
        width: 192,
    },
    ribbon: {
        position: 'relative',
        '&::after': {
            position: 'absolute',
            zIndex: zIndices.ribbon,
            content: '""',
            top: 0,
            left: -45,
            width: 100,
            height: 35,
            transform: 'rotate(-45deg)',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            transition: '0.3s',
        },
        '&:hover::after': {
            left: -65,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
        },
        [SMALLER_SCREEN]: {
            '&::after': {
                left: -25,
                width: 60,
                height: 25,
            },
            '&:hover::after': {
                left: -40
            },
        }
    },
    hoverDetection: {
        '&:hover $backgroundWrapper': {
            transform: 'translate(25%, 25%)',
            transition: 'transform 0.2s',
        },
        '&:hover $backgroundScale': {
            transform: 'scale(1, 2) translateY(25%)',
            transition: 'transform 1s 0.2s',
        }
    },
    text: {
        zIndex: zIndices.text,
    },
    backgroundWrapper: {
        zIndex: zIndices.backgroundColor,
        width: '200%',
        height: '200%',
        borderRadius: '50%',
        overflow: 'hidden',
        position: 'absolute',
        top: '-100%',
        left: '-100%',
        transition: 'transform 0.2s',
        transform: 'translate(-50%, -50%)',
    },
    backgroundScale: {
        width: '100%',
        height: '100%',
        transform: 'scale(1, 2) translateY(-25%)',
        backgroundImage: 'linear-gradient(to bottom, #EC9F05, #FF4E00)',
        backgroundSize: 'cover',
        transition: 'transform 0.2s 0.2s',
    },
    magnifyingWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    }
});

interface TextTileProps {
    link: string,
    title: string,
    size: 'big' | 'small',
    variant?: 'ribbon' | null
}

const USE_HOVER_DEFAULT_POSITION = {
    x: -9999,
    y: -9999
};

const useHover = (ref: React.RefObject<HTMLElement>) => {
    const [position, setPosition] = useState<{
        x: number,
        y: number
    } | null>(null);

    const isHovering = (x: number, y: number) => {
        if (!ref.current) return false;

        const rect = ref.current.getBoundingClientRect();
        const refElRect = {
            x0: rect.x,
            x1: rect.x + rect.width,
            y0: rect.y,
            y1: rect.y + rect.height
        };
        return (
            x >= refElRect.x0 &&
            x <= refElRect.x1 &&
            y >= refElRect.y0 &&
            y <= refElRect.y1
        )
    };

    const mouseMoveHandler = (e: MouseEvent) => {
        if (!ref.current) return;
        const x = e.clientX;
        const y = e.clientY;

        if (isHovering(x, y)) {
            setPosition({x: x - ref.current.getBoundingClientRect().left, y: y - ref.current.getBoundingClientRect().top})
        } else {
            setPosition(null)
        }
    };

    const mouseLeaveHandler = () => {
        setPosition(null)
    };

    useEffect(() => {
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('scroll', mouseLeaveHandler);
        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('scroll', mouseLeaveHandler);
        }
    }, [ref]);

    return position
};

const TextTile: React.FC<TextTileProps> = ({link, title, size, variant}) => {
    const classes = useStyles();
    const containerRef = useRef<HTMLAnchorElement>(null);
    const [containerSize, setContainerSize] = useState({
       width: 0,
       height: 0
    });

    useEffect(() => {
        if (!containerRef.current) return;
        setContainerSize({
            width: containerRef.current.getBoundingClientRect().width,
            height: containerRef.current.getBoundingClientRect().height
        })
    }, []);

    const rootStyle = useMemo(() => {
        let rootStyle = `${classes.root} ${classes.hoverDetection}`;
        rootStyle += ' ';
        rootStyle += size === 'big' ? classes.big : classes.small;
        if (variant === 'ribbon') {
            rootStyle += ` ${classes.ribbon}`;
        }

        return rootStyle
    }, [size, variant]);

    const mousePosition = useHover(containerRef);
    const content = (
        <>
            <div className={classes.backgroundWrapper}>
                <div className={classes.backgroundScale}>
                </div>
            </div>
            <div className={classes.text}>
                <h3>
                    { title }
                </h3>
            </div>
        </>
    );

    return (
        <Link to={link} className={rootStyle} ref={containerRef}>
            { content }
            <MagnifyingGlass
                x={mousePosition ? mousePosition.x : USE_HOVER_DEFAULT_POSITION.x}
                y={mousePosition ? mousePosition.y : USE_HOVER_DEFAULT_POSITION.y}
                zIndex={zIndices.magnifyingGlass}
            >
                <div
                    className={classes.magnifyingWrapper}
                    style={{
                        width: `${containerSize.width}px`,
                        height: `${containerSize.height}px`,
                    }}
                >
                    { content }
                </div>
            </MagnifyingGlass>
        </Link>
    )
};

export default TextTile
