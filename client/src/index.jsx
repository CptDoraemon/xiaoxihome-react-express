// Polyfills
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
//import 'babel-polyfill';

import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './flexbox.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ScrollToTop from './component/scrolltotop'
import Frontpage from './app/frontpage/frontpage';

import mappedDataForProps from "./data";
import Gallery from './app/gallery/gallery';
const AcademicProject = lazy(() => import('./app/academicProjects'));
const WebAppProject = lazy(() => import('./app/webAppProjects'));
const Contact = lazy(() => import('./app/contact/contact'));
const AboutPage = lazy(() => import('./app/about/aboutPage'));
const Missing404 = lazy(() => import('./component/missing404'));

class App extends React.Component {

    constructor(props) {
        super(props);
        this.academicRouters = mappedDataForProps.routers.academic.map((academicPageData, index) => {
            return <Route key={`${academicPageData.link}`} path={`${academicPageData.link}`} render={() => <AcademicProject data={academicPageData.data} key={index}/> } />
        });
        this.webRouters = mappedDataForProps.routers.web.map((webPageData, index) => {
            return <Route key={`${webPageData.link}`} path={`${webPageData.link}`} render={() => <WebAppProject data={webPageData.data} key={index}/> } />
        });
    }

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

                            { this.academicRouters }
                            { this.webRouters }

                            <Route path={`/album/:albumName/:id`} render={(props) => <Gallery albumName={props.match.params.albumName} id={parseInt(props.match.params.id)} history={props.history}/> } />

                            <Route render={ () => <Missing404/> } />
                        </Switch>
                    </Suspense>
                </ScrollToTop>
            </Router>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('root'));
