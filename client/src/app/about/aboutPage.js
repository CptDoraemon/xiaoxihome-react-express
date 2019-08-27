import React from 'react';
import './aboutPage.css';
import { data } from './data';
import { MdRadioButtonUnchecked, MdRadioButtonChecked, MdPowerSettingsNew } from "react-icons/md";

const myWheelTo = require('../../tools/myScrollTo').myWheelTo;

class Loading extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 0
        };
        this.preloadCacheArray = [];
        this.textColorChanged = false;
        this.animation = this.animation.bind(this);
    }
    animation() {
        const el = document.getElementById('loading');
        let speed = 0.5;
        const loop = () => {
            if (this.props.isSkip && speed !== 2) {
                speed = 2;
            }
            if (!this.props.isSkip && this.state.percent >= 20 && this.speed !== 0.2) {
                speed = 0.1;
            }
            if (this.state.percent >= 50 && !this.textColorChanged) {
                this.textColorChanged = true;
            }


            if (this.state.percent < 100) {
                this.setState({percent: this.state.percent + speed});
                requestAnimationFrame(loop)
            } else {
                this.setState({percent: 100});
                el.style.opacity = 0;
                setTimeout(this.props.finishLoad, 1000)
            }
        };
        requestAnimationFrame(loop)
    }
    componentDidMount() {
        this.animation()
    }
    render() {
        return (
            <div className='one-page-section-wrapper-row' id='loading'>
                <div className='loading-gradient' />
                <div className='loading-bg' style={{height: 100 - this.state.percent + '%'}}/>
                <div className='loading-text-wrapper'>
                    <span style={{color: this.textColorChanged ? 'white' : 'black'}}>Loading {Math.floor(this.state.percent)}%</span>
                </div>
            </div>
        )
    }
}

const ActiveButton = (props) => {
    return (
        <div className='about-nav-button-wrapper'>
            <MdRadioButtonChecked size='15px' color='black'/>
        </div>
        )
};
const InActiveButton = (props) => {
    return (
        <div className='about-nav-button-wrapper'>
            <MdRadioButtonUnchecked size='15px' color='rgba(0,0,0,0.2)'/>
        </div>
    )
};
function NavBar(props) {
    const buttons = [];
    for (let i=0; i<props.length; i++) {
        i === props.currentAtPage ?
            buttons.push(<ActiveButton key={i} />) :
            buttons.push(<InActiveButton key={i} />)
    }
    return (
        <div className='about-nav-wrapper'>
            { buttons }
        </div>
    )
}

function Page(props) {
    const isMobile = window.innerWidth <= 800;
    const textCSS = isMobile ? 'about-text-wrapper-mobile' : 'about-text-wrapper';
    return (
        <div className='one-page-section-wrapper-row' id={'page'+props.id}>
            <div className={textCSS} style={isMobile ? null : {opacity: props.currentAtPage === props.id ? 1 : 0}}>
                <h2>{ props.title }</h2>
                { props.content.split('\n').map(p => <p>{p}</p>) }
            </div>
            { isMobile ? null : <div className='about-text-wrapper-placeholder' /> }
            <div className='about-image-wrapper' style={{backgroundImage: 'url('+props.imageUrl+')'}}/>
        </div>
    )
}
class AboutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadPageFinished: false,
            areImagesReady: false,
            currentAtPage: 0
        };
        this.finishLoad = this.finishLoad.bind(this);
        this.loadResources = this.loadResources.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.data = data.slice();
        this.checkPoints = [];
        this.isScrolling = false;
    }
    finishLoad() {
        this.setState({isLoadPageFinished: true})
    }
    loadResources() {
        const preloadCacheArray = [];
        function loadImage(src, key) {
            return new Promise((resolve, reject) => {
                const image = new Image();
                image.src = src;
                image.setAttribute('key', key.toString());
                preloadCacheArray.push(image);
                image.onload = () => resolve(image);
                image.onerror = (err) => reject(err);
            })
        }

        const loadImages = this.data.map((data, index) => loadImage(data.imageUrl, index));
        this.preloadCacheArray = preloadCacheArray;
        Promise.all(loadImages)
            .then(() => this.setState({areImagesReady: true}))
            .catch(err => console.log(err));
    }
    handleScroll(e) {
        if (!this.state.isLoadPageFinished || this.isScrolling) return;

        // set checkPoints:
        if (!this.checkPoints.length) {
            for (let i=0; i<this.data.length; i++) {
                const top = document.getElementById('page'+i).offsetTop;
                this.checkPoints.push(top);
            }
        }

        this.isScrolling = true;

        const scrolled = e.deltaY;
        const currentAtPage = this.state.currentAtPage;
        const currentPixel = this.checkPoints[currentAtPage];
        const last = this.checkPoints.length - 1;
        if (scrolled > 0) {
            // scroll down
            if (currentAtPage !== last) {
                myWheelTo(currentPixel, this.checkPoints[currentAtPage + 1]);
                this.setState({currentAtPage: currentAtPage + 1})
            } else {
                myWheelTo(currentPixel, 0);
                this.setState({currentAtPage: 0})
            }
        } else {
            // scroll up
            if (currentAtPage !== 0) {
                myWheelTo(currentPixel, this.checkPoints[currentAtPage - 1]);
                this.setState({currentAtPage: currentAtPage - 1})
            } else {
                myWheelTo(currentPixel, this.checkPoints[last]);
                this.setState({currentAtPage: last})
            }
        }

        setTimeout(() => this.isScrolling = false, 2000)
    }
    componentDidMount() {
        this.loadResources();
        window.scrollY = 0;

        if (window.innerWidth >= 800) {
            const body = document.getElementsByTagName('body')[0];
            body.style.overflow = 'hidden';
            window.addEventListener('wheel', this.handleScroll);
        }
    }
    componentWillUnmount() {
        window.removeEventListener('wheel', this.handleScroll);
    }
    render() {
        const pages = this.data.map((i, index) => {
            return (
                <Page id={index} title={i.title} content={i.content} currentAtPage={this.state.currentAtPage} imageUrl={i.imageUrl} key={index}/>
            )
        });

        // RENDER
        if(!this.state.isLoadPageFinished) {
            return (
                <Loading finishLoad={this.finishLoad} isSkip={this.state.areImagesReady}/>
            )
        } else {
            return (
                <div>
                    { pages }
                    <NavBar currentAtPage={this.state.currentAtPage} length={this.data.length}/>
                    <a href='/'>
                        <div className='about-return-wrapper'>
                            <MdPowerSettingsNew size='25px' />
                        </div>
                    </a>
                </div>
            )
        }
    }
}

export { AboutPage as default };