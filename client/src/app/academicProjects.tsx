import React from 'react';
// import { HeaderSticky } from '../component/header';
import Footer from '../component/footer';
import './academicProjects.css'
import {setTitle} from "../tools/set-title";

interface AcademicProject {
    title: string,
    projects: Array<AcademicProjectsSubProjects>
}

interface AcademicProjectsSubProjects {
    description: string,
    link: string
}

function AcademicProjectTemplate(props: AcademicProject) {
    // let name = props.name;
    // name = name.replace(/(^|\s)\w/g, (i) => i.toUpperCase());
    return (
        <div className='academic-project-template-wrapper color1'>
            <h1> { props.title } </h1>
            {
                props.projects.map((project: AcademicProjectsSubProjects, index: number) => {
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
                <p> {props.description} </p>
            </div>
        </a>
    )
}

class AcademicProject extends React.Component<AcademicProject, {}> {

    componentDidMount() {
        setTitle(this.props.title, false);
    }

    render() {
        return (
            <div>
                {/*<HeaderSticky headerTitle='Academic Project'/>*/}
                {/*<AcademicProjectTemplate title={this.props.title} projects={this.props.projects}/>*/}
                <Footer />
            </div>
        )
    }
}

export default AcademicProject;