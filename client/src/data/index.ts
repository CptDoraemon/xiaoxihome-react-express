import academicProjectsData, { AcademicProject } from "./academicProjectData";
import webAppProjectData, {WebAppProject, WebAppProjectCollections} from "./webAppProjectData";
import galleryData, {Album, galleryPreviewData} from "./galleryData";
import { titleConvertToLink } from "../tools/title-convert-to-link";

enum Sections {
    ACADEMIC = 'ACADEMIC PROJECTS',
    WEB = 'WEB APP PROJECTS',
    ALBUMS = 'ALBUMS',
}

enum HeaderNFooterLists {
    HOME = 'HOME',
    WORK = 'WORK',
    CONTACT = 'CONTACT',
    ABOUT = 'ABOUT',
}

const appData = {
    academicProjectsData:  academicProjectsData,
    webAppProjectData: webAppProjectData,
    galleryData: galleryData,
    galleryPreviewData: galleryPreviewData
};

// data for Frontpage
interface RouterInfo {
    title: string;
    link: string;
}

interface RouterInfoWithImage extends RouterInfo{
    imgUrl: string;
}
const academicProjectsRouters: Array<RouterInfo> = appData.academicProjectsData.map((obj) => ({title: obj.title, link: titleConvertToLink(obj.title)}));
const webProjectsRouters: Array<RouterInfo> = appData.webAppProjectData.map((obj) => ({title: obj.title, link: titleConvertToLink(obj.title)}));
const albumRoutersWithImage: Array<RouterInfoWithImage> = appData.galleryPreviewData.map((obj) => ({title: obj.albumName, link: titleConvertToLink(obj.albumName), imgUrl: obj.link}));

const mappedDataForFrontpageProps = {
    0: {
        sectionTitle: Sections.ACADEMIC,
        projects: [...academicProjectsRouters]
    },
    1: {
        sectionTitle: Sections.WEB,
        projects: [...webProjectsRouters]
    },
    2: {
        sectionTitle: Sections.ALBUMS,
        projects: [...albumRoutersWithImage]
    }
};

// data for Footer
interface MultiLinkInfo {
    link: Array<SectionInfo>;
    title: string;
}

interface SectionInfo {
    sectionTitle: string;
    links: Array<RouterInfo>;
}

const albumRouters: Array<RouterInfo> = appData.galleryPreviewData.map((obj) => ({title: obj.albumName, link: titleConvertToLink(obj.albumName)}));
const allWorksLink: Array<SectionInfo> = [
    {
        sectionTitle: Sections.ACADEMIC,
        links: [...academicProjectsRouters]
    },
    {
        sectionTitle: Sections.WEB,
        links: [...webProjectsRouters]
    },
    {
        sectionTitle: Sections.ALBUMS,
        links: [...albumRouters]
    }
];

const mappedDataForHeaderNFooter: Array<MultiLinkInfo | RouterInfo> = [
    {
        title: HeaderNFooterLists.HOME,
        link: '/home'
    },
    {
        title: HeaderNFooterLists.WORK,
        link: allWorksLink
    },
    {
        title: HeaderNFooterLists.ABOUT,
        link: '/about'
    },
    {
        title: HeaderNFooterLists.CONTACT,
        link: '/contact'
    }
];



const mappedDataForProps = {
    frontpage: mappedDataForFrontpageProps,
    footer: mappedDataForHeaderNFooter,
    header: mappedDataForHeaderNFooter
};

export default mappedDataForProps;