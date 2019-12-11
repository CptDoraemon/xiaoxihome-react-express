import React, {CSSProperties, ReactComponentElement, ReactElement} from 'react';
import './header.css';
import { Link } from "react-router-dom";
import { IoIosList, IoIosClose } from "react-icons/io";
import mappedDataForProps from "../data";


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

    toggleDropdownList() {
        this.setState((prevState) => ({
            isDropdownActive: !prevState.isDropdownActive
        }))
    }

    closeDropdownList() {
        this.setState({
            isDropdownActive: false
        })
    }

    render() {
        return (
            <>
                <li onClick={this.toggleDropdownList} >
                    <span> { this.props.dropdownTitle } </span>
                    <div style={this.state.isDropdownActive ? {} : {display: 'none'}} onMouseLeave={this.closeDropdownList} className={this.props.dropdownClassName}>
                        {
                            this.props.allLinks.map((section: SectionInfo, index: number) => {
                                return (
                                    <>
                                        <h5 key={index}> {section.sectionTitle} </h5>
                                        { section.links.map((linkInfo: LinkInfo, index:number) => {
                                            return (
                                                <Link to={`${linkInfo.link}`} key={index}>
                                                    <p>{linkInfo.title}</p>
                                                </Link>
                                            )
                                        })}
                                    </>
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
                props.headerLists.map((linkInfo, index: number) => {
                    if (typeof linkInfo.link === "string") {
                        return (
                            <Link to={linkInfo.link}>
                                <li> <span>{linkInfo.title}</span> </li>
                            </Link>
                        )
                    } else {
                        return (
                            <DropdownList dropdownTitle={linkInfo.title} allLinks={linkInfo.link} dropdownClassName={props.dropdownClassName}/>
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

interface StickyHOCProps {
    propsForWrapper: {
        stickyStartHeight: number
    }

    passOnProps: any
}

interface StickyHOCStates {
    isFixed: boolean
}

function withStickyEffect(WrappedComponent: React.ComponentType<any>) {

    return class extends React.Component<StickyHOCProps, StickyHOCStates> {

        stickyStartHeight: number = this.props.propsForWrapper.stickyStartHeight;
        isFixedStyle: CSSProperties = {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%'
        };
        isNotFixedStyle: CSSProperties = {
            position: 'relative',
            width: '100%'
        };

        constructor(props: StickyHOCProps) {
            super(props);
            this.state = {
                isFixed: false
            };
            this.scrollHandler = this.scrollHandler.bind(this);
        }

        scrollHandler() {
            const scrolled = window.scrollY;
            if (scrolled >= this.stickyStartHeight && !this.state.isFixed) {
                this.setState({isFixed: true})
            } else if (scrolled < this.stickyStartHeight && this.state.isFixed) {
                this.setState({isFixed: false})
            }
        }

        componentDidMount(){
            document.addEventListener('scroll', this.scrollHandler);
        };

        componentWillUnmount(){
            document.removeEventListener('scroll', this.scrollHandler);
        };

        render() {
            return (
                <div style={this.state.isFixed ? {...this.isFixedStyle} : {...this.isNotFixedStyle}}>
                        <WrappedComponent {...this.props.passOnProps} />
                </div>
            )
        }
    }
}

const StickyList: React.ComponentType<StickyHOCProps> = withStickyEffect(List);


interface StickyHeader {
    headerTitle: string
}

function StickyHeader(props: StickyHeader) {
    return (
            <div>
                <div className={'sticky-header-wrapper'}>
                    <h1 className={'sticky-header-title'}> {props.headerTitle} </h1>
                    <StickyList propsForWrapper={{stickyStartHeight: 50}} passOnProps={{headerLists: mappedDataForProps.header, dropdownClassName: 'sticky-header-dropdown'}}/>
                </div>
            </div>
    )
}

export default HeaderCover;
export { StickyHeader };