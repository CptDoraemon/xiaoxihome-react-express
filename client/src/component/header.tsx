import React from 'react';
import './header.css';
import { Link } from "react-router-dom";
import { IoIosList, IoIosClose } from "react-icons/io";
import mappedDataForProps, {RouterInfo} from "../data";
import StickyEffect from "../tools/sticky-effect";


interface DropdownListProps {
    allLinks: Array<SectionInfo>;
    dropdownTitle: string;
    dropdownClassName: string;
}

interface DropdownListState {
    isDropdownActive: boolean
}

class DropdownList extends  React.Component<DropdownListProps, DropdownListState> {
    constructor(props: DropdownListProps) {
        super(props);
        this.state = {
            isDropdownActive: false,
        };
        this.toggleDropdownList = this.toggleDropdownList.bind(this);
        this.closeDropdownList = this.closeDropdownList.bind(this);
    }

    toggleDropdownList(e: any) {
        e.stopPropagation();
        this.setState((state) => {
            return {isDropdownActive: !state.isDropdownActive}
        })
    }

    closeDropdownList() {
        this.setState({
            isDropdownActive: false
        })
    }

    componentDidMount(): void {
        window.addEventListener('click', this.closeDropdownList);
        // React (currently) uses a listener on the document for (almost) all events, so by the time your component receives the event it has already bubbled all the way up to the document and stopping it only stops it from synthetically bubbling up through the React hierarchy.
        // a workaround, use window.addEventListener() to replace document.addEventListener, event.stopPropagation() can stop event propagate to window.
    }

    componentWillUnmount(): void {
        window.removeEventListener('click', this.closeDropdownList);
    }

    render() {
        return (
            <>
                <li onClick={this.toggleDropdownList} >
                    <span> { this.props.dropdownTitle } </span>
                    <div style={this.state.isDropdownActive ? {} : {display: 'none'}} onMouseLeave={this.closeDropdownList} className={this.props.dropdownClassName}>
                        {
                            this.props.allLinks.map((section: SectionInfo, i: number) => {
                                return (
                                    <React.Fragment key={i}>
                                        <h5> {section.sectionTitle} </h5>
                                        { section.links.map((linkInfo: LinkInfo, j:number) => {
                                            return (
                                                <Link to={`${linkInfo.link}`} key={`${i}-${j}`}>
                                                    <p>{linkInfo.title}</p>
                                                </Link>
                                            )
                                        })}
                                    </React.Fragment>
                                )
                            })
                        }
                    </div>
                </li>
            </>
        )
    }
}

interface ListProps {
    headerLists: Array<LinkInfo | MultiLinkInfo>;
    dropdownClassName: string;
}

function List(props: ListProps) {
    return (
        <ul>
            {
                props.headerLists.map((linkInfo: any, index: number) => {
                    if (typeof linkInfo.link === "string") {
                        return (
                            linkInfo.isExternal ?
                                <a href={linkInfo.link} key={index}>
                                    <li> <span>{linkInfo.title}</span> </li>
                                </a> :
                                <Link to={linkInfo.link} key={index}>
                                    <li> <span>{linkInfo.title}</span> </li>
                                </Link>
                        )
                    } else {
                        return (
                            <DropdownList key={index} dropdownTitle={linkInfo.title} allLinks={linkInfo.link} dropdownClassName={props.dropdownClassName}/>
                        )
                    }
                })
            }
        </ul>
    )
}

enum MobileHeaderCoverClass {
    INACTIVE = 'header-cover',
    ACTIVE = 'header-cover-mobile'
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

interface HeaderCoverProps {

}

interface HeaderCoverStates {
    headerCoverClassName: MobileHeaderCoverClass
}

class HeaderCover extends React.Component<HeaderCoverProps, HeaderCoverStates> {

    headerLists: Array<LinkInfo | MultiLinkInfo> = mappedDataForProps.header;

    constructor(props: HeaderCoverProps){
        super(props);
        this.state={
            headerCoverClassName: MobileHeaderCoverClass.INACTIVE
        };
        this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    }
    toggleMobileMenu() {
        this.setState({
            headerCoverClassName: this.state.headerCoverClassName === MobileHeaderCoverClass.INACTIVE ?
                MobileHeaderCoverClass.ACTIVE :
                MobileHeaderCoverClass.INACTIVE
        });
    }
    render() {
        //It receives props: listAndLink
        return (
            <div className={this.state.headerCoverClassName}>
                <div className='mobile-menu-icon' onClick={this.toggleMobileMenu}>
                    { this.state.headerCoverClassName === 'header-cover' ? <IoIosList size='2em'/> : <IoIosClose size='2em'/> }
                </div>
                <List headerLists={this.headerLists} dropdownClassName={'cover-header-dropdown'}/>
            </div>
        )
    }
}

interface StickyHeader {
    headerTitle: string
}

function StickyHeader(props: StickyHeader) {
    return (
            <div>
                <div className={'sticky-header-wrapper'}>
                    <h1 className={'sticky-header-title'}> {props.headerTitle} </h1>
                    <StickyEffect stickyStartHeight={50}>
                        <List headerLists={mappedDataForProps.header} dropdownClassName={'sticky-header-dropdown'}/>
                    </StickyEffect>
                </div>
            </div>
    )
}

export default HeaderCover;
export { StickyHeader };