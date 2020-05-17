import React, {useEffect, useMemo, useRef, useState} from "react";
import {MouseIcon} from "../../component/mouseIcon";
import {GitHubButton} from "../webAppProjects";
import {SpinLoader} from "../../animations/spin-loader";
import useIsMobile from "./use-is-mobile";
import useCoverStyles from "./cover-styles";
import useScrolledPercentage from "../../animations/use-scroll-percentage";
import CoverTitle from "./cover-title";

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
    const classes = useCoverStyles();
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();
    const fullHeight = useFullHeight();
    const scrolled = useScrolledPercentage(containerRef);
    const coverScrolled = useCoverScrolled(scrolled);
    const titleOpacity = useInterpolate(coverScrolled, 0, 1, 1);
    const titleOffset = useInterpolate(coverScrolled, 50, 0, 0);
    const backgroundOffset = useInterpolate(coverScrolled, 75, 0, 0);
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
        <div
            className={classes.relativeContainer}
            style={{
                height: `${fullHeight}px`,
            }}
            ref={containerRef}
        >
        <div
            className={classes.root}
            style={{
                height: `${fullHeight}px`,
                top: `${-coverScrolled * 100}%`,
            }}
        >
                <div
                    className={classes.background}
                    style={{
                        top: `${backgroundOffset}%`,
                    }}
                >
                    {
                        isCoverLoaded &&
                        <img src={coverImageUrl} alt={'cover image'} style={coverImageStyle}/>
                    }
                </div>
                <div
                    className={classes.title}
                    style={{
                        opacity: titleOpacity,
                        top: `${titleOffset}%`
                    }}
                >
                    <CoverTitle
                        subtitle={`Hi there, I'm Xiaoxi Yu.`}
                        title={`Welcome to my home, I store my works here.`}
                        isActive={isCoverLoaded}
                    />
                </div>
                <div className={isProgressBar || !isCoverLoaded ? classes.toolbarInactive : classes.toolbarActive}>
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
        </div>
    )
};

export default Cover
