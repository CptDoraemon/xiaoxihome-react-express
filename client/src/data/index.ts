import academicProjectsData, { AcademicProject } from "./academicProjectData";
import webAppProjectData, {WebAppProject, WebAppProjectCollections} from "./webAppProjectData";
import galleryData, {Album, galleryPreviewData} from "./galleryData";
import { titleConvertToLink } from "../tools/title-convert-to-link";

const appData = {
    academicProjectsData:  academicProjectsData,
    webAppProjectData: webAppProjectData,
    galleryData: galleryData,
    galleryPreviewData: galleryPreviewData
};

// links for headers and footers

export interface AllDataLinks {
    academicProjects: DataLinks;
    webProjects: DataLinks;
    gallery: DataLinks;
    [propName: string]: DataLinks;
}

export interface DataLinks {
    category: string;
    links: Array<DataLink>;
}

export interface DataLink {
    name: string;
    link: string;
}

const academicProjects = academicProjectsData.map((academicProject: AcademicProject): DataLink => {
    return {
        name: academicProject.title,
        link: titleConvertToLink(academicProject.title)
    }
});

const webProjects = webAppProjectData.map((webProject: WebAppProject | WebAppProjectCollections): DataLink => {
    return {
        name: webProject.title,
        link: titleConvertToLink(webProject.title)
    }
});

const gallery = galleryData.map((album: Album): DataLink => {
    return {
        name: album.albumName,
        link: titleConvertToLink(album.albumName)
    }
});

export const allDataLinks: AllDataLinks = {
    academicProjects: {
        category: 'Academic Projects',
        links: academicProjects
    },
    webProjects: {
            category: 'Web App Projects',
            links: webProjects
        },
    gallery: {
        category: 'Albums',
        links: gallery
    }
};


export default appData;