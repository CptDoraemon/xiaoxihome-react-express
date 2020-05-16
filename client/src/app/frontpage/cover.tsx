import React, {useEffect, useMemo, useRef, useState} from "react";
import {MouseIcon} from "../../component/mouseIcon";
import {GitHubButton} from "../webAppProjects";
import {SpinLoader} from "../../animations/spin-loader";
import useIsMobile from "./use-is-mobile";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles} from "@material-ui/core";
import useScrolledPercentage from "../../animations/use-scroll-percentage";
import FlyInWrapper from "../../animations/fly-in-wrapper";

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
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = err => reject(err);
        image.src = src;
    });
}

const useLoadCoverImage = (isMobile: boolean) => {
    const [isCoverLoaded, setIsCoverLoaded] = useState(false);
    const [isCoverAnimationBegin, setIsCoverAnimationBegin] = useState(false);
    const coverImageUrl = useMemo(() => {
        const imageOrder = initImageOrder();
        return isMobile
            ? `https://xiaoxihome.s3.us-east-2.amazonaws.com/galleryphoto/cover/cover-${imageOrder}-mobile.jpg`
            : `https://xiaoxihome.s3.us-east-2.amazonaws.com/galleryphoto/cover/cover-${imageOrder}-5k.jpg`;
    }, []);
    useEffect(() => {
        loadImage(coverImageUrl)
            .then((image: any) => {
                setIsCoverLoaded(true);
                setTimeout(() => setIsCoverAnimationBegin(true), 20)
            })
            .catch((err) => console.log(err));
    }, []);

    return {
        isCoverLoaded,
        isCoverAnimationBegin,
        coverImageUrl
    }
};

const useFullHeight = () => {
    return useMemo(() => {
        return window.innerHeight
    }, [])
};

const fullscreenWrapper = createStyles({
    fullscreenWrapper: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0
    }
});
const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
    },
    background: {
        ...fullscreenWrapper.fullscreenWrapper,
        '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        }
    },
    title: {
        ...fullscreenWrapper.fullscreenWrapper,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& h1': {
            fontFamily: '"Open Sans", sans-serif',
            fontWeight: 800,
            color: '#fff',
            fontSize: '72px',
            lineHeight: '144px',
            textAlign: 'center',
            margin: 0,
        }
    },
    toolbar: {
        position: 'absolute',
        left: '25%',
        bottom: 0,
        width: '50%',
        height: '100px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '25px',
        transform: 'translateY(85px)',
        transition: 'transform 0.3s, background-color 0.3s',
        color: '#fff',
        animationName: '$scroll-down-indicator-roll-in',
        animationDuration: '1s',
        '&:hover': {
            transform: 'translateY(25px)',
            backgroundColor: 'rgba(37, 41, 45, 1)',
        }
    },
    '@keyframes scroll-down-indicator-roll-in': {
        '0%': {
            width: '20%',
            left: '40%',
            backgroundColor: 'rgba(255, 255, 255, 1)'
        },
        '100%': {
            width: '50%',
            left: '25%',
            backgroundColor: 'rgba(255, 255, 255, 0.3)'
        }
    },
    progressBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: '5px',
        backgroundColor: '#fff'
    },
    loader: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    mouseIcon: {
        margin: '0 0 20px 0',
    },
    githubButton: {
        width: '100px',
        height: '30px',
        transform: 'scale(0.8)',
        borderRadius: '10px',
        cursor: 'pointer',
        color:' #fff',
        fontSize: '20px',
        border: '3px solid #fff',
        opacity: 0.5,
        margin: '0 20px 20px 20px',
        textAlign: 'center',
        fontWeight: 'bold',
        userSelect: 'none',
        '& span': {
            fontSize: '18px',
            lineHeight: '30px',
        },
        '&:hover': {
            opacity: 1,
            color: 'rgb(37, 41, 45)',
            backgroundColor: '#fff',
        }
    }
});

/**
 * return number in range [0, 1]
 */
const useCoverScrolled = (scrolled: number) => {
    const start = 0.5; // the cover is at the top of the document, therefore it has minimum scrolled = 50%
    const [coverScrolled, setCoverScrolled] = useState(0);

    useEffect(() => {
        if (scrolled >= 0.5) {
            const percentage = (scrolled - start) / (1 - start);
            if (percentage !== coverScrolled) {
                setCoverScrolled(percentage)
            }
        }
    }, [scrolled, coverScrolled]);

    return coverScrolled
};

/**
 * @param scrolled
 * @param max expected interpolated when scrolled = 1
 * @param min expected interpolated when scrolled = 0
 * @param initialValue
 */
const useInterpolate = (scrolled: number, max: number, min: number, initialValue: number) => {
    const [result, setResult] = useState(initialValue);

    useEffect(() => {
        const newResult = (max - min) * scrolled + min;
        if (newResult !== result) {
            setResult(newResult)
        }
    }, [scrolled, result]);

    return result
};

interface CoverProps {
    clickToScrollToAnchor: () => void
}

const Cover: React.FC<CoverProps> = ({clickToScrollToAnchor}) => {
    const classes = useStyles();
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();
    const fullHeight = useFullHeight();
    const scrolled = useScrolledPercentage(containerRef);
    const coverScrolled = useCoverScrolled(scrolled);
    const titleOpacity = useInterpolate(coverScrolled, 0, 1, 1);
    const isProgressBar = coverScrolled >= 0.5;
    const {
        isCoverLoaded,
        isCoverAnimationBegin,
        coverImageUrl
    } = useLoadCoverImage(isMobile);

    const coverImageStyle = isCoverAnimationBegin ? {
        transform: `scale(1)`,
        transition: 'transform 1s'
    } : {
        transform: 'scale(2)'
    };

    return (
        <div className={classes.root} style={{height: `${fullHeight}px`}} ref={containerRef}>
            <div className={classes.background}>
                {
                    isCoverLoaded &&
                    <img src={coverImageUrl} alt={'cover image'} style={coverImageStyle}/>
                }
            </div>
            <div className={classes.title} style={{opacity: titleOpacity}}>
                <FlyInWrapper isActive={true} direction={'bottom'}>
                    <h1>
                        Welcome To Xiaoxi's Home!
                    </h1>
                </FlyInWrapper>
            </div>
            <div className={classes.toolbar}>
                <div className={classes.mouseIcon}>
                    <MouseIcon onClickMouseIcon={clickToScrollToAnchor}/>
                </div>
                <GitHubButton link={'https://github.com/CptDoraemon'} className={classes.githubButton}/>
            </div>
            {
                isProgressBar &&
                <div className={classes.progressBar} style={{width: `${((coverScrolled - 0.5) / 0.5) * 100}%`}}>

                </div>
            }
            {
                !isCoverLoaded &&
                <div className={classes.loader}><SpinLoader size={20}/></div>
            }
        </div>
    )
};

export default Cover
