import React, {useEffect, useMemo, useRef, useState} from "react";
import {MouseIcon} from "../../component/mouseIcon";
import {GitHubButton} from "../webAppProjects";
import {SpinLoader} from "../../animations/spin-loader";
import useIsMobile from "./use-is-mobile";
import makeStyles from "@material-ui/core/styles/makeStyles";

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

const useStyles = makeStyles({
    root: {
        width: '100vw',
        height: '100vh',
        maxWidth: '100%'
    }
});

interface CoverProps {
    clickToScrollToAnchor: () => void
}

const Cover: React.FC<CoverProps> = ({clickToScrollToAnchor}) => {
    const classes = useStyles();
    const isMobile = useIsMobile();
    const {
        isCoverLoaded,
        isCoverAnimationBegin,
        coverImageUrl
    } = useLoadCoverImage(isMobile);

    return (
        <div className={classes.root}>


        </div>
    )

    // return (
    //     <>
    //         <div className='cover-wrapper'>
    //             <div className={isCoverAnimationBegin ? 'cover-loaded' : 'cover-loading'}>
    //                 {
    //                     isCoverLoaded &&
    //                     <img src={coverSrc} width='100%' height='100%' style={{objectFit: 'cover'}} alt='cover'/>
    //                 }
    //             </div>
    //         </div>
    //         <div className='cover-intro parallax-container'>
    //             <div className='cover-intro-inner'>
    //                 <h1 style={{opacity: 1 - scrolledPercentage, willChange: 'opacity'}}>Welcome To Xiaoxi's Home!</h1>
    //             </div>
    //         </div>
    //         <div
    //             className='parallax-container flexbox-col-center-bottom'
    //             style={isCoverExitingAnimationTwo ? {
    //                 transform: coverExitingAnimationTranslate,
    //             } : {}}>
    //             <div className={ isCoverExitingAnimationOne
    //                 ? 'scroll-down-indicator-wrapper-disappear flexbox-row-center-center'
    //                 : isCoverExitingAnimationTwo
    //                     ? 'scroll-down-indicator-wrapper-animating flexbox-row-center-center'
    //                     : 'scroll-down-indicator-wrapper flexbox-row-center-center'}>
    //                 <div className='mouse-icon'>
    //                     <MouseIcon onClickMouseIcon={clickToScrollToAnchor}/>
    //                 </div>
    //                 <GitHubButton link={'https://github.com/CptDoraemon'} className={'frontpage-github-button'}/>
    //             </div>
    //         </div>
    //         {
    //             !isCoverLoaded &&
    //             <div className='loader-wrapper'><SpinLoader size={20}/></div>
    //         }
    //     </>
    // )
};

export default Cover
