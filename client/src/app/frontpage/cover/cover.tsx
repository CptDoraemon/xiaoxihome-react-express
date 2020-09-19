import React, {useEffect, useMemo, useRef, useState} from "react";
import {MouseIcon} from "../../../component/mouseIcon";
import {GitHubButton} from "../../webAppProjects";
import {SpinLoader} from "../../../animations/spin-loader";
import useIsMobile from "../use-is-mobile";
import useCoverStyles from "./cover-styles";
import CoverTitle from "./cover-title";
import useCoverAnimations from "./use-cover-animations";
import CoverLoader from "./cover-loader";
import CoverBackground from "./cover-background";
import useLoadCoverImage from "./use-load-cover-image";
import useDelayedActive from "./use-delayed-active";

const useFullHeight = () => {
    const [fullHeight, setFullHeight] = useState(0);

    useEffect(() => {
        setFullHeight(window.innerHeight)
    }, []);

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
    const animationDuration = 1000;
    const classes = useCoverStyles();
    const placeholderRef = useRef<HTMLDivElement>(null);
    const backgroundContainerRef = useRef<HTMLDivElement>(null);
    const fullHeight = useFullHeight();
    const containerHeight = fullHeight ? `${fullHeight}px` : '100vh';
    const isProgressBar = useCoverAnimations(placeholderRef, containerID, backgroundImageID, titleID, progressBarID);
    const {
        image,
        isLoaderShown,
    } = useLoadCoverImage(animationDuration, backgroundContainerRef);
    const isCoverLoaded = image !== null;
    const isTitleActive = useDelayedActive(isCoverLoaded, animationDuration, 0).delayedActiveIn;

    return (
        <div
            className={classes.relativeContainer}
            ref={placeholderRef}
            style={{height: containerHeight}}
        >
            <div className={classes.root} id={containerID} style={{height: containerHeight}}>
                <div className={classes.background} id={backgroundImageID} ref={backgroundContainerRef}>
                    <CoverBackground image={image} animationDuration={animationDuration}/>
                </div>
                <div className={classes.title} id={titleID}>
                    <CoverTitle
                        subtitle={`Hi there, I'm Xiaoxi Yu.`}
                        title={`Welcome to my home, I store my works here.`}
                        isActive={isTitleActive}
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

                <CoverLoader active={isLoaderShown} delayOut={300} size={25} margin={25}/>
            </div>
        </div>
    )
};

export default Cover
