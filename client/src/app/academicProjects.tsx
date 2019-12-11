import React from 'react';
// import { HeaderSticky } from '../component/header';
import Footer from '../component/footer';
import './academicProjects.css'
import {setTitle} from "../tools/set-title";
import {StickyHeader} from "../component/header";

interface AcademicProject {
    title: string,
    projects: Array<AcademicProjectsSubProjects>
}

interface AcademicProjectsSubProjects {
    description: string,
    link: string
}

interface AcademicProjectTemplateProps {
    data: AcademicProject
}

function AcademicProjectTemplate(props: AcademicProjectTemplateProps) {
    // let name = props.name;
    // name = name.replace(/(^|\s)\w/g, (i) => i.toUpperCase());
    return (
        <div className='academic-project-template-wrapper color1'>
            <h1> { props.data.title } </h1>
            {
                props.data.projects.map((project: AcademicProjectsSubProjects, index: number) => {
                    return (
                        <AcademicProjectBox index={index} description={project.description} link={project.link} key={index}/>
                    )
                })
            }
        </div>
    )
}

interface AcademicProjectBoxProps {
    link: string;
    description: string;
    index: number;
}

function AcademicProjectBox(props: AcademicProjectBoxProps) {
    return (
        <a href={props.link} target="_blank" rel='noopener noreferrer'>
            <div className='AcademicProjectBox'>
                <h2>project {props.index + 1}</h2>
                <div dangerouslySetInnerHTML={{__html: props.description }}></div>
            </div>
        </a>
    )
}

interface AcademicProjectProps {
    data: AcademicProject
}

class AcademicProject extends React.Component<AcademicProjectProps, {}> {

    componentDidMount() {
        setTitle(this.props.data.title, false);
    }

    render() {
        return (
            <div>
                <StickyHeader headerTitle={'Academic Project'}/>
                <AcademicProjectTemplate data={this.props.data}/>
                <Footer />
            </div>
        )
    }
}

export default AcademicProject;