import React from 'react';

import { HeaderCover } from "../component/header";
import { Footer } from "../component/footer";
import { MouseIcon } from "../component/mouseIcon";
import { withFlyInAnimation } from '../animations/fly-in';

import { Link } from 'react-router-dom';
import './frontpage.css';

const IS_MOBILE = window.innerWidth < 800;
const myScrollTo = require('../tools/myScrollTo').myScrollTo;

class Cover extends React.Component{
    render() {
        return (
            <div className='cover-wrapper'>
                <div
                    className={this.props.bgIsLoaded ? 'cover-bg-loaded' : 'cover-bg'}
                    // style={{ filter: `brightness(${this.state.brightness}%)`}}
                >
                </div>

                <h1 className='cover-intro'>Welcome To Xiaoxi's Home!</h1>
                <MouseIcon className='mouse-icon' onClickMouseIcon={this.props.onClickMouseIcon}/>
            </div>
        )
    }
}

function Tile(props) {
    //receives props: link, className, tileName, imgUrl, imgIsLoaded
    // tile for gallery
    if (props.imgUrl) {
        const image = props.imgIsLoaded ?
            {style: {backgroundImage: `url(${props.imgUrl})`}}:
            {style: {}};
        return (
            <Link to={props.link}>
                <div
                    className={props.className}
                    {...image}
                    >
                    <h5>{props.tileName}</h5>
                </div>
            </Link>
        )
    } else {
        // tile for projects
        return (
            <Link to={props.link}>
                <div
                    className={props.className}>
                    { props.tileName.split(' ').map(name => <h3 key={name}> { name } </h3>) }
                </div>
            </Link>
        )
    }
}


// IMPORTANT!! DON'T USE HOC IN RENDER!!
let WithFlyInAnimationTile = Tile;
let AcademicTitle = () => <h2>Academic Project</h2>;
let WebTitle = () => <h2>Web App Project</h2>;
let GalleryTitle = () => <h2>Photography</h2>;
// No animation on small screen
if (!IS_MOBILE) {
    WithFlyInAnimationTile = withFlyInAnimation(Tile);
    AcademicTitle = withFlyInAnimation(AcademicTitle);
    WebTitle = withFlyInAnimation(WebTitle);
    GalleryTitle = withFlyInAnimation(GalleryTitle);
}

class ProjectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animationTriggerPoint: 9999
        };
        this.containerRef = React.createRef();
    }
    componentDidMount() {
        this.setState({
            animationTriggerPoint: this.containerRef.current.offsetTop + this.containerRef.current.offsetHeight * 0.2
        })
    }
    render() {
        //props: type: academic, webApp, gallery
        //props: listAndLink
        //props: if(gallery) imgUrls


        // Academic Project List
        if (this.props.type === 'academic') {
            const array = [...this.props.listAndArray.academicProjectArray];
            const linkArray = [...this.props.listAndArray.academicProjectLinkArray];
            const flyInDelayRemap = [0.2, 0.1, 0, 0.1, 0.2, 0.3];
            const flyInDirectionRemap = ['left', 'left', 'left', 'right', 'right', 'right'];
            return (
                <div className='project-container' ref={this.containerRef}>
                    <AcademicTitle
                        flyInDirection={'down'}
                        flyInDelay={0}
                        animationTriggerPoint={this.state.animationTriggerPoint}
                    />
                    <div className='flexbox-wrapper-800' id='academic'>
                        {array.map((i, index) => {
                            const tileSize = (index === 1 || index === 3) ? 'tile-big' : 'tile-sm';
                            return <WithFlyInAnimationTile
                                link={linkArray[index]}
                                tileName={i}
                                className={tileSize}
                                key={`academic${index}`}
                                flyInDirection={flyInDirectionRemap[index]}
                                flyInDelay={flyInDelayRemap[index]}
                                animationTriggerPoint={this.state.animationTriggerPoint}
                                wrapperClassName={'fly-in-wrapper'}
                            />
                        })}
                    </div>
                </div>
            )
        }

        // Web App Project List
        if (this.props.type === 'webApp') {
            const array = [...this.props.listAndArray.webAppProjectArray];
            const linkArray = [...this.props.listAndArray.webAppProjectLinkArray];
            const flyInDelayRemap = [0, 0.1, 0.2, 0.3, 0.2, 0.1];
            const flyInDirectionRemap = ['right', 'right', 'right', 'left', 'left', 'left'];
            return (
                <div className='project-container' ref={this.containerRef}>
                    <WebTitle
                        flyInDirection={'down'}
                        flyInDelay={0}
                        animationTriggerPoint={this.state.animationTriggerPoint}
                    />
                    <div className='flexbox-wrapper-800' id='web'>
                        {array.map((i, index) => {
                            const tileSize = (index === 0 || index === 5) ? 'tile-big ribboned' : 'tile-sm';
                            return <WithFlyInAnimationTile
                                link={linkArray[index]}
                                tileName={i}
                                className={tileSize}
                                key={`web${index}`}
                                flyInDirection={flyInDirectionRemap[index]}
                                flyInDelay={flyInDelayRemap[index]}
                                animationTriggerPoint={this.state.animationTriggerPoint}
                                wrapperClassName={'fly-in-wrapper'}
                            />
                        })}
                    </div>
                </div>
            )
        }

        // Gallery Project List
        if (this.props.type === 'gallery') {
            const array = [...this.props.listAndArray.galleryArray];
            const linkArray = [...this.props.listAndArray.galleryLinkArray];
            const flyInDelayRemap = [0.2, 0.2, 0.1, 0.1, 0, 0];
            const flyInDirectionRemap = ['left', 'right', 'left', 'right', 'left', 'right'];
            return (
                <div className='project-container' ref={this.containerRef}>
                    <GalleryTitle
                        flyInDirection={'down'}
                        flyInDelay={0}
                        animationTriggerPoint={this.state.animationTriggerPoint}
                    />
                    <div className='flexbox-wrapper-800' id='gallery'>
                        {array.map((i, index) => {
                            const tileSize = 'tile-gallery';
                            const imgUrl = this.props.imgUrls[index];
                            return <WithFlyInAnimationTile
                                link={linkArray[index]}
                                tileName={i}
                                className={tileSize}
                                imgUrl={imgUrl}
                                imgIsLoaded={this.props.imgIsLoaded}
                                key={`gallery${index}`}
                                flyInDirection={flyInDirectionRemap[index]}
                                flyInDelay={flyInDelayRemap[index]}
                                animationTriggerPoint={this.state.animationTriggerPoint}
                                wrapperClassName={'fly-in-wrapper'}
                            />
                        })}
                    </div>
                </div>
            )
        }
    }
}

class Frontpage extends React.Component {
    constructor(props) {
        super(props);
        this.galleryRef = React.createRef();
        this.academicRef = React.createRef();
        this.webRef = React.createRef();
        this.state = {
            bgIsLoaded: false,
            imgIsLoaded: false
        };
        this.imgUrls = [
            'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/preview/toronto.png',
            'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/preview/canada.jpg',
            'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/preview/banff.png',
            'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/preview/hometown.png',
            'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/preview/yorku.png',
            'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/preview/astro.png'
        ];
        this.galleryLazyLoad = this.galleryLazyLoad.bind(this);
        this.scrollToWorkRef = this.scrollToWorkRef.bind(this);

        this.parallelBoxRef = React.createRef();
        this.parallelBoxScrollHandler = this.parallelBoxScrollHandler.bind(this);
        this.prepareParallelBoxScrollEvent = this.prepareParallelBoxScrollEvent.bind(this);
    }
    scrollToWorkRef() {
        myScrollTo(this.academicRef.current.offsetTop, this.parallelBoxRef.current);
    };
    loadImage(src) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = err => reject(err);
            image.src = src;
        });
    }
    galleryLazyLoad() {
        const viewpointHeight = window.innerHeight;
        const galleryTop = this.galleryRef.current.getBoundingClientRect().top;
        const galleryIsVisible = galleryTop - 200 < viewpointHeight;
        if (galleryIsVisible) {
            this.setState({imgIsLoaded: true});
            window.removeEventListener('scroll', this.galleryLazyLoad);
        }
    }
    prepareParallelBoxScrollEvent() {
        this.parallelBoxRef.current.addEventListener('scroll', this.parallelBoxScrollHandler);
        // polyfill
        (function () {

            if ( typeof window.CustomEvent === "function" ) return false;

            function CustomEvent ( event, params ) {
                params = params || { bubbles: false, cancelable: false, detail: null };
                const evt = document.createEvent( 'CustomEvent' );
                evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
                return evt;
            }

            window.CustomEvent = CustomEvent;
        })();
        //
        this.parallelBoxScrollEvent = new CustomEvent('scroll', { bubbles: true, cancelable: false, detail: null })
    }
    parallelBoxScrollHandler() {
        window.scrollY = this.parallelBoxRef.current.scrollTop;
        document.dispatchEvent(this.parallelBoxScrollEvent);
    }
    componentDidMount() {
        window.addEventListener('scroll', this.galleryLazyLoad);
        if (!IS_MOBILE) {
            this.prepareParallelBoxScrollEvent();
            this.loadImage('https://s3.us-east-2.amazonaws.com/xiaoxihome/cover-5k.jpg')
                .then(() => {
                    this.setState({bgIsLoaded: true})
                })
        } else {
            this.loadImage('https://s3.us-east-2.amazonaws.com/xiaoxihome/cover-mobile.jpg').then(() => this.setState({bgIsLoaded: true}));
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.galleryLazyLoad);
        this.parallelBoxRef.current.removeEventListener('scroll', this.parallelBoxScrollHandler);
    }
    render() {
        //It receives props: listAndLink
        return (
            <div className='frontpage-main' ref={this.parallelBoxRef}>
                <HeaderCover listAndLink={this.props.listAndLink} />
                <Cover onClickMouseIcon={this.scrollToWorkRef} bgIsLoaded={this.state.bgIsLoaded}/>

                <div className={'academic-and-web'}>
                    <div ref={this.academicRef}/>
                    <ProjectList
                        type='academic'
                        listAndArray={this.props.listAndLink}
                    />

                    <div ref={this.webRef}/>
                    <ProjectList
                        type='webApp'
                        listAndArray={this.props.listAndLink}
                    />
                </div>

                <div className={'gallery'} ref={this.galleryRef}>
                    <ProjectList
                        type='gallery'
                        listAndArray={this.props.listAndLink}
                        imgUrls={this.imgUrls}
                        imgIsLoaded={this.state.imgIsLoaded}
                    />
                </div>
                <Footer listAndLink={this.props.listAndLink}/>
            </div>
        )
    }
}

export { Frontpage };


