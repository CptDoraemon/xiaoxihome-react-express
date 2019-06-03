import React from 'react';

import { HeaderCover} from "../component/header";
import { Footer} from "../component/footer";
import { MouseIcon } from "../component/mouseIcon";

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
                { props.tileName.split(' ').map(name => <h3 key={name}> { name } </h3>) }
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
                    <h2 id='academicTitle'>Academic Project</h2>
                    <div className='flexbox-wrapper-800' id='academic'>
                        {array.map((i, index) => {
                            const tileSize = (index === 1 || index === 3) ? 'tile-big' : 'tile-sm';
                            return <Tile link={linkArray[index]} tileName={i} className={tileSize} id={'academicTile' + index} key={`academic${i}`}/>
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
                    <h2 id='webTitle'>Web App Project</h2>
                    <div className='flexbox-wrapper-800' id='web'>
                        {array.map((i, index) => {
                            const tileSize = (index === 0 || index === 5) ? 'tile-big ribboned' : 'tile-sm';
                            return <Tile link={linkArray[index]} tileName={i} className={tileSize} id={'webTile' + index} key={`web${i}`}/>
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
                    <div className='flexbox-wrapper-800' id='gallery'>
                        {array.map((i, index) => {
                            const tileSize = 'tile-gallery';
                            const imgUrl = this.props.imgUrls[index];
                            return <Tile link={linkArray[index]} tileName={i} className={tileSize} imgUrl={imgUrl} imgIsLoaded={this.props.imgIsLoaded} id={'galleryTile' + index} key={`gallery${i}`}/>
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
    prepareForAnimation() {
        // initiate variables
        this.academicAnimationDone = false;
        this.webAnimationDone = false;
        this.galleryAnimationDone = false;

        this.academicBox = document.getElementById('academic');
        this.webBox = document.getElementById('web');
        this.galleryBox = document.getElementById('gallery');
        this.academicTitle = document.getElementById('academicTitle');
        this.webTitle = document.getElementById('webTitle');
        this.translateX = 1000;

        const generateCheckPoints = (el, checkPointsArrayName) => {
            const top = el.offsetTop;
            const height = el.offsetHeight + 20; // 200 more pixel than bottom, extends animation
            this[checkPointsArrayName] = [];
            let start = top;
            let interval = height / 6;
            for (let i=0; i<7; i++) {
                this[checkPointsArrayName].push(start);
                start += interval;
            }
        };
        generateCheckPoints(this.academicBox, 'academicCheckPoints');
        generateCheckPoints(this.webBox, 'webCheckPoints');
        generateCheckPoints(this.galleryBox, 'galleryCheckPoints');

        this.academicTop = this.academicCheckPoints[0];
        this.academicBottom = this.academicCheckPoints[this.academicCheckPoints.length - 1];
        this.webTop = this.webCheckPoints[0];
        this.webBottom = this.webCheckPoints[this.webCheckPoints.length - 1];
        this.galleryTop = this.galleryCheckPoints[0];
        this.galleryBottom = this.galleryCheckPoints[this.galleryCheckPoints.length - 1];

        // move components to the start point of animation
        this.academicTitle.style.opacity = 0;
        this.webTitle.style.opacity = 0;

        let el;
        // academic
        this.academicTiles = [];
        this.academicTilesStatus = [];
        this.webTiles = [];
        this.webTilesStatus = [];
        this.galleryTiles = [];
        this.galleryTilesStatus = [];

        for (let i=0; i<6; i++) {
            // academic
            el = document.getElementById('academicTile' + i);
            this.academicTiles.push(el);
            this.academicTilesStatus.push(false);
            el.style.transform = 'translateX('+(this.translateX * -1)+'px)';
            el.style.opacity = 0;
            // web
            el = document.getElementById('webTile' + i);
            this.webTiles.push(el);
            this.webTilesStatus.push(false);
            el.style.transform = 'translateX('+this.translateX+'px)';
            el.style.opacity = 0;
            // gallery
            el = document.getElementById('galleryTile' + i);
            this.galleryTiles.push(el);
            this.galleryTilesStatus.push(false);
            el.style.opacity = 0;
        }
    }
    animation() {
        const scrolled = window.scrollY;
        const scrolledBottom = scrolled + window.innerHeight;
        function whichTileAnimating(checkPointArray) {
            let whichTileAnimate = -1;
            for (let i=0; i<6; i++) {
                if (scrolledBottom >= checkPointArray[i]) {
                    whichTileAnimate++
                } else {
                    break
                }
            }
            return whichTileAnimate;
        }

        const moveInAnimation = (element, status) => {
            if (!status) {
                status = true;
                element.style.transform = 'translateX(0px)';
                element.style.opacity = '1';
            }
        };
        // academic

        // function academicAnimation(tile) {
        //     let currentTranslateX = - this.translateX;
        //     const interval = this.translateX / (0.5 * 60);
        //     function loop() {
        //         tile.style.transform = 'translateX('+currentTranslateX+'px)';
        //         if (currentTranslateX < 0) {
        //             currentTranslateX += interval;
        //             requestAnimationFrame(loop);
        //         }
        //     }
        //     requestAnimationFrame(loop);
        // }
        // academicAnimation = academicAnimation.bind(this);
        // use css animation instead

        if (scrolledBottom >= this.academicTop && scrolledBottom <= this.academicBottom && !this.academicAnimationDone) {
            this.academicTitle.style.opacity = (scrolledBottom - this.academicTop) / (this.academicBottom - this.academicTop);
            const whichTileAnimate = whichTileAnimating(this.academicCheckPoints);
            // real order:
            const realOrder = [2, 1, 0, 5, 4, 3];

            for (let i=0; i<whichTileAnimate; i++) {
                // discrete scroll may skip last checkpoint
                const whichTileAnimateInRealOrder = realOrder[i];
                const status = this.academicTilesStatus[whichTileAnimateInRealOrder];
                if (!status) {
                    moveInAnimation(this.academicTiles[whichTileAnimateInRealOrder], this.academicTilesStatus[whichTileAnimateInRealOrder]);
                }
            }
        } else if (scrolledBottom >= this.webTop && scrolledBottom <= this.webBottom && !this.webAnimationDone) {
            // web
            this.webTitle.style.opacity = (scrolledBottom - this.webTop) / (this.webBottom - this.webTop);
            const whichTileAnimate = whichTileAnimating(this.webCheckPoints);

            for (let i=0; i<whichTileAnimate; i++) {
                // discrete scroll may skip last checkpoint
                const status = this.webTilesStatus[whichTileAnimate];
                if (!status) {
                    moveInAnimation(this.webTiles[i], this.webTilesStatus[i]);
                }
            }
        } else if (scrolledBottom >= this.galleryTop && scrolledBottom <= this.galleryBottom && !this.galleryAnimationDone) {
            // gallery
            const whichTileAnimate = whichTileAnimating(this.galleryCheckPoints);

            for (let i=0; i<whichTileAnimate; i++) {
                // discrete scroll may skip last checkpoint
                const status = this.galleryTilesStatus[whichTileAnimate];
                if (!status) {
                    moveInAnimation(this.galleryTiles[i], this.galleryTilesStatus[i]);
                }
            }
        }

        // finish
        if (scrolledBottom > this.academicBottom && !this.academicAnimationDone) {
            this.academicAnimationDone = true;
            this.academicTitle.style.opacity = 1;
            this.academicTiles.forEach((el, index) => {
                const status = this.academicTilesStatus[index];
                if (!status) {
                    moveInAnimation(el, status)
                }
            })
        } else if (scrolledBottom > this.webBottom && !this.webAnimationDone) {
            this.webAnimationDone = true;
            this.webTitle.style.opacity = 1;
            this.webTiles.forEach((el, index) => {
                const status = this.webTilesStatus[index];
                if (!status) {
                    moveInAnimation(el, status)
                }
            })
        } else if (scrolledBottom > this.galleryBottom && !this.galleryAnimationDone) {
            this.galleryAnimationDone = true;
            this.galleryTiles.forEach((el, index) => {
                const status = this.galleryTilesStatus[index];
                if (!status) {
                    moveInAnimation(el, status)
                }
            })
        } else if (this.academicAnimationDone && this.webAnimationDone && this.galleryAnimationDone) {
            window.removeEventListener('scroll', this.animation);
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.galleryLazyLoad);
        const scrolledBottom = window.scrollY + window.innerHeight;
        if (window.innerWidth > 800 && scrolledBottom < document.getElementById('academic').offsetTop) {
            this.prepareForAnimation();
            window.addEventListener('scroll', this.animation);
        }

        if (window.innerWidth > 800) {
            this.loadImage('https://s3.us-east-2.amazonaws.com/xiaoxihome/cover-5k.jpg')
                .then((image) => {
                    this.setState({bgIsLoaded: true})
                })
        } else {
            this.loadImage('https://s3.us-east-2.amazonaws.com/xiaoxihome/cover-mobile.jpg').then(() => this.setState({bgIsLoaded: true}));
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

export { Frontpage };


