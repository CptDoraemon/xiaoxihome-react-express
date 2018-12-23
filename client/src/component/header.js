import React from 'react';
import './header.css';
import { Link } from "react-router-dom";
import { IoIosList, IoIosClose } from "react-icons/io";

class HeaderCover extends React.Component {
    constructor(props){
        super(props)
        this.state={
            dropDownClassName: 'work-drop-down-cover-inactive',
            headerCoverClassName: 'header-cover',
        }
        this.handleMobileMenuClick = this.handleMobileMenuClick.bind(this);
        this.workDropDownListToggle = this.workDropDownListToggle.bind(this);
        this.workDropDownListInactive = this.workDropDownListInactive.bind(this);
    }
    workDropDownListToggle() {
        this.setState({
            dropDownClassName: this.state.dropDownClassName === 'work-drop-down-cover-active' ? 'work-drop-down-cover-inactive' : 'work-drop-down-cover-active'
        })
    }
    workDropDownListInactive() {
        this.setState({
            dropDownClassName: 'work-drop-down-cover-inactive'
        })
    }
    handleMobileMenuClick() {
        this.state.headerCoverClassName === 'header-cover' ?
            this.setState({headerCoverClassName: 'header-cover-mobile'}) :
            this.setState({headerCoverClassName: 'header-cover'})
    }
    render() {
        //It receives props: listAndLink
        return (
            <div className={this.state.headerCoverClassName}>
                <div className='mobile-menu-icon' onClick={this.handleMobileMenuClick}>
                    { this.state.headerCoverClassName === 'header-cover' ? <IoIosList size='2em'/> : <IoIosClose size='2em'/> }
                </div>
                <ul>
                    <Link to='/home'>
                        <li>home</li>
                    </Link>
                    <li onClick={this.workDropDownListToggle} >
                        work
                    </li>
                    <div className={this.state.dropDownClassName} onMouseLeave={this.workDropDownListInactive}>
                        <h5>Academic Projects</h5>
                        { this.props.listAndLink.academicProjectArray.map((i, index) => {
                            return (
                                <Link to={this.props.listAndLink.academicProjectLinkArray[index]}>
                                    <p>{i}</p>
                                </Link>
                            )
                        })}
                        <h5>Web App Projects</h5>
                        { this.props.listAndLink.webAppProjectArray.map((i, index) => {
                            return (
                                <Link to={this.props.listAndLink.webAppProjectLinkArray[index]}>
                                    <p>{i}</p>
                                </Link>
                            )
                        })}
                        <h5>Gallery</h5>
                        { this.props.listAndLink.galleryArray.map((i, index) => {
                            return (
                                <Link to={this.props.listAndLink.galleryLinkArray[index]}>
                                    <p>{i}</p>
                                </Link>
                            )
                        })}
                    </div>
                    <Link to='/about'>
                        <li>about</li>
                    </Link>
                    <Link to='/contact'>
                        <li>contact</li>
                    </Link>
                </ul>
            </div>
        )
    }
}

class HeaderSticky extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headerClassName: 'header-fixed',
            placeholderClassName: 'header-fixed-placeholder',
            dropDownClassName: 'work-drop-down-inactive'
        }
        this.handleScroll = this.handleScroll.bind(this);
        this.workDropDownListToggle = this.workDropDownListToggle.bind(this);
        this.workDropDownListInactive = this.workDropDownListInactive.bind(this);

    }
    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    };
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    };
    handleScroll() {
        const scrolled = window.pageYOffset;
        if (scrolled >= 50 && this.state.placeholderClassName === 'header-fixed-placeholder') {
            this.setState({
                headerClassName: 'header-fixed fixed',
                placeholderClassName: 'header-fixed-placeholder-scrolled'
            })
        }
        if (scrolled < 50 && this.state.placeholderClassName !== 'header-fixed-placeholder') {
            this.setState({
                headerClassName: 'header-fixed',
                placeholderClassName: 'header-fixed-placeholder'
            })
        }

    }
    workDropDownListToggle() {
        this.setState({
            dropDownClassName: this.state.dropDownClassName === 'work-drop-down-active' ? 'work-drop-down-inactive' : 'work-drop-down-active'
        })
    }
    workDropDownListInactive() {
        this.setState({
            dropDownClassName: 'work-drop-down-inactive'
        })
    }
    render() {
        //It receives props: listAndLink
        return (
            <div>
                <div className={this.state.headerClassName}>
                    <h1> {this.props.headerTitle} </h1>
                    <ul>
                        <Link to='/home'>
                            <li>home</li>
                        </Link>
                        <li onClick={this.workDropDownListToggle}  >work</li>
                        <div className={this.state.dropDownClassName} onMouseLeave={this.workDropDownListInactive}>
                            <h5>Academic Projects</h5>
                            { this.props.listAndLink.academicProjectArray.map((i, index) => {
                                return (
                                    <Link to={this.props.listAndLink.academicProjectLinkArray[index]}>
                                        <p>{i}</p>
                                    </Link>
                                )
                            })}
                            <h5>Web App Projects</h5>
                            { this.props.listAndLink.webAppProjectArray.map((i, index) => {
                                return (
                                    <Link to={this.props.listAndLink.webAppProjectLinkArray[index]}>
                                        <p>{i}</p>
                                    </Link>
                                )
                            })}
                            <h5>Gallery</h5>
                            { this.props.listAndLink.galleryArray.map((i, index) => {
                                return (
                                    <Link to={this.props.listAndLink.galleryLinkArray[index]}>
                                        <p>{i}</p>
                                    </Link>
                                )
                            })}
                        </div>
                        <Link to='/about'>
                            <li>about</li>
                        </Link>
                        <Link to='/contact'>
                            <li>contact</li>
                        </Link>
                    </ul>
                </div>
                <div className={this.state.placeholderClassName}> </div>
            </div>
        )
    }
}

export { HeaderCover, HeaderSticky };