import React from 'react';
import Cover from "./cover";
import Footer from "../../component/footer";
import { myScrollTo } from "../../tools/myScrollTo";
import './frontpage.css';
import  '../../flexbox.css'
import {setTitle} from "../../tools/set-title";
import {FrontpageHeader, MobileNavBar} from "../../component/header";
import mappedDataForProps from "../../data";
import {WithCallBackOnResized} from "../../tools/use-is-resized";
import {
    FrontpageAcademicSection,
    FrontpageGallerySection,
    FrontpageWebSection
} from "./section/frontpage-project-list-section";

const IS_MOBILE = () => window.innerWidth < 800;

interface ProjectInfo {
    link: string;
    title: string;
}

interface AlbumInfo {
    title: string;
    imgUrl: string;
    link: string;
}

interface TextSectionInfo {
    sectionTitle: string
    projects: Array<ProjectInfo>;
}

interface GallerySectionInfo {
    sectionTitle: string
    projects: Array<AlbumInfo>;
}

interface AllProjectsInfo {
    0: TextSectionInfo
    1: TextSectionInfo;
    2: GallerySectionInfo;
}

interface FrontpageProps {
    allProjectsInfo: AllProjectsInfo
}

interface FrontpageStates {
    isImgLoaded: boolean,
    containerKey: number
}

class Frontpage extends React.Component<FrontpageProps, FrontpageStates> {
    galleryRef = React.createRef<HTMLDivElement>();
    academicRef = React.createRef<HTMLDivElement>();
    webRef = React.createRef<HTMLDivElement>();
    parallelBoxRef = React.createRef<HTMLDivElement>();
    isMobile: boolean;

    constructor(props: FrontpageProps) {
        super(props);
        this.state = {
            isImgLoaded: false,
            containerKey: 0
        };
        this.isMobile = IS_MOBILE();
        this.scrollToWorkRef = this.scrollToWorkRef.bind(this);
        this.reloadOnIsMobileChanged = this.reloadOnIsMobileChanged.bind(this);
    }
    scrollToWorkRef() {
        if (this.webRef.current) myScrollTo(this.webRef.current.offsetTop);
    };
    reloadOnIsMobileChanged() {
        if (IS_MOBILE() !== this.isMobile) {
            window.location.reload();
        }
    }
    componentDidMount() {
        setTitle(null, true);
        // setSummaryPageJSONLD();
    }
    componentWillUnmount() {
        // resetJSONLD();
    }
    render() {
        return (
            <WithCallBackOnResized callback={this.reloadOnIsMobileChanged}>
                <div className='frontpage-main' ref={this.parallelBoxRef}>
                    <FrontpageHeader data={mappedDataForProps.header}/>
                    <MobileNavBar data={mappedDataForProps.header}/>
                    <Cover clickToScrollToAnchor={this.scrollToWorkRef}/>

                    <div className={'academic-and-web'}>

                        <div ref={this.webRef}/>
                        <FrontpageWebSection sectionTitle={this.props.allProjectsInfo[1].sectionTitle} tileInfo={this.props.allProjectsInfo[1].projects}/>

                        <div ref={this.academicRef}/>
                        <FrontpageAcademicSection sectionTitle={this.props.allProjectsInfo[0].sectionTitle} tileInfo={this.props.allProjectsInfo[0].projects}/>

                    </div>

                    <div className={'gallery'} ref={this.galleryRef}>
                        <FrontpageGallerySection sectionTitle={this.props.allProjectsInfo[2].sectionTitle} tileInfo={this.props.allProjectsInfo[2].projects}/>
                    </div>
                    <Footer />
                </div>
            </WithCallBackOnResized>
        )
    }
}

export default Frontpage;


