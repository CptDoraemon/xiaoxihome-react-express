import React, {useEffect, useRef, useState} from "react";
import {MouseIcon} from "../../../component/mouseIcon";
import {GitHubButton} from "../../webAppProjects";
import useCoverStyles from "./cover-styles";
import CoverTitle from "./cover-title";
import useCoverAnimations from "./use-cover-animations";
import CoverLoader from "./cover-loader";
import CoverBackground from "./cover-background";
import useLoadCoverImage from "./use-load-cover-image";
import useDelayedActive from "./use-delayed-active";

const containerID = 'cover-container';
const backgroundImageID = 'cover-background-image';
const titleID = 'cover-title';
const progressBarID = 'cover-progressbar';

interface FullScreenSize {
    width: number,
    height: number
}

interface CoverProps {
    clickToScrollToAnchor: () => void,
    fullWidth: number,
    fullHeight: number
}

const animation = {
    maxDelay: 1000,
    duration: 1500,
    total: 2500
};

const Cover: React.FC<CoverProps> = ({clickToScrollToAnchor, fullWidth, fullHeight}) => {
    const classes = useCoverStyles();
    const placeholderRef = useRef<HTMLDivElement>(null);
    const isProgressBar = useCoverAnimations(placeholderRef, containerID, backgroundImageID, titleID, progressBarID);
    const {
        image,
        isLoaderShown,
    } = useLoadCoverImage(animation.total, fullWidth, fullHeight);
    const isImageLoaded = image !== null;
    const isTitleActive = useDelayedActive(isImageLoaded, animation.maxDelay, 0).delayedActiveIn;
    const isScrollDownActive = useDelayedActive(isImageLoaded, animation.total, 0).delayedActiveIn;

    return (
        <div
            className={classes.relativeContainer}
            ref={placeholderRef}
            style={{height: fullHeight}}
        >
            <div className={classes.root} id={containerID} style={{height: fullHeight}}>
                <div className={classes.background} id={backgroundImageID}>
                    <CoverBackground image={image} maxDelay={animation.maxDelay} duration={animation.duration} fullWidth={fullWidth} fullHeight={fullHeight}/>
                </div>
                <div className={classes.title} id={titleID}>
                    <CoverTitle
                        subtitle={`Hi there, I'm Xiaoxi Yu.`}
                        title={`Welcome to my home, I store my works here.`}
                        isActive={isTitleActive}
                        maxDuration={animation.duration}
                    />
                </div>
                <div className={isProgressBar || !isScrollDownActive ? classes.toolbarInactive : classes.toolbarActive}>
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
