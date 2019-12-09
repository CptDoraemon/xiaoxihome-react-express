// import React from 'react';
// import { Link } from 'react-router-dom';
// import './gallery.css'
// import { galleryData } from './galleryData';
//
// import { IoIosArrowDropleft,  IoIosArrowDropright, IoIosPower, IoMdRadioButtonOff, IoMdRadioButtonOn, IoMdAlbums, IoIosPause, IoIosPlay} from "react-icons/io";
// import { SpinLoader } from "../../animations/spin-loader";
// import {setTitle} from "../../tools/set-title";
//
// class Show extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isLoading: false
//         };
//     }
//     loadImage(link) {
//         return new Promise((resolve, reject) => {
//             const image = new Image();
//             image.src = link;
//             image.onload = () => resolve();
//             image.onerror = (err) => reject(err);
//         });
//     }
//     componentWillUpdate(prevProps) {
//         if (this.props.link !== prevProps.link) {
//             this.setState({isLoading: true});
//             this.loadImage(this.props.link)
//                 .then(() => this.setState({isLoading: false}))
//                 .catch(err => console.log(err))
//         }
//     }
//     render() {
//         const backgroundImageCSS = {backgroundImage: 'url(' + this.props.link + ')'};
//         const styleSwitcher = this.state.isLoading ? null : backgroundImageCSS;
//         return (
//             <div className='showcase'>
//                 <div
//                     className='show-blur-bg'
//                     style={styleSwitcher}>
//                 </div>
//                 <div
//                     className='show'
//                     style={styleSwitcher}>
//                 </div>
//                 { this.state.isLoading ? <SpinLoader size={100} /> : null}
//             </div>
//         )
//     }
// }
// class Hud extends React.Component {
//     // It receives props album, pages, title, description
//     //handleClickMenu, handleClickLeft, handleClickRight, handleAutoplay, autoplay
//     constructor(props) {
//         super(props);
//         this.state = {
//             thumbnailStyle: 'thumbnail-inactive',
//             thumbnailTop: '50px',
//             thumbnailLeft: null,
//             thumbnailText: null,
//             thumbnailLink: null,
//         };
//         this.dataArray = [...galleryData];
//         this.xDown = null;
//         this.yDown = null;
//         this.lastToggleHudTime = Date.now();
//         this.toggleHud = this.toggleHud.bind(this);
//         this.handleKeyDown = this.handleKeyDown.bind(this);
//         this.handleTouchStart = this.handleTouchStart.bind(this);
//         this.handleTouchMove = this.handleTouchMove.bind(this);
//     }
//     handleMouseEnter = (album, page, e) => {
//         page === 0 ?
//             this.setState({thumbnailStyle: 'thumbnail-active-text'}) :
//             this.setState({thumbnailStyle: 'thumbnail-active-image'});
//         page === 0 ?
//             // TEXT
//             this.setState({
//                 thumbnailText: this.dataArray[album][page],
//                 thumbnailLink: null,
//                 thumbnailLeft: e.clientX - 20 + 'px'
//             }) :
//             // IMAGE
//             this.setState({
//                 thumbnailLink: this.dataArray[album][page].link,
//                 thumbnailText: null,
//                 thumbnailLeft: e.clientX - 100 + 'px'
//             });
//     };
//     handleMouseLeave() {
//         this.setState({thumbnailStyle: 'thumbnail-inactive'});
//     };
//     toggleHud() {
//         // debounce
//         const now = Date.now();
//         if (now - this.lastToggleHudTime < 500) {
//             return;
//         } else {
//             this.lastToggleHudTime = now;
//         }
//         this.props.toggleHud();
//     }
//     handleKeyDown(e) {
//         this.toggleHud();
//         if (e.keyCode === 37 || e.keyCode === 38) {
//             this.props.handleClickLeft();
//         }
//         if (e.keyCode === 39 || e.keyCode === 40) {
//             this.props.handleClickRight();
//         }
//     }
//     //mobile
//     handleTouchStart(e) {
//         this.xDown = e.touches[0].clientX;
//         this.yDown = e.touches[0].clientY;
//         this.toggleHud();
//     };
//     handleTouchMove(e) {
//         if ( !this.xDown || !this.yDown ) {
//             return;
//         }
//         let xUp = e.touches[0].clientX;
//         let yUp = e.touches[0].clientY;
//         let xDiff = this.xDown - xUp;
//         let yDiff = this.yDown - yUp;
//
//         if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
//             e.preventDefault();
//             if ( xDiff > 0 ) {
//                 /* left swipe */
//                 this.props.handleClickLeft();
//             } else {
//                 /* right swipe */
//                 this.props.handleClickRight();
//             }
//         } else {
//             if ( yDiff > 0 ) {
//                 /* up swipe */
//                 return;
//             } else {
//                 /* down swipe */
//                 return;
//             }
//         }
//         /* reset values */
//         this.xDown = null;
//         this.yDown = null;
//     };
//
//
//
//     componentDidMount() {
//         window.addEventListener('mousemove', this.toggleHud);
//         window.addEventListener('keydown', this.handleKeyDown);
//         // mobile
//         window.addEventListener('touchstart', this.handleTouchStart);
//         window.addEventListener('touchmove', this.handleTouchMove);
//     }
//     componentWillUnmount() {
//         window.removeEventListener('mousemove', this.toggleHud);
//         window.removeEventListener('keydown', this.handleKeyDown);
//         // mobile
//         window.removeEventListener('touchstart', this.handleTouchStart);
//         window.removeEventListener('touchmove', this.handleTouchMove);
//     }
//     render() {
//         const list = this.dataArray.map((i, indexI) => i.map((j, indexJ) => {
//             const attr = {
//                 album: {indexI},
//                 page: {indexJ},
//                 onMouseEnter: (e) => this.handleMouseEnter(indexI, indexJ, e),
//                 onMouseLeave: () => this.handleMouseLeave(),
//             };
//             const key = `galleryLiKey${indexJ}`;
//
//             if (indexJ === 0 ) {
//                 return <li {...attr} key={key}><IoMdAlbums/></li>
//             } else if (indexI === this.props.album && indexJ === this.props.page) {
//                 return (
//                     <li
//                         {...attr}
//                         key={key}
//                         onClick={() => this.props.handleClickMenu(indexI, indexJ)}><IoMdRadioButtonOn/>
//                     </li>
//                     )
//             } else {
//                 return (
//                    <li
//                        {...attr}
//                        key={key}
//                        onClick={() => this.props.handleClickMenu(indexI, indexJ)}><IoMdRadioButtonOff/>
//                    </li>
//                 )
//             }
//         }));
//         return (
//             <div className={this.props.isHudDimmed ? 'hud-off' : 'hud-on'}>
//                 <div className='nav-buttons'>
//
//                     <div className='tooltip'>
//                         <IoIosArrowDropleft onClick={() => this.props.handleClickLeft()} size='2em'/>
//                         <span className='tooltip-text'>Previous</span>
//                     </div>
//
//                     <div className='tooltip'>
//                         <Link to='/home'>
//                             <IoIosPower size='2em' />
//                             <span className='tooltip-text'>Home</span>
//                         </Link>
//                     </div>
//
//                     {this.props.autoplay ?
//                         <div className='tooltip'>
//                             <IoIosPause onClick={() => this.props.handleClickAutoplay()} size='2em' />
//                             <span className='tooltip-text'>Pause Autoplay</span>
//                         </div>:
//                         <div className='tooltip'>
//                             <IoIosPlay onClick={() => this.props.handleClickAutoplay()} size='2em' />
//                             <span className='tooltip-text'>Start Autoplay</span>
//                         </div>
//                     }
//
//                     <div className='tooltip'>
//                         <IoIosArrowDropright onClick={() => this.props.handleClickRight()} size='2em' />
//                         <span className='tooltip-text'>Next</span>
//                     </div>
//                 </div>
//                 <div className='menu'>
//                     <ul>
//                         {list}
//                     </ul>
//                     <div
//                         className={this.state.thumbnailStyle}
//                         style={{
//                            top: this.state.thumbnailTop,
//                            left: this.state.thumbnailLeft,
//                            backgroundImage: this.state.thumbnailLink === null ? null : 'url(' + this.state.thumbnailLink + ')'
//                         }}>
//                         { this.state.thumbnailText }
//                         </div>
//                     <div className='text'>
//                         <h1> {this.props.title} </h1>
//                         <p> {this.props.description} </p>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }
// class Gallery extends React.Component {
//     // It recevices props album and page from index
//     constructor(props) {
//         super(props);
//         // album starts from 0, page 0 is title.
//         this.state = {
//             album: 0,
//             page: 1,
//             autoplay: false,
//             isHudDimmed: false
//         };
//         this.dataArray = [...galleryData];
//         this.toggleHudTimer = null;
//         this.handleClickMenu = this.handleClickMenu.bind(this);
//         this.handleClickLeft = this.handleClickLeft.bind(this);
//         this.handleClickRight = this.handleClickRight.bind(this);
//         this.handleClickAutoplay = this.handleClickAutoplay.bind(this);
//         this.toggleHud = this.toggleHud.bind(this);
//     }
//     handleClickMenu(album, page){
//         this.setState({
//             album: album,
//             page: page
//         })
//     }
//     handleClickLeft() {
//         if (this.state.album === 0 && this.state.page === 1) {
//             this.setState({
//                 album: this.dataArray.length - 1,
//                 page: this.dataArray[this.dataArray.length - 1].length - 1
//             })
//         } else if (this.state.page === 1) {
//             this.setState({
//                 album: this.state.album - 1,
//                 page: this.dataArray[this.state.album - 1].length - 1
//             })
//         } else {
//             this.setState({
//                 page: this.state.page - 1
//             })
//         }
//     }
//     handleClickRight() {
//         if (this.state.album === this.dataArray.length - 1 && this.state.page === this.dataArray[this.dataArray.length - 1].length - 1) {
//             this.setState({
//                 album: 0,
//                 page: 1
//             })
//         } else if (this.state.page === this.dataArray[this.state.album].length - 1) {
//             this.setState({
//                 album: this.state.album + 1,
//                 page: 1
//             })
//         } else {
//             this.setState({
//                 page: this.state.page + 1
//             })
//         }
//     }
//     handleClickAutoplay() {
//         if(!this.state.autoplay) {
//             // enable autoplay
//             this.handleClickRight();
//             this.interval = setInterval(() => this.handleClickRight(), 5000);
//             this.setState({autoplay: true});
//             //
//             clearTimeout(this.toggleHudTimer);
//             this.setState({isHudDimmed: false});
//         } else {
//             // disable autoplay
//             this.setState({autoplay: false});
//             clearInterval(this.interval);
//             this.interval = null;
//             //
//             this.setToggleHudTimer();
//         }
//     }
//
//     setToggleHudTimer() {
//         this.toggleHudTimer = setTimeout(() => {
//             this.setState({isHudDimmed: true})}, 5000
//         )
//     }
//     toggleHud() {
//         // do not dim hud when autoplaying
//         if (this.state.autoplay) return;
//         //
//         clearTimeout(this.toggleHudTimer);
//         this.setState({isHudDimmed: false});
//         this.setToggleHudTimer();
//     }
//
//     componentDidUpdate(prevProps, prevState, snapshot) {
//         if (prevState.album !== this.state.album) {
//             setTitle(this.dataArray[this.state.album][0], false);
//         }
//     }
//
//     componentDidMount() {
//         this.setState(
//             {
//                 album: this.props.album
//             }
//         );
//         this.setToggleHudTimer();
//     }
//
//     componentWillUnmount() {
//         clearInterval(this.interval);
//         clearTimeout(this.toggleHudTimer);
//     }
//
//     render() {
//         const dataArray = [...this.dataArray];
//         const title = dataArray[this.state.album][0];
//         const description = dataArray[this.state.album][this.state.page].description;
//         const link = dataArray[this.state.album][this.state.page].link;
//         return (
//             <div>
//                 <Show link={link}/>
//                 <Hud
//                     album={this.state.album}
//                     page={this.state.page}
//                     title={title}
//                     description={description}
//                     handleClickMenu={this.handleClickMenu}
//                     handleClickLeft={this.handleClickLeft}
//                     handleClickRight={this.handleClickRight}
//                     handleClickAutoplay={this.handleClickAutoplay}
//                     autoplay={this.state.autoplay}
//                     toggleHud = {this.toggleHud}
//                     isHudDimmed = {this.state.isHudDimmed}
//                 />
//             </div>
//             )
//     }
// }
//
// export { Gallery as default }