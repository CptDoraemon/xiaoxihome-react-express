import React, {useEffect, useMemo, useRef, useState} from "react";
import {MouseIcon} from "../../../component/mouseIcon";
import {GitHubButton} from "../../webAppProjects";
import {SpinLoader} from "../../../animations/spin-loader";
import useIsMobile from "../use-is-mobile";
import useCoverStyles from "./cover-styles";
import CoverTitle from "./cover-title";
import useCoverAnimations from "./use-cover-animations";

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
    const [fullHeight, setFullHeight] = useState(0);

    useEffect(() => {
        setFullHeight(window.innerHeight)
    }, []);

    useEffect(() => {
        const resizeHandler = () => {
            if (window.innerHeight !== fullHeight) {
                setFullHeight(window.innerHeight)
            }
        };
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        }
    }, [fullHeight]);

    return fullHeight
};

const containerID = 'cover-container';
const backgroundImageID = 'cover-background-image';
const titleID = 'cover-title';
const progressBarID = 'cover-progressbar';

interface CoverProps {
    clickToScrollToAnchor: () => void
}

const Cover: React.FC<CoverProps> = ({clickToScrollToAnchor}) => {
    const classes = useCoverStyles();
    const placeholderRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();
    const isProgressBar = useCoverAnimations(placeholderRef, containerID, backgroundImageID, titleID, progressBarID);
    const fullHeight = useFullHeight();
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
            ref={placeholderRef}
            style={{height: `${fullHeight}px`}}
        >
            <div className={classes.root} id={containerID} style={{height: `${fullHeight}px`}}>
                <div className={classes.background} id={backgroundImageID}>
                    {
                        isCoverLoaded &&
                        <img src={coverImageUrl} alt={'cover image'} style={coverImageStyle}/>
                    }
                </div>
                <div className={classes.title} id={titleID}>
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
                    <div className={classes.progressBar} id={progressBarID}>

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
