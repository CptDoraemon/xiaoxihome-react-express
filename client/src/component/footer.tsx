import * as React from 'react';
import './footer.css';
import { Link } from "react-router-dom";
import {allDataLinks, AllDataLinks, DataLinks, DataLink} from '../data';

enum DropListStyle {
    ACTIVE = 'drop-list-active',
    INACTIVE = 'drop-list-inactive'
}

interface FooterProps {

}

interface FooterState {
    dropListClassName: DropListStyle;
}

class Footer extends React.Component<FooterProps, FooterState> {

    state: FooterState;
    allDataLinks: AllDataLinks = allDataLinks;

    constructor(props: FooterProps){
        super(props);
        this.state={
            dropListClassName: DropListStyle.INACTIVE
        };
        this.toggleDropList = this.toggleDropList.bind(this);
        this.setDropListInactive = this.setDropListInactive.bind(this);
    }
    toggleDropList() {
        this.setState({
            dropListClassName: this.state.dropListClassName === DropListStyle.ACTIVE ? DropListStyle.INACTIVE : DropListStyle.ACTIVE
        })
    }
    setDropListInactive() {
        this.setState({
            dropListClassName: DropListStyle.INACTIVE
        })
    }

    render() {
        return (
            <div className='footer'>
                <div className='nav-bar'>
                    <ul>
                        <Link to='/home'><li>home</li></Link>
                        <li onClick={this.toggleDropList}>work</li>
                        <Link to='/about'><li>about</li></Link>
                        <Link to='/contact'><li>contact</li></Link>
                    </ul>
                </div>
                <div className='footer-flexbox' onMouseLeave={this.setDropListInactive} >
                    <FooterDropList allDataLinks={this.allDataLinks} dropListClassName={this.state.dropListClassName}/>
                </div>
                <div className='copyright'>
                    <p>&copy; Xiaoxi 2018-2019</p>
                </div>
            </div>
        )
    }
}

interface FooterDropListProps {
    allDataLinks: AllDataLinks,
    dropListClassName: DropListStyle
}

function FooterDropList(props: FooterDropListProps) {
    const list = [];
    for (let key in allDataLinks) {
        if (allDataLinks.hasOwnProperty(key)) {
            const dataLinks: DataLinks = allDataLinks[key];
            const listOfOneCategory = (
                    <div className={ props.dropListClassName } key={key}>
                        <h5> { dataLinks.category } </h5>
                        { dataLinks.links.map((dataLink: DataLink) => {
                            return (
                                <Link to={dataLink.link} key={dataLink.link}>
                                    <p>{dataLink.name}</p>
                                </Link>
                            )
                        })}
                    </div>
                );
            list.push(listOfOneCategory);
        }
    }
    return (
        <> { list } </>
    )
}

export default Footer;