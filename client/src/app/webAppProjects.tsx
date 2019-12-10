import React from 'react';
// import { HeaderSticky } from '../component/header';
import Footer from '../component/footer';
import './webAppProjects.css';
import {setTitle} from "../tools/set-title";
// import {resetJSONLD, setDetailPageJSONLD} from "../tools/set-JSONLD";

enum PageType {
    SINGLE = 'SINGLE',
    COLLECTION = 'COLLECTION'
}

interface WebAppProject {
    pageType: PageType.SINGLE;
    title: string;
    demoLink: string;
    githubLink: string;
    description: string;
    summary: string;
}

interface WebAppProjectCollections {
    pageType: PageType.COLLECTION;
    title: string;
    projects: Array<WebAppProjectInCollections>;
    summary: string;
}

interface WebAppProjectInCollections {
    title: string;
    demoLink: string;
    githubLink: string | null;
    description: string;
}

interface WebAppProjectTemplateProps {
    data: WebAppProject
}

function WebAppProjectTemplate(props: WebAppProjectTemplateProps) {

    return (
        <div className='web-app-project-template-body color1'>
            <div className='web-app-project-template-wrapper'>
                <h1> { props.data.title } </h1>
                <div dangerouslySetInnerHTML={{__html: props.data.description }} />
                <div className={'web-app-project-template-button-wrapper'}>
                    <a href={props.data.demoLink} target="_blank" rel='noopener noreferrer' className='web-app-project-template-button'>Open in a new window</a>
                    <a href={props.data.githubLink} target="_blank" rel='noopener noreferrer' className='web-app-project-template-button'>Github</a>
                </div>
                <iframe src={props.data.demoLink} title='web project'/>

            </div>
        </div>
    )
}

interface WebAppProjectCollectionTemplateProps {
    data: WebAppProjectCollections
}

function WebAppProjectCollectionTemplate(props: WebAppProjectCollectionTemplateProps) {
    return (
        <div className='web-app-project-template-body color1'>
            <div className='web-app-project-template-wrapper'>
                <h1> { props.data.title } </h1>

                <div className={'web-app-collection-wrapper'}>
                {
                    props.data.projects.map((project, index) => {
                        return <ProjectInCollection data={project} key={index}/>
                    })
                }
                </div>
            </div>
        </div>
    )
}

interface ProjectInCollectionProps {
    data: WebAppProjectInCollections
}

function ProjectInCollection(props: ProjectInCollectionProps) {
    return (
        <div className={'web-app-collection-item web-app-link-animation'}>
            <div className={'web-app-collection-item-title'}>
                <a href={props.data.demoLink} target="_blank" rel='noopener noreferrer'>{ props.data.title }</a>
                <div>: </div>
                { props.data.githubLink ?
                    <div
                        className={'web-app-collection-item-github'}
                        onClick={() => window.open(props.data.githubLink === null ? '' : props.data.githubLink, '_blank')}
                    >Github</div> :
                    null }
            </div>
            <div dangerouslySetInnerHTML={{__html: props.data.description }} className={'web-app-no-indent'} />
        </div>
    )
}

interface WebAppProjectProps {
    data: WebAppProject | WebAppProjectCollections
}

class WebAppProject extends React.Component<WebAppProjectProps, {}> {

    componentDidMount() {
        setTitle(this.props.data.title, false);
        // setDetailPageJSONLD(this.props.index);
    }

    componentWillUnmount() {
        // resetJSONLD();
    }

    render() {
        return (
            <div>
                {/*<HeaderSticky headerTitle='Web App Project' listAndLink={this.props.listAndLink} />*/}
                {
                    this.props.data.pageType === PageType.SINGLE ?
                        <WebAppProjectTemplate data={this.props.data}/> :
                        <WebAppProjectCollectionTemplate data={this.props.data}/>
                }

                <Footer />
            </div>
        );
    }
}

export { WebAppProject as default };