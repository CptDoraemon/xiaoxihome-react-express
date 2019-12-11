import React from 'react';
import { StickyHeader } from "../component/header";
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

interface FlipButtonProps {
    link: string;
    text: string
}

function FlipButton(props: FlipButtonProps) {
    return (
        <div className={'flip-button-wrapper'}>
            <div className='flip-button-front'><div>{props.text}</div></div>
            <div className='flip-button-back'><div>{props.text}</div></div>
            <a href={props.link} target="_blank" rel='noopener noreferrer' className='flip-button-click-front'> </a>
            <a href={props.link} target="_blank" rel='noopener noreferrer' className='flip-button-click-back'> </a>
            {/*duplicate for better touch response*/}
        </div>
    )
}

function WebAppProjectTemplate(props: WebAppProjectTemplateProps) {

    return (
        <div className='web-app-project-template-body color1'>
            <div className='web-app-project-template-wrapper'>
                <h1> { props.data.title } </h1>
                <div dangerouslySetInnerHTML={{__html: props.data.description }} />
                <div className={'web-app-project-template-button-wrapper'}>
                    <FlipButton link={props.data.demoLink} text={'Open in a new window'}/>
                    <FlipButton link={props.data.githubLink} text={'Github'}/>
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

interface GitHubButtonProps {
    link: string
    className: string
}

export function GitHubButton(props: GitHubButtonProps) {
    return (
        <div
            className={props.className}
            onClick={() => window.open(props.link, '_blank')}
        ><span>GitHub</span></div>
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
                    <GitHubButton link={props.data.githubLink} className={'web-app-collection-item-github'}/> :
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
                <StickyHeader headerTitle={'Web App Project'}/>
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