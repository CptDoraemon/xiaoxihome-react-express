//stupid IE
//import 'babel-polyfill';

import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './flexbox.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ScrollToTop from './component/scrolltotop'
import { Frontpage } from './app/frontpage';
import {titleConvertToLink} from "./tools/title-convert-to-link";

import webAppProjectData from "./app/webAppProjectData";
import { galleryData } from "./app/gallery/galleryData";
import academicProjectsData from "./app/academicProjectData";
// import { Missing404 } from './component/missing404';
// import { Gallery } from './app/gallery/gallery';
// import { Contact } from './app/contact/contact';
// import { AboutPage } from './app/about/aboutPage';
// import { AcademicProject } from './app/academicProjects';
// import { WebAppProject } from './app/webAppProjects';
const AcademicProject = lazy(() => import('./app/academicProjects'));
const WebAppProject = lazy(() => import('./app/webAppProjects'));
const Gallery = lazy(() => import('./app/gallery/gallery'));
const Contact = lazy(() => import('./app/contact/contact'));
const AboutPage = lazy(() => import('./app/about/aboutPage'));
const Missing404 = lazy(() => import('./component/missing404'));

class App extends React.Component {
    constructor(props){
        super(props);
        this.academicProjectArray = academicProjectsData.map(obj => obj.title);
        this.webAppProjectArray = webAppProjectData.map(obj => obj.title);
        this.galleryArray = galleryData.map(arr => arr[0]);
        //
        this.academicProjectLinkArray = this.academicProjectArray.map(title => titleConvertToLink(title));
        this.webAppProjectLinkArray = this.webAppProjectArray.map(title => titleConvertToLink(title));
        this.galleryLinkArray = this.galleryArray.map(title => titleConvertToLink(title));
        //
        this.listAndLink = {
            academicProjectArray: this.academicProjectArray,
            webAppProjectArray: this.webAppProjectArray,
            galleryArray: this.galleryArray,
            academicProjectLinkArray: this.academicProjectLinkArray,
            webAppProjectLinkArray: this.webAppProjectLinkArray,
            galleryLinkArray: this.galleryLinkArray
        };

        this.academicProjectPaths = this.academicProjectLinkArray.map((link, index) => {
            return (
                <Route path={titleConvertToLink(link)} render={(props) => <AcademicProject {...props} name={this.academicProjectArray[index]} listAndLink={this.listAndLink}/>} key={index}/>
            )
        });
        this.webAppProjectPaths = this.webAppProjectLinkArray.map((link, index) => {
            return (
                <Route path={titleConvertToLink(link)} render={(props) => <WebAppProject {...props} name={this.webAppProjectArray[index]} listAndLink={this.listAndLink} index={index}/>} key={index}/>
            )
        });
        this.galleryPaths = this.galleryLinkArray.map((link, index) => {
            return (
                <Route path={titleConvertToLink(link)} render={(props) => <Gallery {...props} album={index} page={1} /> } key={index}/>
            )
        });
    }

    render() {
        return (
            <Router>
                <ScrollToTop>
                    <Suspense fallback={<div> </div>} >
                        <Switch>
                            <Route path="/" exact render={(props) => <Frontpage {...props} listAndLink={this.listAndLink} />} />
                            <Route path="/home" exact render={(props) => <Frontpage {...props} listAndLink={this.listAndLink} />} />
                            <Route path="/contact" render={(props) => <Contact {...props}/> } />
                            <Route path="/about" render={(props) => <AboutPage {...props}/> } />

                            { this.academicProjectPaths }

                            { this.webAppProjectPaths }

                            { this.galleryPaths }

                            <Route render={ () => <Missing404/> } />

                        </Switch>
                    </Suspense>
                </ScrollToTop>
            </Router>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('root'));
