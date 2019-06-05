import React from 'react';

import { HeaderCover } from "../component/header";
import { Footer } from "../component/footer";
import { MouseIcon } from "../component/mouseIcon";
import { withFlyInAnimation } from '../animations/fly-in';

import { Link } from 'react-router-dom';
import './frontpage.css';

const myScrollTo = require('../tools/myScrollTo').myScrollTo;

class Cover extends React.Component{
    // It receives a prop onClickMouseIcon={this.scrollToWorkRef}, bgIsLoaded
    render() {
        return (
            <div className='cover-wrapper'>
                <div className={this.props.bgIsLoaded ? 'cover-bg-loaded' : 'cover-bg'}>
                </div>
                <div className='cover'>
                    <h1 className='cover-intro'>Welcome To Xiaoxi's Home!</h1>
                    <MouseIcon className='mouse-icon' onClickMouseIcon={this.props.onClickMouseIcon}/>
                </div>
            </div>
        )
    }
}

function Tile(props) {
    //receives props: link, className, tileName, imgUrl, imgIsLoaded
    // tile for gallery
    if (props.imgUrl) {
        const image = props.imgIsLoaded ?
            {style: {backgroundImage: 'url("' + props.imgUrl + '")'}} :
            null;
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
    }
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

// No animation on small screen
// IMPORTANT!! DON'T USE HOC IN RENDER!!
const WithFlyInAnimationTile = window.innerWidth > 800 ? withFlyInAnimation(Tile) : Tile;

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
                    <h2 id='academicTitle'>Academic Project</h2>
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
                            />
                        })}
                    </div>
                </div>
            )
        }

        // Web App Project List
        if (this.props.type === 'webApp') {
            const array = [...this.props.listAndArray.webAppProjectArray];
            const linkArray = [...this.props.listAndArray.webAppProjectArray];
            const flyInDelayRemap = [0, 0.1, 0.2, 0.3, 0.2, 0.1];
            const flyInDirectionRemap = ['right', 'right', 'right', 'left', 'left', 'left'];
            return (
                <div className='project-container' ref={this.containerRef}>
                    <h2 id='webTitle'>Web App Project</h2>
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
            const flyInDelayRemap = [0.2, 0, 0.1, 0.1, 0, 0.2];
            const flyInDirectionRemap = ['up', 'down', 'up', 'down', 'up', 'down'];
            return (
                <div className='project-container' ref={this.containerRef}>
                    <h2>Photography</h2>
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
            'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/preview/canada.png',
            'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/preview/banff.png',
            'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/preview/hometown.png',
            'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/preview/yorku.png',
            'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/preview/astro.png'
        ];
        this.galleryLazyLoad = this.galleryLazyLoad.bind(this);
        this.scrollToWorkRef = this.scrollToWorkRef.bind(this);
    }
    scrollToWorkRef() {
        myScrollTo(this.academicRef.current.offsetTop);
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
        const scrolled = window.scrollY;
        const scrolledBottom = scrolled + window.innerHeight;
        const galleryTop = this.galleryRef.current.offsetTop;
        if (scrolledBottom >= galleryTop && !this.state.imgIsLoaded) {
            this.setState({imgIsLoaded: true});
            window.removeEventListener('scroll', this.galleryLazyLoad);
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.galleryLazyLoad);

        if (window.innerWidth > 800) {
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
    }
    render() {
        //It receives props: listAndLink
        return (
            <div className='frontpage-main'>
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


