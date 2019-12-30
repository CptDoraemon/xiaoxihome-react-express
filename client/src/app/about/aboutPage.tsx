import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import './aboutPage.css';
import { data } from './data';
import { MdRadioButtonUnchecked, MdRadioButtonChecked, MdPowerSettingsNew } from "react-icons/md";
import { setTitle } from "../../tools/set-title";
import { myScrollTo } from "../../tools/myScrollTo";
import {Link} from "react-router-dom";

const IS_MOBILE = window.innerWidth <= 800;

interface PageData {
    title: string,
    content: string,
    imageUrl: string
}

// class Loading extends  React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             percent: 0
//         };
//         this.preloadCacheArray = [];
//         this.textColorChanged = false;
//         this.animation = this.animation.bind(this);
//     }
//     animation() {
//         const el = document.getElementById('loading');
//         let speed = 0.5;
//         const loop = () => {
//             if (this.props.isSkip && speed !== 2) {
//                 speed = 2;
//             }
//             if (!this.props.isSkip && this.state.percent >= 20 && this.speed !== 0.2) {
//                 speed = 0.1;
//             }
//             if (this.state.percent >= 50 && !this.textColorChanged) {
//                 this.textColorChanged = true;
//             }
//
//
//             if (this.state.percent < 100) {
//                 this.setState({percent: this.state.percent + speed});
//                 requestAnimationFrame(loop)
//             } else {
//                 this.setState({percent: 100});
//                 el.style.opacity = 0;
//                 setTimeout(this.props.finishLoad, 1000)
//             }
//         };
//         requestAnimationFrame(loop)
//     }
//     componentDidMount() {
//         this.animation()
//     }
//     render() {
//         return (
//             <div className='one-page-section-wrapper-row' id='loading'>
//                 <div className='loading-gradient' />
//                 <div className='loading-bg' style={{height: 100 - this.state.percent + '%'}}/>
//                 <div className='loading-text-wrapper'>
//                     <span style={{color: this.textColorChanged ? 'white' : 'black'}}>Loading {Math.floor(this.state.percent)}%</span>
//                 </div>
//             </div>
//         )
//     }
// }

function ActiveButton () {
    return (
        <div className='about-nav-button-wrapper'>
            <MdRadioButtonChecked size='15px' color='black'/>
        </div>
        )
}
interface InActiveButtonProps{
    setCurrentAtPage: Dispatch<SetStateAction<number>>,
    index: number
}
function InActiveButton (props: InActiveButtonProps) {
    return (
        <div className='about-nav-button-wrapper' onClick={() => props.setCurrentAtPage(props.index)}>
            <MdRadioButtonUnchecked size='15px' color='rgba(0,0,0,0.2)'/>
        </div>
    )
}

interface NavBarProps {
    currentAtPage: number,
    length: number,
    setCurrentAtPage: Dispatch<SetStateAction<number>>
}

function NavBar(props: NavBarProps) {
    const buttons = [];
    for (let i=0; i<props.length; i++) {
        i === props.currentAtPage ?
            buttons.push(<ActiveButton key={i} />) :
            buttons.push(<InActiveButton key={i} setCurrentAtPage={props.setCurrentAtPage} index={i}/>)
    }
    return (
        <div className='about-nav-wrapper'>
            { buttons }
        </div>
    )
}

interface PageProps extends PageData {
    currentAtPage: number,
    id: number,
}

function Page(props: PageProps) {
    return (
        <>
            <div className={'about-page-text-wrapper'} style={IS_MOBILE ? {} : {opacity: props.currentAtPage === props.id ? 1 : 0}}>
                <h2>{ props.title }</h2>
                { props.content.split('\n').map((p, i) => <p key={i}>{p}</p>) }
            </div>

            { !IS_MOBILE && <div className={'about-page-text-placehoder'}> </div> }

            <div className='about-page-image-wrapper'>
                <img src={props.imageUrl} alt={'image'} />
            </div>
        </>
    )
}
// class AboutPage extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isLoadPageFinished: false,
//             areImagesReady: false,
//             currentAtPage: 0
//         };
//         this.finishLoad = this.finishLoad.bind(this);
//         this.loadResources = this.loadResources.bind(this);
//         this.handleScroll = this.handleScroll.bind(this);
//         this.data = data.slice();
//         this.checkPoints = [];
//         this.isScrolling = false;
//     }
//     finishLoad() {
//         this.setState({isLoadPageFinished: true})
//     }
//     loadResources() {
//         const preloadCacheArray = [];
//         function loadImage(src, key) {
//             return new Promise((resolve, reject) => {
//                 const image = new Image();
//                 image.src = src;
//                 image.setAttribute('key', key.toString());
//                 preloadCacheArray.push(image);
//                 image.onload = () => resolve(image);
//                 image.onerror = (err) => reject(err);
//             })
//         }
//
//         const loadImages = this.data.map((data, index) => loadImage(data.imageUrl, index));
//         this.preloadCacheArray = preloadCacheArray;
//         Promise.all(loadImages)
//             .then(() => this.setState({areImagesReady: true}))
//             .catch(err => console.log(err));
//     }
//     handleScroll(e) {
//         if (!this.state.isLoadPageFinished || this.isScrolling) return;
//
//         // set checkPoints:
//         if (!this.checkPoints.length) {
//             for (let i=0; i<this.data.length; i++) {
//                 const top = document.getElementById('page'+i).offsetTop;
//                 this.checkPoints.push(top);
//             }
//         }
//
//         this.isScrolling = true;
//
//         const scrolled = e.deltaY;
//         const currentAtPage = this.state.currentAtPage;
//         const currentPixel = this.checkPoints[currentAtPage];
//         const last = this.checkPoints.length - 1;
//         if (scrolled > 0) {
//             // scroll down
//             if (currentAtPage !== last) {
//                 myWheelTo(currentPixel, this.checkPoints[currentAtPage + 1]);
//                 this.setState({currentAtPage: currentAtPage + 1})
//             } else {
//                 myWheelTo(currentPixel, 0);
//                 this.setState({currentAtPage: 0})
//             }
//         } else {
//             // scroll up
//             if (currentAtPage !== 0) {
//                 myWheelTo(currentPixel, this.checkPoints[currentAtPage - 1]);
//                 this.setState({currentAtPage: currentAtPage - 1})
//             } else {
//                 myWheelTo(currentPixel, this.checkPoints[last]);
//                 this.setState({currentAtPage: last})
//             }
//         }
//
//         setTimeout(() => this.isScrolling = false, 2000)
//     }
//     componentDidMount() {
//         setTitle('About me', false);
//         this.loadResources();
//         window.scrollY = 0;
//
//         if (window.innerWidth >= 800) {
//             const body = document.getElementsByTagName('body')[0];
//             body.style.overflow = 'hidden';
//             window.addEventListener('wheel', this.handleScroll);
//         }
//     }
//     componentWillUnmount() {
//         window.removeEventListener('wheel', this.handleScroll);
//     }
//     render() {
//         const pages = this.data.map((i, index) => {
//             return (
//                 <Page id={index} title={i.title} content={i.content} currentAtPage={this.state.currentAtPage} imageUrl={i.imageUrl} key={index}/>
//             )
//         });
//
//         // RENDER
//         if(!this.state.isLoadPageFinished) {
//             return (
//                 <Loading finishLoad={this.finishLoad} isSkip={this.state.areImagesReady}/>
//             )
//         } else {
//             return (
//                 <div>
//                     { pages }
//                     <NavBar currentAtPage={this.state.currentAtPage} length={this.data.length}/>
//                     <a href='/'>
//                         <div className='about-return-wrapper'>
//                             <MdPowerSettingsNew size='25px' />
//                         </div>
//                     </a>
//                 </div>
//             )
//         }
//     }
// }


function useOnePageScroll(initialValue: number, pageCount: number) {
    const [currentAtPage, setCurrentAtPage] = useState(initialValue);
    const [isScrolling, setIsScrolling] = useState(false);
    const DEBOUNCE_TIMER = 2000;
    let timeoutId: any;

    function scrollHandler(e: WheelEvent) {
        if (isScrolling) return;

        setIsScrolling(true);
        timeoutId = setTimeout(() => {
            setIsScrolling(false);
        }, DEBOUNCE_TIMER);

        if (e.deltaY > 0) {
            // scrolling down
            if (currentAtPage + 1 <= pageCount - 1) {
                setCurrentAtPage(currentAtPage + 1)
            }
        } else if (e.deltaY < 0) {
            // scrolling up
            if (currentAtPage - 1 >= 0) {
                setCurrentAtPage(currentAtPage - 1)
            }
        }
    }

    useEffect(() => {
        document.addEventListener('wheel', scrollHandler);
        return () => {
            document.removeEventListener('wheel', scrollHandler);
        }
    });

    useEffect(() => {
        return () => clearTimeout(timeoutId)
    }, []);

    return {
        currentAtPage,
        setCurrentAtPage
    }
}


interface AboutPageLoadedProps {
    pageData: Array<PageData>,
}

function AboutPageLoaded(props: AboutPageLoadedProps) {

    const pageRefs = props.pageData.map(() => useRef<HTMLDivElement>(document.createElement("div")));

    const {currentAtPage, setCurrentAtPage} = useOnePageScroll(0, props.pageData.length);

    if (!IS_MOBILE) {
        useEffect(() => {
            myScrollTo(pageRefs[currentAtPage].current.offsetTop)
        }, [currentAtPage]);

        useEffect(() => {
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100vh';
            return () => {
                document.body.style.overflow = '';
                document.body.style.height = '';
            }
        }, [])
    }

    return (
        <div className={'about-page-wrapper'}>
            {
                props.pageData.map((i, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Page title={i.title} content={i.content} currentAtPage={currentAtPage} imageUrl={i.imageUrl} id={index}/>
                            <div ref={pageRefs[index]}> </div>
                        </React.Fragment>
                    )
                })
            }
            <NavBar currentAtPage={currentAtPage} length={props.pageData.length} setCurrentAtPage={setCurrentAtPage}/>
            <Link to='/'>
                <div className='about-return-wrapper'>
                    <MdPowerSettingsNew size='25px' />
                </div>
            </Link>
        </div>
    )
}


function AboutPage() {

    useEffect(() => {
        setTitle('About me', false);
    }, []);

    return (
        <AboutPageLoaded pageData={data}/>
    )
}

export default AboutPage;