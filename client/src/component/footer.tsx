import * as React from 'react';
import './footer.css';
import { Link } from "react-router-dom";
import mappedDataForProps, {RouterInfo} from "../data";

enum DropListStyle {
    ACTIVE = 'footer-drop-list footer-drop-list-active',
    INACTIVE = 'footer-drop-list footer-drop-list-inactive'
}

interface LinkInfo extends RouterInfo {

}

interface MultiLinkInfo {
    link: Array<SectionInfo>;
    title: string;
}

interface SectionInfo {
    sectionTitle: string;
    links: Array<LinkInfo>;
}

interface FooterProps {

}

interface FooterState {
    isDropListActive: Boolean;
}

class Footer extends React.Component<FooterProps, FooterState> {

    allLinks: Array<MultiLinkInfo | LinkInfo> = mappedDataForProps.footer;
    thisYear = new Date().getFullYear();

    constructor(props: FooterProps){
        super(props);
        this.state={
            isDropListActive: false
        };
        this.toggleDropList = this.toggleDropList.bind(this);
        this.setDropListInactive = this.setDropListInactive.bind(this);
        this.stopClickEventPropagation = this.stopClickEventPropagation.bind(this);
    }
    toggleDropList(e: any) {
        e.stopPropagation();
        this.setState(prevState => ({
            isDropListActive: !prevState.isDropListActive
        }))
    }
    setDropListInactive() {
        this.setState({
            isDropListActive: false
        })
    }

    stopClickEventPropagation(e: any) {
        e.stopPropagation();
    }

    componentDidMount(): void {
        window.addEventListener('click', this.setDropListInactive);
    }

    componentWillUnmount(): void {
        window.removeEventListener('click', this.setDropListInactive);
    }

    render() {
        return (
            <footer className='footer'>
                <nav className='footer-nav-bar'>
                    <ul>
                        {
                            this.allLinks.map((linkInfo: any, index: number) => {
                                if (typeof linkInfo.link === 'string') {
                                    return (
                                            linkInfo.isExternal ?
                                                <li key={index}><a href={linkInfo.link}> {linkInfo.title}</a></li> :
                                                <li key={index}><Link to={linkInfo.link}> {linkInfo.title} </Link></li>
                                        )
                                } else {
                                    return (
                                        <React.Fragment key={index}>
                                            <li onClick={this.toggleDropList}>
                                                <button>{linkInfo.title}</button>
                                            </li>
                                            <div className='footer-flexbox' onMouseLeave={this.setDropListInactive} >
                                                <FooterDropList allLinks={linkInfo.link} isActive={this.state.isDropListActive} stopClickEventPropagation={this.stopClickEventPropagation}/>
                                            </div>
                                        </React.Fragment>
                                    )
                                }
                            })
                        }
                    </ul>
                </nav>
                <div className='copyright'>
                    <p>&copy;{` XiaoxiHome 2018-${this.thisYear}`}</p>
                </div>
            </footer>
        )
    }
}

interface FooterDropListProps {
    allLinks: Array<SectionInfo>;
    isActive: Boolean;
    stopClickEventPropagation: (e: any) => void;
}

function FooterDropList(props: FooterDropListProps) {
    const dropListClassName = props.isActive ? DropListStyle.ACTIVE : DropListStyle.INACTIVE;
    const elements = props.allLinks.map((section: SectionInfo, i: number) => {
        return (
            <div className={ dropListClassName } key={i} onClick={props.stopClickEventPropagation}>
                <h5> { section.sectionTitle } </h5>
                { section.links.map((linkInfo: LinkInfo, j: number) => {
                    return (
                        <Link to={linkInfo.link} key={`${i}-${j}`} tabIndex={props.isActive ? 0 : -1}>
                            <span>{linkInfo.title}</span>
                        </Link>
                    )
                })}
            </div>
        )
    });

    return (
        <>{elements}</>
    )
}

export default Footer;
