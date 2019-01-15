import React from 'react';

import { HeaderCover} from "../component/header";
import { Footer} from "../component/footer";
import { MouseIcon } from "../component/mouseIcon";

import { Link } from 'react-router-dom';
import './frontpage.css';

const myScrollTo = require('../tools/myScrollTo');

function Cover(props) {
    // It receives a prop onClickMouseIcon={this.scrollToWorkRef}, bgIsLoaded
    return (
        <div className='cover-wrapper'>
            <div className={props.bgIsLoaded ? 'cover-bg-loaded' : 'cover-bg'}>
            </div>
            <div className='cover'>
                <h1 className='cover-intro'>Welcome To Xiaoxi's Home!</h1>
                <MouseIcon className='mouse-icon' onClickMouseIcon={props.onClickMouseIcon}/>
            </div>
        </div>
    )
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
                    id={props.id}
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
                className={props.className}
                id={props.id}>
                <h3>{props.tileName}</h3>
            </div>
        </Link>
    )
}

class ProjectList extends React.Component {
    render() {
        //props: type: academic, webApp, gallery
        //props: listAndLink
        //props: if(gallery) imgUrls

        // Academic Project List
        if (this.props.type === 'academic') {
            const array = [...this.props.listAndArray.academicProjectArray];
            const linkArray = [...this.props.listAndArray.academicProjectLinkArray];
            return (
                <div className='project-container'>
                    <h2>Academic Project</h2>
                    <div className='flexbox-wrapper-800' id='academic'>
                        {array.map((i, index) => {
                            const tileSize = (index === 1 || index === 3) ? 'tile-big' : 'tile-sm';
                            return <Tile link={linkArray[index]} tileName={i} className={tileSize} id={'academicTile' + index}/>
                        })}
                    </div>
                </div>
            )
        }

        // Web App Project List
        if (this.props.type === 'webApp') {
            const array = [...this.props.listAndArray.webAppProjectArray];
            const linkArray = [...this.props.listAndArray.webAppProjectLinkArray];
            return (
                <div className='project-container'>
                    <h2>Web App Project</h2>
                    <div className='flexbox-wrapper-800' id='web'>
                        {array.map((i, index) => {
                            const tileSize = (index === 0 || index === 5) ? 'tile-big' : 'tile-sm';
                            return <Tile link={linkArray[index]} tileName={i} className={tileSize} id={'webTile' + index}/>
                        })}
                    </div>
                </div>
            )
        }

        // Gallery Project List
        if (this.props.type === 'gallery') {
            const array = [...this.props.listAndArray.galleryArray];
            const linkArray = [...this.props.listAndArray.galleryLinkArray];
            return (
                <div className='project-container'>
                    <h2>Photography</h2>
                    <div className='flexbox-wrapper-800'>
                        {array.map((i, index) => {
                            const tileSize = 'tile-gallery';
                            const imgUrl = this.props.imgUrls[index];
                            return <Tile link={linkArray[index]} tileName={i} className={tileSize} imgUrl={imgUrl} imgIsLoaded={this.props.imgIsLoaded} id={'galleryTile' + index}/>
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
        this.academicRef = React.createRef();
        this.webRef = React.createRef();
        this.galleryRef = React.createRef();
        this.academicTiles = [];
        this.webTiles = [];
        this.academicAnimationDone = false;
        this.webAnimationDone = false;
        this.academicBox = null;
        this.webBox = null;
        this.state = {
            toWorkRef: this.props.toWorkRef,
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
        this.prepareForAnimation = this.prepareForAnimation.bind(this);
        this.animation = this.animation.bind(this);
    }
    scrollToWorkRef = () => {
        myScrollTo(this.academicRef.current.offsetTop);
    };
    loadImage(src) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(src);
            image.onerror = err => reject(err);
            image.src = src;
        });
    }
    galleryLazyLoad() {
        const scrolled = window.scrollY;
        const scrolledBottom = scrolled + window.innerHeight;
        const galleryTop = this.galleryRef.current.offsetTop;
        if (scrolledBottom >= galleryTop && !this.state.imgIsLoaded) {
            this.setState({imgIsLoaded: true})
        }
    }
    prepareForAnimation() {
        // let el;
        // for (let i=0; i<6; i++) {
        //     el = document.getElementById('academicTile' + i);
        //     this.academicTiles.push(el);
        //     el = document.getElementById('webTile' + i);
        //     this.webTiles.push(el);
        // }
        this.academicBox = document.getElementById('academic');
        this.webBox = document.getElementById('web');

        this.academicBox.style.transform = 'translateX(-1000px)';
        this.webBox.style.transform = 'translateX(1000px)';
    }
    animation() {
        // academic
        const scrolled = window.scrollY;
        const scrolledBottom = scrolled + window.innerHeight;
        const academicTop = this.academicBox.offsetTop;
        const academicHeight = this.academicBox.offsetHeight;
        const academicBottom = academicTop + academicHeight;
        const init = -1000;
        const translateX = init - init*((scrolledBottom - academicTop)/academicHeight);
        if (scrolledBottom >= academicTop && scrolledBottom <= academicBottom && !this.academicAnimationDone) {
            this.academicBox.style.transform = 'translateX('+translateX+'px)'
        }
        // web
        const webTop = this.webBox.offsetTop;
        const webHeight = this.webBox.offsetHeight;
        const webBottom = webTop + webHeight;
        const initPrime = 1000;
        const translateXPrime = initPrime - initPrime*((scrolledBottom - webTop)/webHeight);
        if (scrolledBottom >= webTop && scrolledBottom <= webBottom && !this.webAnimationDone) {
            this.webBox.style.transform = 'translateX('+translateXPrime+'px)'
        }
        //
        if (scrolledBottom > academicBottom) {
            this.academicAnimationDone = true;
            this.academicBox.style.transform = 'none'
        }
        if (scrolledBottom > webBottom) {
            this.webAnimationDone = true;
            this.webBox.style.transform = 'none'
        }
    }
    componentDidMount() {
        window.innerWidth > 800 ?
            this.loadImage('https://s3.us-east-2.amazonaws.com/xiaoxihome/cover-5k.jpg').then(() => this.setState({bgIsLoaded: true})) :
            this.loadImage('https://s3.us-east-2.amazonaws.com/xiaoxihome/cover-mobile.jpg').then(() => this.setState({bgIsLoaded: true}));

        window.addEventListener('scroll', this.galleryLazyLoad);
        if (window.innerWidth > 800 && window.scrollY < document.getElementById('academic').offsetTop) {
            this.prepareForAnimation();
            window.addEventListener('scroll', this.animation);
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.galleryLazyLoad);
        window.removeEventListener('scroll', this.animation);
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
                        listAndArray={this.props.listAndLink} />
                    <div ref={this.webRef}/>
                    <ProjectList
                        type='webApp'
                        listAndArray={this.props.listAndLink} />
                </div>
                <div className={'gallery'} ref={this.galleryRef}>
                    <ProjectList
                        type='gallery'
                        listAndArray={this.props.listAndLink}
                        imgUrls={this.imgUrls}
                        imgIsLoaded={this.state.imgIsLoaded} />
                </div>
                <Footer listAndLink={this.props.listAndLink}/>
            </div>
        )
    }
}

export {Frontpage};


