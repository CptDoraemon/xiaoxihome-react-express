import React from 'react';
import { Link } from 'react-router-dom';
import './gallery.css'
import mappedDataForProps from "../../data";

import { IoIosArrowDropleft,  IoIosArrowDropright, IoIosPower, IoMdRadioButtonOff, IoMdRadioButtonOn, IoMdAlbums, IoIosPause, IoIosPlay} from "react-icons/io";
import { SpinLoader } from "../../animations/spin-loader";
import {setTitle} from "../../tools/set-title";

//TODO: event types and eventHandler types

interface ShowProps {
    link: string
}

interface ShowStates {
    isLoading: boolean
}

class Show extends React.Component<ShowProps, ShowStates> {
    imageReference: any;

    constructor(props: ShowProps) {
        super(props);
        this.state = {
            isLoading: false
        };
    }
    loadImage(link: string) {
        return new Promise((resolve, reject) => {
            this.imageReference = new Image();
            this.imageReference.src = link;
            this.imageReference.onload = () => resolve();
            this.imageReference.onerror = (err: Error) => reject(err);
        });
    }
    componentWillUpdate(prevProps: ShowProps) {
        if (this.props.link !== prevProps.link) {
            this.setState({isLoading: true});
            this.loadImage(this.props.link)
                .then(() => this.setState({isLoading: false}))
                .catch(err => console.log(err))
        }
    }
    render() {
        const backgroundImageStyle = this.state.isLoading ? {} : {backgroundImage: 'url(' + this.props.link + ')'};

        return (
            <div className='showcase'>
                <div
                    className='show-blur-bg'
                    style={backgroundImageStyle}>
                </div>
                <div
                    className='show'
                    style={backgroundImageStyle}>
                </div>
                { this.state.isLoading ? <SpinLoader size={100} /> : null}
            </div>
        )
    }
}

enum HudListItemType {
    COVER = 'COVER',
    PHOTO = 'PHOTO'
}

interface HudListItemPhoto {
    type: HudListItemType.PHOTO,
    link: string,
    album: number,
    page: number
}

interface HudListItemCover {
    type: HudListItemType.COVER,
    text: string,
}

type HudListData = Array<HudListItemPhoto | HudListItemCover>;

interface HudProps {
    hudListData: HudListData;
    album: number;
    page: number;
    title: string;
    description: string;
    setAlbumAndPage: (album: number, page: number) => void;
    browsePrevious: any;
    browseNext: any;
    toggleAutoplay: any;
    isAutoplay: boolean;
    toggleHud: any;
    isHudDimmed: boolean;
}

interface HudStates {
    thumbnailStyle: ThumbnailStyle,
    thumbnailLeft: number,
    thumbnailText: string,
    thumbnailLink: string,
}

enum ThumbnailStyle {
    INACTIVE = 'thumbnail-inactive',
    TEXT = 'thumbnail-active-text',
    IMAGE = 'thumbnail-active-image'
}

class Hud extends React.Component<HudProps, HudStates> {

    lastToggleHudAt: number = Date.now();
    xDown: number = 0;
    yDown: number = 0;
    thumbnailTop: number = 50;

    constructor(props: HudProps) {
        super(props);
        this.state = {
            thumbnailStyle: ThumbnailStyle.INACTIVE,
            thumbnailLeft: 0,
            thumbnailText: '',
            thumbnailLink: '',
        };
        this.toggleHud = this.toggleHud.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.turnOffThumbnail = this.turnOffThumbnail.bind(this);
        this.turnOnTextThumbnail = this.turnOnTextThumbnail.bind(this);
        this.turnOnPhotoThumbnail = this.turnOnPhotoThumbnail.bind(this);
    }
    turnOnTextThumbnail(description: string, e: any)  {
        this.setState({
            thumbnailStyle: ThumbnailStyle.TEXT,
            thumbnailLink: '',
            thumbnailText: description,
            thumbnailLeft: e.clientX
        });
    };

    turnOnPhotoThumbnail(link: string, e: any)  {
        this.setState({
            thumbnailStyle: ThumbnailStyle.IMAGE,
            thumbnailLink: link,
            thumbnailText: '',
            thumbnailLeft: e.clientX - 100
        });
    }

    turnOffThumbnail(e: any) {
        this.setState({thumbnailStyle: ThumbnailStyle.INACTIVE});
    };

    toggleHud() {
        // debounce
        const now = Date.now();
        if (now - this.lastToggleHudAt < 500) {
            return;
        } else {
            this.lastToggleHudAt = now;
            this.props.toggleHud();
        }
    }

    handleKeyDown(e: any) {
        this.toggleHud();
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            this.props.browsePrevious();
        }
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            this.props.browseNext();
        }
    }

    handleTouchStart(e: any) {
        this.xDown = e.touches[0].clientX;
        this.yDown = e.touches[0].clientY;
        this.toggleHud();
    };

    handleTouchMove(e: any) {
        if (this.xDown < 0 || this.yDown < 0) {
            return;
        }
        let xUp = e.touches[0].clientX;
        let yUp = e.touches[0].clientY;
        let xDiff = this.xDown - xUp;
        let yDiff = this.yDown - yUp;

        if ( Math.abs(xDiff) > Math.abs(yDiff)) {
            e.preventDefault();
            if (xDiff > 0) {
                this.props.browsePrevious();
            } else {
                this.props.browseNext();
            }
        } else {
            if (yDiff > 0) {
                return;
            } else {
                return;
            }
        }

        this.xDown = -1;
        this.yDown = -1;
    };

    componentDidMount() {
        window.addEventListener('mousemove', this.toggleHud);
        window.addEventListener('keydown', this.handleKeyDown);
        // mobile
        window.addEventListener('touchstart', this.handleTouchStart);
        window.addEventListener('touchmove', this.handleTouchMove);
    }
    componentWillUnmount() {
        window.removeEventListener('mousemove', this.toggleHud);
        window.removeEventListener('keydown', this.handleKeyDown);
        // mobile
        window.removeEventListener('touchstart', this.handleTouchStart);
        window.removeEventListener('touchmove', this.handleTouchMove);
    }
    render() {
        const list = this.props.hudListData.map((item, index) => {
            if (item.type === HudListItemType.COVER) {
                const attr = {
                    onMouseEnter: (e: any) => this.turnOnTextThumbnail(item.text, e),
                    onMouseLeave: this.turnOffThumbnail,
                };
                return <li {...attr} key={index}><IoMdAlbums/></li>
            } else if (item.type === HudListItemType.PHOTO) {

                const attr = {
                    onMouseEnter: (e: any) => this.turnOnPhotoThumbnail(item.link, e),
                    onMouseLeave: this.turnOffThumbnail,
                    onClick: () => this.props.setAlbumAndPage(item.album, item.page)
                };

                if (item.album === this.props.album && item.page === this.props.page) {
                    // list item for current page
                    return <li {...attr} key={index}><IoMdRadioButtonOn/></li>;
                } else {
                    return <li {...attr} key={index}><IoMdRadioButtonOff/></li>;
                }
            }
        });

        return (
            <div className={this.props.isHudDimmed ? 'hud-off' : 'hud-on'}>
                <div className='nav-buttons'>

                    <div className='tooltip'>
                        <IoIosArrowDropleft onClick={this.props.browsePrevious} size='2em'/>
                        <span className='tooltip-text'>Previous</span>
                    </div>

                    <div className='tooltip'>
                        <Link to='/home'>
                            <IoIosPower size='2em' />
                            <span className='tooltip-text'>Home</span>
                        </Link>
                    </div>

                    {this.props.isAutoplay ?
                        <div className='tooltip'>
                            <IoIosPause onClick={this.props.toggleAutoplay} size='2em' />
                            <span className='tooltip-text'>Pause Autoplay</span>
                        </div>:
                        <div className='tooltip'>
                            <IoIosPlay onClick={this.props.toggleAutoplay} size='2em' />
                            <span className='tooltip-text'>Start Autoplay</span>
                        </div>
                    }

                    <div className='tooltip'>
                        <IoIosArrowDropright onClick={this.props.browseNext} size='2em' />
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
                           top: `${this.thumbnailTop}px`,
                           left: `${this.state.thumbnailLeft}px`,
                           backgroundImage: this.state.thumbnailLink === '' ? 'none' : 'url(' + this.state.thumbnailLink + ')'
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

interface Album {
    albumName: string,
    photos: Array<Photo>
}

interface Photo {
    description: string,
    link: string
}

type GalleryData = Array<Album>;

interface GalleryProps {
    albumName: string;
    id: number;
}

interface GalleryStates {
    album: number;
    page: number;
    isAutoplay: boolean;
    isHudDimmed: boolean;
}

class Gallery extends React.Component<GalleryProps, GalleryStates> {

    toggleHudTimer: any;
    interval: any;
    galleryData: GalleryData = mappedDataForProps.gallery;
    hudListData: HudListData = [];

    constructor(props: GalleryProps) {
        super(props);
        // album starts from 0, page 0 is title.
        this.state = {
            album: 0,
            page: 0,
            isAutoplay: false,
            isHudDimmed: false
        };
        this.toggleHudTimer = null;
        this.setAlbumAndPage = this.setAlbumAndPage.bind(this);
        this.browsePrevious = this.browsePrevious.bind(this);
        this.browseNext = this.browseNext.bind(this);
        this.toggleAutoplay = this.toggleAutoplay.bind(this);
        this.toggleHud = this.toggleHud.bind(this);
    }


    setAlbumAndPage(album: number, page: number) {
        this.setState({
            album: album,
            page: page
        })
    }

    browsePrevious() {
        if (this.state.album === 0 && this.state.page === 0) {
            this.setState({
                album: this.galleryData.length - 1,
                page: this.galleryData[this.galleryData.length - 1].photos.length - 1
            })
        } else if (this.state.page === 0) {
            this.setState({
                album: this.state.album - 1,
                page: this.galleryData[this.state.album - 1].photos.length - 1
            })
        } else {
            this.setState({
                page: this.state.page - 1
            })
        }
    }

    browseNext() {
        if (this.state.album === this.galleryData.length - 1 && this.state.page === this.galleryData[this.galleryData.length - 1].photos.length - 1) {
            this.setState({
                album: 0,
                page: 0
            })
        } else if (this.state.page === this.galleryData[this.state.album].photos.length - 1) {
            this.setState({
                album: this.state.album + 1,
                page: 0
            })
        } else {
            this.setState({
                page: this.state.page + 1
            })
        }
    }
    toggleAutoplay() {
        if(!this.state.isAutoplay) {
            // enable autoplay
            this.browseNext();
            this.interval = setInterval(() => this.browseNext(), 5000);
            this.setState({isAutoplay: true});
            //
            clearTimeout(this.toggleHudTimer);
            this.setState({isHudDimmed: false});
        } else {
            // disable autoplay
            this.setState({isAutoplay: false});
            clearInterval(this.interval);
            this.interval = null;
            //
            this.setToggleHudTimer();
        }
    }

    setToggleHudTimer() {
        this.toggleHudTimer = setTimeout(() => {
            this.setState({isHudDimmed: true})}, 5000
        )
    }

    toggleHud() {
        // do not dim hud when autoplaying
        if (this.state.isAutoplay) return;
        //
        clearTimeout(this.toggleHudTimer);
        this.setState({isHudDimmed: false});
        this.setToggleHudTimer();
    }

    prepareHudListData() {
        this.galleryData.map((album, albumIndex) => {
            this.hudListData.push({
                type: HudListItemType.COVER,
                text: album.albumName
            });
            album.photos.map((photo, photoIndex) => {
                this.hudListData.push({
                    type: HudListItemType.PHOTO,
                    link: photo.link,
                    album: albumIndex,
                    page: photoIndex
                });
            })
        })
    }

    initialize() {
        const albumNames: Array<string> = this.galleryData.map(album => album.albumName);
        const albumIndex: number = albumNames.indexOf(this.props.albumName);
        if (albumIndex === -1) {
            // no matched album
            this.setAlbumAndPage(0, 0);
        } else if (this.props.id < 0 || this.props.id > this.galleryData[albumIndex].photos.length - 1) {
            // album matched but no matched photo
            this.setAlbumAndPage(albumIndex, 0);
        } else {
            // matched
            this.setAlbumAndPage(albumIndex, this.props.id);
        }
    }

    componentDidUpdate(prevProps: GalleryProps, prevState: GalleryStates) {
        if (prevState.album !== this.state.album) {
            setTitle(this.galleryData[this.state.album].albumName, false);
        }
    }

    componentDidMount() {
        this.initialize();
        this.prepareHudListData();
        this.setToggleHudTimer();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        clearTimeout(this.toggleHudTimer);
        this.toggleHudTimer = null;
    }

    render() {
        const title = this.galleryData[this.state.album].albumName;
        const description = this.galleryData[this.state.album].photos[this.state.page].description;
        const link = this.galleryData[this.state.album].photos[this.state.page].link;

        return (
            <div>
                <Show link={link}/>
                <Hud
                    hudListData={this.hudListData}
                    album={this.state.album}
                    page={this.state.page}
                    title={title}
                    description={description}
                    setAlbumAndPage={this.setAlbumAndPage}
                    browsePrevious={this.browsePrevious}
                    browseNext={this.browseNext}
                    toggleAutoplay={this.toggleAutoplay}
                    isAutoplay={this.state.isAutoplay}
                    toggleHud = {this.toggleHud}
                    isHudDimmed = {this.state.isHudDimmed}
                />
            </div>
            )
    }
}

export { Gallery as default }