import React from "react";
import {MouseIcon} from "../../../component/mouseIcon";
import {GitHubButton} from "../../webAppProjects";
import useCoverStyles from "./cover-styles";
import CoverTitle from "./cover-title";
import CoverLoader from "./cover-loader";
import CoverBackground from "./cover-background";
import useLoadCoverImage from "./use-load-cover-image";
import useDelayedActive from "./use-delayed-active";

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
    const image = useLoadCoverImage(animation.total, fullWidth, fullHeight);
    const isImageLoaded = image !== null;
    const isTitleActive = useDelayedActive(isImageLoaded, animation.maxDelay);
    const isToolbarActive = useDelayedActive(isImageLoaded, animation.total);
    const isLoaderActive = useDelayedActive(!isImageLoaded, animation.total);

    return (
        <div className={classes.root} style={{height: fullHeight}}>
            <div className={classes.background}>
                <CoverBackground image={image} maxDelay={animation.maxDelay} duration={animation.duration} fullWidth={fullWidth} fullHeight={fullHeight}/>
            </div>
            <div className={classes.title}>
                <CoverTitle
                    subtitle={`Hi there, I'm Xiaoxi Yu.`}
                    title={`Welcome to my home, I store my works here.`}
                    isActive={isTitleActive}
                    maxDuration={animation.duration}
                />
            </div>
            <div className={isToolbarActive ? classes.toolbarActive : classes.toolbarInactive}>
                <div className={classes.mouseIcon}>
                    <MouseIcon onClickMouseIcon={clickToScrollToAnchor}/>
                </div>
                <GitHubButton link={'https://github.com/CptDoraemon'} className={classes.githubButton}/>
            </div>
            {/*{*/}
            {/*    isProgressBar &&*/}
            {/*    <div className={classes.progressBar} id={progressBarID}>*/}

            {/*    </div>*/}
            {/*}*/}
            <CoverLoader active={isLoaderActive} size={25} margin={25}/>
        </div>
    )
};

export default Cover
