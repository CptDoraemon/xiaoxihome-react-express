import React from 'react';
import { HeaderSticky } from '../component/header';
import { Footer } from '../component/footer';
import academicProjectsData from './academicProjectData'
import './academicProjects.css'

function AcademicProjectTemplate(props) {
    // It receives two props: name and projectDataArray: the subject's name; the projects array under this subject.
    const boxes = props.projectDataArray.map((i, index) => {
        return (
            <AcademicProjectBox index={index} description={i.description} link={i.link}/>
        )
    })
    let name = props.name;
    name = name.replace(/(^|\s)\w/g, (i) => i.toUpperCase());
    return (
        <div className='academic-project-template-wrapper color1'>
            <h1> { name } </h1>
            { boxes }
        </div>
    )
}

function AcademicProjectBox(props) {
    return (
        <a href={props.link} target="_blank" rel='noopener noreferrer'>
            <div className='AcademicProjectBox'>
                <h2>project {props.index + 1}</h2>
                <div dangerouslySetInnerHTML={{__html: props.description }}></div>
            </div>
        </a>
    )
}

class AcademicProject extends React.Component{
    // It receives a name props as the subject name. name is in the form of "aaa bbb"
    // It receives prop listAndArray
    render() {
        let name = this.props.name;
        const project = academicProjectsData.filter((i) => i.title === name);
        const projectDataArray = [...project[0].projects];
        return (
            <div>
                <HeaderSticky headerTitle='Academic Project' listAndLink={this.props.listAndLink}/>
                <AcademicProjectTemplate name={name} projectDataArray={projectDataArray}/>
                <Footer listAndLink={this.props.listAndLink} />
            </div>
        )
    }
}

export { AcademicProject };