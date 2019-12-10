import React, { useRef, useState, useEffect } from 'react';

import HeaderCover from "../component/header";
import Footer from "../component/footer";
import { MouseIcon } from "../component/mouseIcon";
import { withFlyInAnimation } from '../animations/fly-in';
import { SpinLoader } from "../animations/spin-loader";
import { myScrollTo } from "../tools/myScrollTo";
import { useScrollOpacityAnimation, useGetContainerPosition } from "../animations/parallax";

import { Link } from 'react-router-dom';
import './frontpage.css';
import {setTitle} from "../tools/set-title";
// import {resetJSONLD, setSummaryPageJSONLD} from "../tools/set-JSONLD";

const IS_MOBILE = window.innerWidth < 800;

interface CoverProps {
    onClickMouseIcon: Function
}

function Cover(props: CoverProps){
    // scroll opacity animation
    const containerRef: any = useRef();
    const containerPosition = useGetContainerPosition(containerRef);
    const scrolledPercentage = useScrollOpacityAnimation(containerPosition.offsetTop, containerPosition.offsetTop + containerPosition.offsetHeight, 1.0);
    // init imageOrder state
    const initImageOrder = () => {
        const isReturningViewer = window.localStorage.getItem('isReturningViewer') === 'true';
        let imageOrder;
        if (isReturningViewer) {
            imageOrder = Math.floor((Math.random() * 4)) + 1;
        } else {
            window.localStorage.setItem('isReturningViewer', 'true');
            imageOrder = 1;
        }
        return imageOrder;
    };
    // load cover image state
    const [imageOrder, setImageOrder] = useState(initImageOrder());
    const [isCoverLoaded, setIsCoverLoaded] = useState(false);
    const [coverSrc, setCoverSrc] = useState('');
    const [isCoverAnimationBegin, setIsCoverAnimationBegin] = useState(false);
    // load cover image effect
    const loadImage = (src: string) => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = err => reject(err);
            image.src = src;
        });
    };
    // cover exiting animation related
    const isCoverExitingAnimationOne = 0.3 <= scrolledPercentage && scrolledPercentage < 0.5;
    const isCoverExitingAnimationTwo = 0.5 <= scrolledPercentage && scrolledPercentage <= 1.0;
    const coverExitingAnimationOne = (scrolledPercentage - 0.3) / 0.2;
    const coverExitingAnimationTwo = (scrolledPercentage - 0.5) / 0.5;
    let coverExitingAnimationTranslate = `translateX(0)`;
    if (isCoverExitingAnimationOne) {
        coverExitingAnimationTranslate = `translateX(0)`;
    } else if (isCoverExitingAnimationTwo) {
        coverExitingAnimationTranslate = `translateX(${-100 + coverExitingAnimationTwo * 100}%)`;
    }
    //
    useEffect(() => {
        const src = IS_MOBILE
            ? `https://xiaoxihome.s3.us-east-2.amazonaws.com/galleryphoto/cover/cover-${imageOrder}-mobile.jpg`
            : `https://xiaoxihome.s3.us-east-2.amazonaws.com/galleryphoto/cover/cover-${imageOrder}-5k.jpg`;
        loadImage(src)
            .then((image: any) => {
                setIsCoverLoaded(true);
                setCoverSrc(image.src);
                setTimeout(() => setIsCoverAnimationBegin(true), 20)
            })
            .catch((err) => console.log(err));
    }, [imageOrder]);

    return (
        <>
            <div className='cover-wrapper' ref={containerRef}>
                <div className={isCoverAnimationBegin ? 'cover-loaded' : 'cover-loading'}>
                    { !isCoverLoaded ? null : <img src={coverSrc} width='100%' height='100%' style={{objectFit: 'cover'}} alt='cover'/> }
                </div>
            </div>
            <div className='cover-intro parallax-container'>
                <div className='cover-intro-inner'>
                    <h1 style={{opacity: 1 - scrolledPercentage, willChange: 'opacity'}}>Welcome To Xiaoxi's Home!</h1>
                </div>
            </div>
            <div
                className='parallax-container flexbox-col-center-bottom'
                style={isCoverExitingAnimationTwo ? {
                    transform: coverExitingAnimationTranslate,
                } : {}}>
                <div className={ isCoverExitingAnimationOne
                    ? 'scroll-down-indicator-wrapper-disappear flexbox-col-center-center'
                    : isCoverExitingAnimationTwo
                        ? 'scroll-down-indicator-wrapper-animating flexbox-col-center-center'
                        : 'scroll-down-indicator-wrapper flexbox-col-center-center'}>
                    <div className='mouse-icon'>
                        <MouseIcon onClickMouseIcon={props.onClickMouseIcon}/>
                    </div>
                </div>
            </div>
            {
                isCoverLoaded ? null : <div className='loader-wrapper'><SpinLoader size={20}/></div>
            }
        </>
    )
}

enum TileSize {
    SMALL = 'tile-sm',
    BIG = 'tile-big',
    BIGRIBBONED = 'tile-big ribboned',
    GALLERY = 'tile-gallery'
}

interface GalleryTileProps extends GalleryTileInfo {
    className: TileSize;
    isImgLoaded: boolean;
}

function GalleryTile(props: GalleryTileProps) {
    const image = props.isImgLoaded ? {style: {backgroundImage: `url(${props.imgUrl})`}} : null;
    return (
        <Link to={props.link}>
            <div
                className={props.className}
                {...image}
            >
                <h5>{props.title}</h5>
            </div>
        </Link>
    )
}

interface TextTileProps extends  TextTileInfo {
    className: string;
}
function TextTile(props: TextTileProps) {
    console.log(props);
    return (
        <Link to={props.link}>
            <div
                className={props.className}>
                <h3> { props.title } </h3>
            </div>
        </Link>
    )
}

interface SectionTitleProps {
    sectionTitle: string
}
function SectionTitle(props: SectionTitleProps) {
    return (
        <h2>
            { props.sectionTitle }
        </h2>
    )
}

// IMPORTANT!! DON'T USE HOC IN RENDER!!
const WithFlyInAnimationGalleryTile = withFlyInAnimation(GalleryTile);
const WithFlyInAnimationTextTile = withFlyInAnimation(TextTile);
const WithFlyInAnimationSectionTitle = withFlyInAnimation(SectionTitle);

interface TextTileInfo extends ProjectInfo {

}

interface ProjectListTextProps {
    tileInfo: Array<TextTileInfo>;
    sectionTitle: string;
    projectListType: ProjectListType;
}

interface ProjectListTextStates {
    animationTriggerPoint: number
}

enum ProjectListType {
    ONE = 0,
    TWO
}

class ProjectListText extends React.Component<ProjectListTextProps, ProjectListTextStates> {

    containerRef = React.createRef<HTMLDivElement>();
    typeRelatedParams = {
        [ProjectListType.ONE]: {
            flyInDelayRemap: [0.2, 0.1, 0, 0.1, 0.2, 0.3],
            flyInDirectionRemap: ['left', 'left', 'left', 'right', 'right', 'right'],
            bigTileIndex: [1, 3]
        },
        [ProjectListType.TWO]: {
            flyInDelayRemap: [0, 0.1, 0.2, 0.3, 0.2, 0.1],
            flyInDirectionRemap: ['right', 'right', 'right', 'left', 'left', 'left'],
            bigTileIndex: [0, 5]
        }
    };

    constructor(props: ProjectListTextProps) {
        super(props);
        this.state = {
            animationTriggerPoint: 9999
        };
    }
    componentDidMount() {
        if (this.containerRef.current) {
            this.setState({
                animationTriggerPoint: this.containerRef.current.offsetTop + this.containerRef.current.offsetHeight * 0.2
            })
        }
    }
    render() {
        const typeRelatedParams = this.typeRelatedParams[this.props.projectListType];
        return (
            <div className='project-container' ref={this.containerRef}>
                <WithFlyInAnimationSectionTitle
                    propsForWrapper={{
                        flyInDirection: 'down',
                        flyInDelay: 0,
                        animationTriggerPoint: this.state.animationTriggerPoint,
                        wrapperClassName: 'fly-in-wrapper',
                        customScrollEvent: IS_MOBILE ? '' : 'parallaxScroll',
                    }}
                    passOnProps={{
                        sectionTitle: this.props.sectionTitle
                    }}
                />
                <div className='flexbox-wrapper-800'>
                    { this.props.tileInfo.map((i, index) => {

                        const tileSize = (typeRelatedParams.bigTileIndex.indexOf(index)) === -1 ?
                            TileSize.SMALL :
                            this.props.projectListType === ProjectListType.TWO ?
                                TileSize.BIGRIBBONED :
                                TileSize.BIG;

                        return <WithFlyInAnimationTextTile
                            passOnProps={{
                                link: i.link,
                                title: i.title,
                                className: tileSize,
                            }}
                            propsForWrapper={{
                                key: index,
                                flyInDirection: typeRelatedParams.flyInDirectionRemap[index],
                                flyInDelay: typeRelatedParams.flyInDelayRemap[index],
                                animationTriggerPoint: this.state.animationTriggerPoint,
                                wrapperClassName: 'fly-in-wrapper',
                                customScrollEvent: IS_MOBILE ? '' : 'parallaxScroll',
                            }}
                        />
                    })}
                </div>
            </div>
        )
    }
}

interface GalleryTileInfo extends AlbumInfo{

}

interface ProjectListGalleryProps {
    sectionTitle: string;
    isImgLoaded: boolean;
    tileInfo: Array<GalleryTileInfo>;
}

interface ProjectListGalleryStates {
    animationTriggerPoint: number
}

class ProjectListGallery extends React.Component<ProjectListGalleryProps, ProjectListGalleryStates> {

    containerRef = React.createRef<HTMLDivElement>();
    flyInDelayRemap = [0.2, 0.2, 0.1, 0.1, 0, 0];
    flyInDirectionRemap = ['left', 'right', 'left', 'right', 'left', 'right'];

    constructor(props: ProjectListGalleryProps) {
        super(props);
        this.state = {
            animationTriggerPoint: 9999
        };
    }
    componentDidMount() {
        if (this.containerRef.current) {
            this.setState({
                animationTriggerPoint: this.containerRef.current.offsetTop + this.containerRef.current.offsetHeight * 0.2
            })
        }
    }
    render() {
        return (
            <div className='project-container' ref={this.containerRef}>
                <WithFlyInAnimationSectionTitle
                    propsForWrapper={{
                        flyInDirection: 'down',
                        flyInDelay: 0,
                        animationTriggerPoint: this.state.animationTriggerPoint,
                        wrapperClassName: 'fly-in-wrapper',
                        customScrollEvent: IS_MOBILE ? '' : 'parallaxScroll',
                    }}
                    passOnProps={{
                        sectionTitle: this.props.sectionTitle
                    }}
                />
                <div className='flexbox-wrapper-800'>
                    {this.props.tileInfo.map((i, index) => {
                        const tileSize = TileSize.GALLERY;
                        return <WithFlyInAnimationGalleryTile
                            passOnProps={{
                                link: i.link,
                                title: i.title,
                                className: tileSize,
                                imgUrl: i.imgUrl,
                                isImgLoaded: this.props.isImgLoaded,
                            }}
                            propsForWrapper={{
                                key: index,
                                flyInDirection: this.flyInDirectionRemap[index],
                                flyInDelay: this.flyInDelayRemap[index],
                                animationTriggerPoint: this.state.animationTriggerPoint,
                                wrapperClassName: 'fly-in-wrapper',
                                customScrollEvent: IS_MOBILE ? '' : 'parallaxScroll',
                            }}
                        />
                    })}
                </div>
            </div>
        )
    }
}

interface ProjectInfo {
    link: string;
    title: string;
}

interface AlbumInfo {
    title: string;
    imgUrl: string;
    link: string;
}

interface TextSectionInfo {
    sectionTitle: string
    projects: Array<ProjectInfo>;
}

interface GallerySectionInfo {
    sectionTitle: string
    projects: Array<AlbumInfo>;
}

interface AllProjectsInfo {
    0: TextSectionInfo
    1: TextSectionInfo;
    2: GallerySectionInfo;
}

interface FrontpageProps {
    allProjectsInfo: AllProjectsInfo
}

interface FrontpageStates {
    isImgLoaded: boolean;
}

class Frontpage extends React.Component<FrontpageProps, FrontpageStates> {
    galleryRef = React.createRef<HTMLDivElement>();
    academicRef = React.createRef<HTMLDivElement>();
    webRef = React.createRef<HTMLDivElement>();
    parallelBoxRef = React.createRef<HTMLDivElement>();
    parallelBoxScrollEvent: any;
    lastParallaxScrollEventFiredAt: number = Date.now();

    constructor(props: FrontpageProps) {
        super(props);
        this.state = {
            isImgLoaded: false
        };
        this.galleryLazyLoad = this.galleryLazyLoad.bind(this);
        this.scrollToWorkRef = this.scrollToWorkRef.bind(this);
        this.parallelBoxScrollHandler = this.parallelBoxScrollHandler.bind(this);
        this.prepareParallelBoxScrollEvent = this.prepareParallelBoxScrollEvent.bind(this);
    }
    scrollToWorkRef() {
        if (this.academicRef.current && this.parallelBoxRef.current) myScrollTo(this.academicRef.current.offsetTop, this.parallelBoxRef.current);
    };
    galleryLazyLoad() {
        const viewpointHeight = window.innerHeight;
        if (this.galleryRef.current) {
            const galleryTop = this.galleryRef.current.getBoundingClientRect().top;
            console.log(galleryTop);
            const galleryIsVisible = galleryTop - 200 < viewpointHeight;
            if (galleryIsVisible) {
                this.setState({isImgLoaded: true});
                window.removeEventListener('scroll', this.galleryLazyLoad);
            }
        }
    }
    prepareParallelBoxScrollEvent() {
        if (this.parallelBoxRef.current) this.parallelBoxRef.current.addEventListener('scroll', this.parallelBoxScrollHandler);
        this.parallelBoxScrollEvent = new CustomEvent('parallaxScroll', { bubbles: true, cancelable: false, detail: {scrollTop:{}} });
    }
    parallelBoxScrollHandler() {
        const now = Date.now();
        if (now - this.lastParallaxScrollEventFiredAt > 100) {
            if (this.parallelBoxRef.current) {
                this.parallelBoxScrollEvent.detail.scrollTop = this.parallelBoxRef.current.scrollTop;
                document.dispatchEvent(this.parallelBoxScrollEvent);
            }
            this.lastParallaxScrollEventFiredAt = now;
        }
    }
    componentDidMount() {
        setTitle(null, true);
        // setSummaryPageJSONLD();
        if (!IS_MOBILE) {
            this.prepareParallelBoxScrollEvent();
            window.addEventListener('parallaxScroll', this.galleryLazyLoad);
        } else {
            window.addEventListener('scroll', this.galleryLazyLoad);
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.galleryLazyLoad);
        if (this.parallelBoxRef.current) this.parallelBoxRef.current.removeEventListener('scroll', this.parallelBoxScrollHandler);
        // resetJSONLD();
    }
    render() {
        //It receives props: listAndLink
        return (
            <div className='frontpage-main' ref={this.parallelBoxRef}>
                <HeaderCover  />
                <Cover onClickMouseIcon={this.scrollToWorkRef}/>

                <div className={'academic-and-web'}>
                    <div ref={this.academicRef}/>
                    <ProjectListText
                        tileInfo={this.props.allProjectsInfo[0].projects}
                        sectionTitle={this.props.allProjectsInfo[0].sectionTitle}
                        projectListType={ProjectListType.ONE}
                    />

                    <div ref={this.webRef}/>
                    <ProjectListText
                        tileInfo={this.props.allProjectsInfo[1].projects}
                        sectionTitle={this.props.allProjectsInfo[1].sectionTitle}
                        projectListType={ProjectListType.TWO}
                    />
                </div>

                <div className={'gallery'} ref={this.galleryRef}>
                    <ProjectListGallery
                        tileInfo={this.props.allProjectsInfo[2].projects}
                        sectionTitle={this.props.allProjectsInfo[2].sectionTitle}
                        isImgLoaded={this.state.isImgLoaded}
                    />
                </div>
                <Footer />
            </div>
        )
    }
}

export default Frontpage;

