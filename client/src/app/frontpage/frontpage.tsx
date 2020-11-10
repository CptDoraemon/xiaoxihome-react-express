import React, {useCallback, useEffect, useState} from 'react';
import Cover from "./cover/cover";
import Footer from "../../component/footer";
import { myScrollTo } from "../../tools/myScrollTo";
import './frontpage.css';
import  '../../flexbox.css'
import {setTitle} from "../../tools/set-title";
import {FrontpageHeader, MobileNavBar} from "../../component/header";
import mappedDataForProps from "../../data";
import {
    FrontpageAcademicSection,
    FrontpageGallerySection,
    FrontpageWebSection
} from "./section/frontpage-project-list-section";
import useCallbackOnResize from "../../tools/use-callback-on-resize";

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

interface FrontpageInnerProps {
    allProjectsInfo: AllProjectsInfo,
    fullHeight: number,
    fullWidth: number
}

const FrontpageInner: React.FC<FrontpageInnerProps> = ({allProjectsInfo, fullHeight, fullWidth}) => {
    const galleryRef = React.useRef<HTMLDivElement>(null);
    const academicRef = React.useRef<HTMLDivElement>(null);
    const webRef = React.useRef<HTMLDivElement>(null);

    const scrollToWorkRef = useCallback(() => {
        if (webRef.current) {
            myScrollTo(webRef.current.getBoundingClientRect().top + window.scrollY);
        }
    }, []);

    useEffect(() => {
        setTitle(null, true);
        // setSummaryPageJSONLD();
        // return () => {
            // resetJSONLD();
        // }
    }, []);

    return (
        <div className='frontpage-main'>
            <FrontpageHeader data={mappedDataForProps.header}/>
            <MobileNavBar data={mappedDataForProps.header}/>
            <Cover clickToScrollToAnchor={scrollToWorkRef} fullHeight={fullHeight} fullWidth={fullWidth}/>

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
        </div>
    )
};

const useReloadOnResize = () => {
    const reload = useCallback(() => {
        window.location.reload()
    }, []);
    useCallbackOnResize(reload);
};

interface FrontpageProps {
    allProjectsInfo: AllProjectsInfo,
    fullHeight: number
}

const Frontpage: React.FC<FrontpageProps> = ({allProjectsInfo}) => {
    const [fullHeight, setFullHeight] = useState<number | null>(null);
    const [fullWidth, setFullWidth] = useState<number | null>(null);

    useReloadOnResize();

    useEffect(() => {
        setFullHeight(window.innerHeight);
        setFullWidth(window.innerWidth)
    }, []);

    if (fullHeight === null || fullWidth === null) {
        return <></>
    } else return (
      <FrontpageInner allProjectsInfo={allProjectsInfo} fullHeight={fullHeight} fullWidth={fullWidth}/>
    )
};

export default Frontpage;


