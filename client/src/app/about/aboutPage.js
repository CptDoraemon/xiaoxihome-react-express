import React from 'react';
import './aboutPage.css';
import { data } from './data';
import { MdRadioButtonUnchecked, MdRadioButtonChecked, MdPowerSettingsNew } from "react-icons/md";

const myWheelTo = require('../../tools/myScrollTo').myWheelTo;

class Loading extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 0,
        };
        this.textColorChanged = false;
        this.animation = this.animation.bind(this);
        this.animationLoop = this.animationLoop.bind(this);
    }
    animation() {
        requestAnimationFrame(this.animationLoop)
    }
    animationLoop() {
        let speed = 0.5;
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
            requestAnimationFrame(this.animationLoop)
        } else {
            this.setState({
                percent: 100,
            }, () => {
                setTimeout(this.props.prerender, 100);
            });
        }
    }
    componentDidMount() {
        this.animation()
    }
    render() {
        return (
            <div className='one-page-section-wrapper-row loading-ontop' style={{opacity: this.props.isPrerenderFinished ? 0 : 1}}>
                <div className='loading-gradient' />
                <div className='loading-bg' style={{height: 100 - this.state.percent + '%'}}/>
                <div className='loading-text-wrapper'>
                    <span style={{color: this.textColorChanged ? 'white' : 'black'}}>Loading {Math.floor(this.state.percent)}%</span>
                </div>
            </div>
        )
    }
}
function NavBar(props) {
    const buttons = [];
    for (let i=0; i<props.length; i++) {
        const key = `aboutPageButton${i}`;
        i === props.currentAtPage ?
            buttons.push(<div key={key} className='about-nav-button-wrapper'><MdRadioButtonChecked size='15px' color='black'/></div>) :
            buttons.push(<div key={key} className='about-nav-button-wrapper'><MdRadioButtonUnchecked size='15px' color='rgba(0,0,0,0.2)'/></div>)
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
                <p>{ props.content }</p>
            </div>
            { isMobile ? null : <div className='about-text-wrapper-placeholder' /> }
            <div className='about-image-wrapper' style={{ backgroundImage: 'url('+props.imageUrl+')' }}/>
        </div>
    )
}
class AboutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            areImagesReady: false,
            isPrerenderFinished: false,
            isLoadingFinished: false,
            currentAtPage: 0
        };
        this.loadResources = this.loadResources.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.prerender = this.prerender.bind(this);
        this.finishLoading = this.finishLoading.bind(this);
        this.data = data.slice();
        this.checkPoints = [];
        this.isScrolling = false;
    }
    loadResources() {
        function loadImage(src) {
            return new Promise((resolve, reject) => {
                const image = new Image();
                image.src = src;
                image.onload = () => resolve();
                image.onerror = (err) => reject(err);
            })
        }

        const loadImages = this.data.map(data => loadImage(data.imageUrl));
        Promise.all(loadImages)
            .then(() => this.setState({areImagesReady: true}))
            .catch(err => console.log(err));
    }
    handleScroll(e) {
        if (!this.state.isLoadingFinished || this.isScrolling) return;

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
    prerender() {
        this.prerenderedElements = this.data.map((i, index) => <Page
            id={index}
            title={i.title}
            content={i.content}
            currentAtPage={this.state.currentAtPage}
            imageUrl={i.imageUrl}
            key={`aboutPage${index}`}/>);
        this.setState({isPrerenderFinished: true}, () => setTimeout(this.finishLoading, 1000));
    }
    finishLoading() {
        this.setState({isLoadingFinished: true})
    }
    componentDidMount() {
        window.scrollY = 0;

        if (window.innerWidth >= 800) {
            const body = document.getElementsByTagName('body')[0];
            body.style.overflow = 'hidden';
            window.addEventListener('wheel', this.handleScroll);
        }

        this.loadResources();
    }
    componentWillUnmount() {
        window.removeEventListener('wheel', this.handleScroll);
    }
    render() {
        return (
                <div>
                    {
                        this.state.isLoadingFinished ?
                            null :
                            <Loading
                                isSkip={this.state.areImagesReady}
                                prerender={this.prerender}
                                finishLoading={this.finishLoading}
                                isPrerenderFinished={this.state.isPrerenderFinished}
                            />
                    }

                    {
                        this.state.isPrerenderFinished ?
                            this.prerenderedElements :
                            null
                    }

                    <NavBar currentAtPage={this.state.currentAtPage} length={this.data.length}/>
                    <a href='/'>
                        <div className='about-return-wrapper'>
                            <MdPowerSettingsNew size='25px' />
                        </div>
                    </a>
                </div>
        );
    }
}

export { AboutPage as default };