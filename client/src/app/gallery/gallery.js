import React from 'react';
import { Link } from 'react-router-dom';
import './gallery.css'
import { galleryData } from './galleryData';

import { IoIosArrowDropleft,  IoIosArrowDropright, IoIosPower, IoMdRadioButtonOff, IoMdRadioButtonOn, IoMdAlbums, IoIosPause, IoIosPlay} from "react-icons/io";


function Show(props) {
    return (
        <div className='showcase'>
            <div
                className='show-blur-bg'
                style={{backgroundImage: 'url(' + props.link + ')'}}>
            </div>
            <div
                className='show'
                style={{backgroundImage: 'url(' + props.link + ')'}}>
            </div>
        </div>
        )
}
class Hud extends React.Component {
    // It receives props album, pages, title, description
    //handleClickMenu, handleClickLeft, handleClickRight, handleAutoplay, autoplay
    constructor(props) {
        super(props);
        this.state = {
            thumbnailStyle: 'thumbnail-inactive',
            thumbnailTop: '50px',
            thumbnailLeft: null,
            thumbnailText: null,
            thumbnailLink: null,
            hudClassName: 'hud-on',
        };
        this.dataArray = [...galleryData];
        this.xDown = null;
        this.yDown = null;
        this.toggleHud = this.toggleHud.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
    }
    handleMouseEnter = (album, page, e) => {
        page === 0 ?
            this.setState({thumbnailStyle: 'thumbnail-active-text'}) :
            this.setState({thumbnailStyle: 'thumbnail-active-image'});
        page === 0 ?
            // TEXT
            this.setState({
                thumbnailText: this.dataArray[album][page],
                thumbnailLink: null,
                thumbnailLeft: e.clientX - 20 + 'px'
            }) :
            // IMAGE
            this.setState({
                thumbnailLink: this.dataArray[album][page].link,
                thumbnailText: null,
                thumbnailLeft: e.clientX - 100 + 'px'
            });
    };
    handleMouseLeave() {
        this.setState({thumbnailStyle: 'thumbnail-inactive'});
    };
    toggleHud() {
        clearTimeout(this.timeout);
        this.setState({hudClassName: 'hud-on'});
        this.timeout = setTimeout(() => {
            this.setState({hudClassName: 'hud-off'})}, 5000
        )
    }
    handleKeyDown(e) {
        this.toggleHud();
        if (e.keyCode === 37 || e.keyCode === 38) {
            this.props.handleClickLeft();
        }
        if (e.keyCode === 39 || e.keyCode === 40) {
            this.props.handleClickRight();
        }
    }
    //mobile
    handleTouchStart(e) {
        this.xDown = e.touches[0].clientX;
        this.yDown = e.touches[0].clientY;
        this.toggleHud();
    };
    handleTouchMove(e) {
        if ( !this.xDown || !this.yDown ) {
            return;
        }
        let xUp = e.touches[0].clientX;
        let yUp = e.touches[0].clientY;
        let xDiff = this.xDown - xUp;
        let yDiff = this.yDown - yUp;

        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            e.preventDefault();
            if ( xDiff > 0 ) {
                /* left swipe */
                this.props.handleClickLeft();
            } else {
                /* right swipe */
                this.props.handleClickRight();
            }
        } else {
            if ( yDiff > 0 ) {
                /* up swipe */
                return;
            } else {
                /* down swipe */
                return;
            }
        }
        /* reset values */
        this.xDown = null;
        this.yDown = null;
    };



    componentDidMount() {
        this.timeout = setTimeout(() => {
            this.setState({hudClassName: 'hud-off'})}, 5000
        );
        window.addEventListener('mousemove', this.toggleHud);
        window.addEventListener('keydown', this.handleKeyDown);
        // mobile
        window.addEventListener('touchstart', this.handleTouchStart);
        window.addEventListener('touchmove', this.handleTouchMove);
    }
    componentWillUnmount() {
        clearTimeout(this.timeout);
        this.timeout = null;
        //
        window.removeEventListener('mousemove', this.toggleHud);
        window.removeEventListener('keydown', this.handleKeyDown);
        // mobile
        window.removeEventListener('touchstart', this.handleTouchStart);
        window.removeEventListener('touchmove', this.handleTouchMove);
    }
    render() {
        const list = this.dataArray.map((i, indexI) => i.map((j, indexJ) => {
            const attr = {
                album: {indexI},
                page: {indexJ},
                onMouseEnter: (e) => this.handleMouseEnter(indexI, indexJ, e),
                onMouseLeave: () => this.handleMouseLeave(),
            };
            const key = `galleryLiKey${indexJ}`;
            return (
                indexI === this.props.album && indexJ === this.props.page ?
                    <li {...attr}
                        key={key}
                        onClick={() => this.props.handleClickMenu(indexI, indexJ)}><IoMdRadioButtonOn/></li> :
                indexJ === 0 ?
                   <li {...attr} key={key}><IoMdAlbums/></li> :
                   <li
                       {...attr}
                       key={key}
                       onClick={() => this.props.handleClickMenu(indexI, indexJ)}><IoMdRadioButtonOff/></li>
            )
        }));
        return (
            <div className={this.state.hudClassName}>
                <div className='nav-buttons'>

                    <div className='tooltip'>
                        <IoIosArrowDropleft onClick={() => this.props.handleClickLeft()} size='2em'/>
                        <span className='tooltip-text'>Previous</span>
                    </div>

                    <div className='tooltip'>
                        <Link to='/home'>
                            <IoIosPower size='2em' />
                            <span className='tooltip-text'>Home</span>
                        </Link>
                    </div>

                    {this.props.autoplay ?
                        <div className='tooltip'>
                            <IoIosPause onClick={() => this.props.handleClickAutoplay()} size='2em' />
                            <span className='tooltip-text'>Pause Autoplay</span>
                        </div>:
                        <div className='tooltip'>
                            <IoIosPlay onClick={() => this.props.handleClickAutoplay()} size='2em' />
                            <span className='tooltip-text'>Start Autoplay</span>
                        </div>
                    }

                    <div className='tooltip'>
                        <IoIosArrowDropright onClick={() => this.props.handleClickRight()} size='2em' />
                        <span className='tooltip-text'>Next</span>
                    </div>
                </div>
                <div className='menu'>
                    <ul>
                        {list}
                    </ul>
                    <div
                        className={this.state.thumbnailStyle}
                        style={{
                           top: this.state.thumbnailTop,
                           left: this.state.thumbnailLeft,
                           backgroundImage: 'url(' + this.state.thumbnailLink + ')'
                        }}>
                        { this.state.thumbnailText }
                        </div>
                    <div className='text'>
                        <h1> {this.props.title} </h1>
                        <p> {this.props.description} </p>
                    </div>
                </div>
            </div>
        )
    }
}
class Gallery extends React.Component {
    // It recevices props album and page from index
    constructor(props) {
        super(props);
        // album starts from 0, page 0 is title.
        this.state = {
            album: 0,
            page: 1,
            autoplay: false
        };
        this.dataArray = [...galleryData];
        this.handleClickMenu = this.handleClickMenu.bind(this);
        this.handleClickLeft = this.handleClickLeft.bind(this);
        this.handleClickRight = this.handleClickRight.bind(this);
        this.handleClickAutoplay = this.handleClickAutoplay.bind(this);
    }
    handleClickMenu(album, page){
        this.setState({
            album: album,
            page: page
        })
    }
    handleClickLeft() {
        if (this.state.album === 0 && this.state.page === 1) {
            this.setState({
                album: this.dataArray.length - 1,
                page: this.dataArray[this.dataArray.length - 1].length - 1
            })
        } else if (this.state.page === 1) {
            this.setState({
                album: this.state.album - 1,
                page: this.dataArray[this.state.album - 1].length - 1
            })
        } else {
            this.setState({
                page: this.state.page - 1
            })
        }
    }
    handleClickRight() {
        if (this.state.album === this.dataArray.length - 1 && this.state.page === this.dataArray[this.dataArray.length - 1].length - 1) {
            this.setState({
                album: 0,
                page: 1
            })
        } else if (this.state.page === this.dataArray[this.state.album].length - 1) {
            this.setState({
                album: this.state.album + 1,
                page: 1
            })
        } else {
            this.setState({
                page: this.state.page + 1
            })
        }
    }
    handleClickAutoplay() {
        this.state.autoplay ? this.setState({autoplay: false}) : this.setState({autoplay: true});
        // setState is bulk!!
        if(!this.state.autoplay) {
            this.handleClickRight();
            this.interval = setInterval(() => this.handleClickRight(), 5000)
        } else {
            clearInterval(this.interval);
        }
    }
    componentDidMount() {
        this.setState(
            {
                album: this.props.album
            }
        )
    }

    render() {
        const dataArray = [...this.dataArray];
        const title = dataArray[this.state.album][0];
        const description = dataArray[this.state.album][this.state.page].description;
        const link = dataArray[this.state.album][this.state.page].link;
        return (
            <div>
                <Show link={link}/>
                <Hud
                    album={this.state.album}
                    page={this.state.page}
                    title={title}
                    description={description}
                    handleClickMenu={this.handleClickMenu}
                    handleClickLeft={this.handleClickLeft}
                    handleClickRight={this.handleClickRight}
                    handleClickAutoplay={this.handleClickAutoplay}
                    autoplay={this.state.autoplay}/>
            </div>
            )
    }
}

export { Gallery as default }