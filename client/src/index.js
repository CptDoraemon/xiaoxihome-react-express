//stupid IE
//import 'babel-polyfill';

import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './flexbox.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ScrollToTop from './component/scrolltotop'
import { Frontpage } from './app/frontpage';
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
        this.academicProjectArray = [
            'Machine Learning',
            'Empirical International Trade',
            'North American Economic History',
            'Stochastic Processes',
            'Applied Macroeconomics',
            'Econometric Theory'
        ];
        this.webAppProjectArray = [
            'Reddit-like Website',
            'Youtube Downloader',
            'Weather App',
            'Masonry Gallery',
            'Miscellany',
            'RaycasterJS'
        ];
        this.galleryArray = [
            'Toronto',
            'Canada',
            'Banff',
            'Hometown',
            'YorkU',
            'Astro'
        ];
        this.academicProjectLinkArray = this.convertToLink(this.academicProjectArray);
        this.webAppProjectLinkArray = this.convertToLink(this.webAppProjectArray);
        this.galleryLinkArray = this.convertToLink(this.galleryArray);

        this.listAndLink = {
            academicProjectArray: this.academicProjectArray,
            webAppProjectArray: this.webAppProjectArray,
            galleryArray: this.galleryArray,
            academicProjectLinkArray: this.academicProjectLinkArray,
            webAppProjectLinkArray: this.webAppProjectLinkArray,
            galleryLinkArray: this.galleryLinkArray
        };

        this.academicProjectPaths = this.academicProjectLinkArray.map((i, index) => {
            return (
                <Route path={i} render={(props) => <AcademicProject {...props} name={this.academicProjectArray[index]} listAndLink={this.listAndLink}/>} key={index}/>
            )
        });
        this.webAppProjectPaths = this.webAppProjectLinkArray.map((i, index) => {
            return (
                <Route path={i} render={(props) => <WebAppProject {...props} name={this.webAppProjectArray[index]} listAndLink={this.listAndLink} />} key={index}/>
            )
        });
        this.galleryPaths = this.galleryLinkArray.map((i, index) => {
            return (
                <Route path={i} render={(props) => <Gallery {...props} album={index} page={1} /> } key={index}/>
            )
        });
    }

    convertToLink(array) {
        return array.map((i) => {
            let item = i.toLowerCase().split(' ').join('-').replace('/', '');
            return ('/').concat(item);
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
