import React, {ReactComponentElement, ReactElement} from 'react';
import './header.css';
import { Link } from "react-router-dom";
import { IoIosList, IoIosClose } from "react-icons/io";
import mappedDataForProps from "../data";

enum DropdownClassName {
    ACTIVE = 'work-drop-down-active',
    INACTIVE = 'work-drop-down-inactive'
}

interface DropdownListProps {
    allLinks: Array<SectionInfo>;
    dropdownTitle: string;
}

interface DropdownListState {
    dropdownClassName: string
}

class DropdownList extends  React.Component<DropdownListProps, DropdownListState> {
    constructor(props: DropdownListProps) {
        super(props);
        this.state = {
            dropdownClassName: DropdownClassName.INACTIVE
        };
        this.toggleDropdownList = this.toggleDropdownList.bind(this);
        this.closeDropdownList = this.closeDropdownList.bind(this);
    }

    toggleDropdownList() {
        this.setState({
            dropdownClassName: this.state.dropdownClassName === DropdownClassName.ACTIVE ? DropdownClassName.INACTIVE : DropdownClassName.ACTIVE
        })
    }

    closeDropdownList() {
        this.setState({
            dropdownClassName: DropdownClassName.INACTIVE
        })
    }

    render() {
        return (
            <>
                <li onClick={this.toggleDropdownList} >
                    { this.props.dropdownTitle }
                </li>
                <div className={this.state.dropdownClassName} onMouseLeave={this.closeDropdownList}>
                    {
                        this.props.allLinks.map((section: SectionInfo, index: number) => {
                            return (
                                <>
                                    <h5 key={index}> {section.sectionTitle} </h5>
                                    { section.links.map((linkInfo: LinkInfo, index:number) => {
                                        return (
                                            <Link to={linkInfo.link} key={index}>
                                                <p>{linkInfo.title}</p>
                                            </Link>
                                        )
                                    })}
                                </>
                            )
                        })
                    }
                </div>
            </>
        )
    }
}

interface ListProps {
    headerLists: Array<LinkInfo | MultiLinkInfo>;
}

function List(props: ListProps) {
    return (
        <ul>
            {
                props.headerLists.map((linkInfo, index: number) => {
                    if (typeof linkInfo.link === "string") {
                        return (
                            <Link to={linkInfo.link}>
                                <li> {linkInfo.title} </li>
                            </Link>
                        )
                    } else {
                        return (
                            <DropdownList dropdownTitle={linkInfo.title} allLinks={linkInfo.link}/>
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
                <List headerLists={this.headerLists}/>
            </div>
        )
    }
}

// function withStickyEffect(WrappedComponent: React.ComponentType<any>, inEffectHeight: number) {
//
//     interface StickyHOCProps {
//
//     }
//
//     interface StickyHOCStates {
//         isFixed: boolean
//     }
//
//     return class extends React.Component<StickyHOCProps, StickyHOCStates> {
//         constructor(props: StickyHOCProps) {
//             super(props);
//             this.state = {
//                 isFixed: false
//             };
//             this.scrollHandler = this.scrollHandler.bind(this);
//         }
//
//         scrollHandler() {
//
//         }
//
//         componentDidMount(){
//             document.addEventListener('scroll', this.scrollHandler);
//         };
//
//         componentWillUnmount(){
//             document.removeEventListener('scroll', this.scrollHandler);
//         };
//
//         render() {
//             return (
//                 <div style={{
//                     position: 'relative'
//                 }}>
//                     <WrappedComponent {...this.props} />
//                     <div></div>
//                 </div>
//             )
//         }
//     }
// }

// class HeaderSticky extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             headerClassName: 'header-fixed',
//             placeholderClassName: 'header-fixed-placeholder',
//             dropDownClassName: 'work-drop-down-inactive'
//         };
//         this.handleScroll = this.handleScroll.bind(this);
//         this.workDropDownListToggle = this.workDropDownListToggle.bind(this);
//         this.workDropDownListInactive = this.workDropDownListInactive.bind(this);
//
//     }
//     componentDidMount(){
//         window.addEventListener('scroll', this.handleScroll);
//     };
//     componentWillUnmount(){
//         window.removeEventListener('scroll', this.handleScroll);
//     };
//     handleScroll() {
//         const scrolled = window.pageYOffset;
//         if (scrolled >= 50 && this.state.placeholderClassName === 'header-fixed-placeholder') {
//             this.setState({
//                 headerClassName: 'header-fixed fixed',
//                 placeholderClassName: 'header-fixed-placeholder-scrolled'
//             })
//         }
//         if (scrolled < 50 && this.state.placeholderClassName !== 'header-fixed-placeholder') {
//             this.setState({
//                 headerClassName: 'header-fixed',
//                 placeholderClassName: 'header-fixed-placeholder'
//             })
//         }
//
//     }
//     workDropDownListToggle() {
//         this.setState({
//             dropDownClassName: this.state.dropDownClassName === 'work-drop-down-active' ? 'work-drop-down-inactive' : 'work-drop-down-active'
//         })
//     }
//     workDropDownListInactive() {
//         this.setState({
//             dropDownClassName: 'work-drop-down-inactive'
//         })
//     }
//     render() {
//         //It receives props: listAndLink
//         return (
//             <div>
//                 <div className={this.state.headerClassName}>
//                     <h1> {this.props.headerTitle} </h1>
//                     <ul>
//                         <Link to='/home'>
//                             <li>home</li>
//                         </Link>
//                         <li onClick={this.workDropDownListToggle}  >work</li>
//                         <div className={this.state.dropDownClassName} onMouseLeave={this.workDropDownListInactive}>
//                             <h5>Academic Projects</h5>
//                             { this.props.listAndLink.academicProjectArray.map((i, index) => {
//                                 return (
//                                     <Link to={this.props.listAndLink.academicProjectLinkArray[index]} key={`linkAcademic${i}`}>
//                                         <p>{i}</p>
//                                     </Link>
//                                 )
//                             })}
//                             <h5>Web App Projects</h5>
//                             { this.props.listAndLink.webAppProjectArray.map((i, index) => {
//                                 return (
//                                     <Link to={this.props.listAndLink.webAppProjectLinkArray[index]} key={`linkWeb${i}`}>
//                                         <p>{i}</p>
//                                     </Link>
//                                 )
//                             })}
//                             <h5>Gallery</h5>
//                             { this.props.listAndLink.galleryArray.map((i, index) => {
//                                 return (
//                                     <Link to={this.props.listAndLink.galleryLinkArray[index]} key={`linkGallery${i}`}>
//                                         <p>{i}</p>
//                                     </Link>
//                                 )
//                             })}
//                         </div>
//                         <Link to='/about'>
//                             <li>about</li>
//                         </Link>
//                         <Link to='/contact'>
//                             <li>contact</li>
//                         </Link>
//                     </ul>
//                 </div>
//                 <div className={this.state.placeholderClassName}> </div>
//             </div>
//         )
//     }
// }

export default HeaderCover;