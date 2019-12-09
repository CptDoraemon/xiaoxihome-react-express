//stupid IE
//import 'babel-polyfill';

import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './flexbox.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ScrollToTop from './component/scrolltotop'
import Frontpage from './app/frontpage';

import mappedDataForProps from "./data";
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

    render() {
        return (
            <Router>
                <ScrollToTop>
                    <Suspense fallback={<div> </div>} >
                        <Switch>
                            <Route path="/" exact render={(props) => <Frontpage allProjectsInfo={mappedDataForProps.frontpage}/>} />
                            <Route path="/home" exact render={(props) => <Frontpage allProjectsInfo={mappedDataForProps.frontpage}/>} />
                            <Route path="/contact" render={(props) => <Contact /> } />
                            <Route path="/about" render={(props) => <AboutPage /> } />

                            {/*{ this.academicProjectPaths }*/}

                            {/*{ this.webAppProjectPaths }*/}

                            {/*{ this.galleryPaths }*/}

                            <Route render={ () => <Missing404/> } />

                        </Switch>
                    </Suspense>
                </ScrollToTop>
            </Router>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('root'));
