import React, {useEffect, useMemo} from 'react';
import Cover from "./cover/cover";
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
import ParallaxWrapper from "../../animations/parallax-wrapper";

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

const Frontpage: React.FC<FrontpageProps> = ({allProjectsInfo}) => {
    const galleryRef = React.useRef<HTMLDivElement>(null);
    const academicRef = React.useRef<HTMLDivElement>(null);
    const webRef = React.useRef<HTMLDivElement>(null);
    const isMobile = useMemo(() => IS_MOBILE(), []);

    const scrollToWorkRef = () => {
        if (webRef.current) myScrollTo(webRef.current.getBoundingClientRect().top + window.scrollY);
    };
    const reloadOnIsMobileChanged = () => {
        if (IS_MOBILE() !== isMobile) {
            window.location.reload();
        }
    };

    useEffect(() => {
        setTitle(null, true);
        // setSummaryPageJSONLD();
        // return () => {
            // resetJSONLD();
        // }
    }, []);

    return (
        <WithCallBackOnResized callback={reloadOnIsMobileChanged}>
            <div className='frontpage-main'>
                <FrontpageHeader data={mappedDataForProps.header}/>
                <MobileNavBar data={mappedDataForProps.header}/>
                <Cover clickToScrollToAnchor={scrollToWorkRef}/>

                <ParallaxWrapper className={'frontpage-main'} parallaxStrength={0}>
                    <div className={'academic-and-web'}>
                        <div ref={webRef}/>
                        <FrontpageWebSection sectionTitle={allProjectsInfo[1].sectionTitle} tileInfo={allProjectsInfo[1].projects}/>
                        <div ref={academicRef}/>
                        <FrontpageAcademicSection sectionTitle={allProjectsInfo[0].sectionTitle} tileInfo={allProjectsInfo[0].projects}/>
                    </div>
                    <div className={'gallery'} ref={galleryRef}>
                        <FrontpageGallerySection sectionTitle={allProjectsInfo[2].sectionTitle} tileInfo={allProjectsInfo[2].projects}/>
                    </div>
                    <Footer />
                </ParallaxWrapper>
            </div>
        </WithCallBackOnResized>
    )
};

export default Frontpage;


