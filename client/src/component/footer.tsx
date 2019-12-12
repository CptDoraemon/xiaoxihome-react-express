import * as React from 'react';
import './footer.css';
import { Link } from "react-router-dom";
import mappedDataForProps from "../data";

enum DropListStyle {
    ACTIVE = 'drop-list drop-list-active',
    INACTIVE = 'drop-list drop-list-inactive'
}

interface LinkInfo {
    link: string;
    title: string;
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
    dropListClassName: DropListStyle;
}

class Footer extends React.Component<FooterProps, FooterState> {

    allLinks: Array<MultiLinkInfo | LinkInfo> = mappedDataForProps.footer;

    constructor(props: FooterProps){
        super(props);
        this.state={
            dropListClassName: DropListStyle.INACTIVE
        };
        this.toggleDropList = this.toggleDropList.bind(this);
        this.setDropListInactive = this.setDropListInactive.bind(this);
        this.stopClickEventPropagation = this.stopClickEventPropagation.bind(this);
    }
    toggleDropList(e: any) {
        this.setState({
            dropListClassName: this.state.dropListClassName === DropListStyle.ACTIVE ? DropListStyle.INACTIVE : DropListStyle.ACTIVE
        })
    }
    setDropListInactive() {
        this.setState({
            dropListClassName: DropListStyle.INACTIVE
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
            <div className='footer'>
                <div className='nav-bar' onClick={this.stopClickEventPropagation}>
                    <ul>
                        {
                            this.allLinks.map((linkInfo: any, index: number) => {
                                if (typeof linkInfo.link === 'string') {
                                    return <Link key={index} to={linkInfo.link}><li> {linkInfo.title} </li></Link>
                                } else {
                                    return (
                                        <React.Fragment key={index}>
                                            <li onClick={this.toggleDropList}> {linkInfo.title} </li>
                                            <div className='footer-flexbox' onMouseLeave={this.setDropListInactive}>
                                                <FooterDropList allLinks={linkInfo.link} dropListClassName={this.state.dropListClassName}/>
                                            </div>
                                        </React.Fragment>
                                    )
                                }
                            })
                        }
                    </ul>
                </div>
                <div className='copyright'>
                    <p>&copy; Xiaoxi 2018-2019</p>
                </div>
            </div>
        )
    }
}

interface FooterDropListProps {
    allLinks: Array<SectionInfo>;
    dropListClassName: DropListStyle;
}

function FooterDropList(props: FooterDropListProps) {
    const dropListClassName = props.dropListClassName;
    const elements = props.allLinks.map((section: SectionInfo, i: number) => {
        return (
            <div className={ dropListClassName } key={i}>
                <h5> { section.sectionTitle } </h5>
                { section.links.map((linkInfo: LinkInfo, j: number) => {
                    return (
                        <Link to={linkInfo.link} key={`${i}-${j}`}>
                            <p>{linkInfo.title}</p>
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