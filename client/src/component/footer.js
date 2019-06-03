import React from 'react';
import './footer.css';
import { Link } from "react-router-dom";

class Footer extends React.Component {
    // It receives props listAndArray
    constructor(props){
        super(props)
        this.state={
            dropListClassName: 'drop-list-inactive'
        };
        this.dropListToggle = this.dropListToggle.bind(this);
        this.dropListInactive = this.dropListInactive.bind(this);
    }
    dropListToggle() {
        this.setState({
            dropListClassName: this.state.dropListClassName === 'drop-list-active' ? 'drop-list-inactive' : 'drop-list-active'
        })
    }
    dropListInactive() {
        this.setState({
            dropListClassName: 'drop-list-inactive'
        })
    }

    render() {
        return (
            <div className='footer'>
                <div className='nav-bar'>
                    <ul>
                        <Link to='/home'><li>home</li></Link>
                        <li onClick={this.dropListToggle}>work</li>
                        <Link to='/about'><li>about</li></Link>
                        <Link to='/contact'><li>contact</li></Link>
                    </ul>
                </div>
                <div className='footer-flexbox' onMouseLeave={this.dropListInactive} >
                    <div className={ this.state.dropListClassName } >
                        <h5>Academic Projects</h5>
                        { this.props.listAndLink.academicProjectArray.map((i, index) => {
                            return (
                                <Link to={this.props.listAndLink.academicProjectLinkArray[index]} key={index}>
                                    <p>{i}</p>
                                </Link>
                            )
                        })}
                    </div>
                    <div className={ this.state.dropListClassName } >
                        <h5>Web App Projects</h5>
                        { this.props.listAndLink.webAppProjectArray.map((i, index) => {
                            return (
                                <Link to={this.props.listAndLink.webAppProjectLinkArray[index]} key={index}>
                                    <p>{i}</p>
                                </Link>
                            )
                        })}
                    </div>
                    <div className={ this.state.dropListClassName } >
                        <h5>Gallery</h5>
                        { this.props.listAndLink.galleryArray.map((i, index) => {
                            return (
                                <Link to={this.props.listAndLink.galleryLinkArray[index]} key={index}>
                                    <p>{i}</p>
                                </Link>
                            )
                        })}
                    </div>
                </div>
                <div className='copyright'>
                    <p>&copy; Xiaoxi 2018-2019</p>
                </div>
            </div>
        )
    }
}

export { Footer };