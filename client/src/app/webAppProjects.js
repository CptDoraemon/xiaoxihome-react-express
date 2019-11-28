import React from 'react';
import { HeaderSticky } from '../component/header';
import { Footer } from '../component/footer';
import webAppProjectData from './webAppProjectData';
import './webAppProjects.css';
import {setTitle} from "../tools/set-title";
import {resetJSONLD, setDetailPageJSONLD} from "../tools/set-JSONLD";


function WebAppProjectTemplate(props) {
    let obj = [...webAppProjectData];
    obj = obj.filter((i) => i.title === props.name);
    const link = obj[0].link;
    const description = obj[0].description;

    return (
        <div className='web-app-project-template-body color1'>
            <div className='web-app-project-template-wrapper'>
                <h1> { props.name } </h1>
                <div dangerouslySetInnerHTML={{__html: description }} />
                { link === false ? null :
                    <React.Fragment>
                        <a href={link} target="_blank" rel='noopener noreferrer' className='web-app-project-template-button'>Open in a new window</a>
                        <iframe src={link} title='web project'/>
                    </React.Fragment>
                }
            </div>
        </div>
    )
}
class WebAppProject extends React.Component {
    componentDidMount() {
        setTitle(this.props.name, false);
        setDetailPageJSONLD(this.props.index);
    }

    componentWillUnmount() {
        resetJSONLD();
    }

    render() {
        return (
            <div>
                <HeaderSticky headerTitle='Web App Project' listAndLink={this.props.listAndLink} />
                <WebAppProjectTemplate name={this.props.name} />
                <Footer listAndLink={this.props.listAndLink} />
            </div>
        );
    }
}

export { WebAppProject as default };