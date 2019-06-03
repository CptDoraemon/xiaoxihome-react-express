//stupid IE
//import 'babel-polyfill';

import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
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

const academicProjectArray = [
    'Machine Learning',
    'Empirical International Trade',
    'North American Economic History',
    'Stochastic Processes',
    'Applied Macroeconomics',
    'Econometric Theory'
];
const webAppProjectArray = [
    'Reddit-like Website',
    'Youtube Downloader',
    'Weather App',
    'Masonry Gallery',
    'DOM Practice',
    'RaycasterJS'
    ];
const galleryArray = [
    'Toronto',
    'Canada',
    'Banff',
    'Hometown',
    'YorkU',
    'Astro'
];

// Links are in the format of /xxxxxx-xxxxxx

function convertToLink(array) {
    return array.map((i) => {
        let item = i.toLowerCase().split(' ').join('-').replace('/', '');
        return ('/').concat(item);
    });
}
const academicProjectLinkArray = convertToLink(academicProjectArray);
const webAppProjectLinkArray = convertToLink(webAppProjectArray);
const galleryLinkArray = convertToLink(galleryArray);
const listAndLink = {
    academicProjectArray: academicProjectArray,
    webAppProjectArray: webAppProjectArray,
    galleryArray: galleryArray,
    academicProjectLinkArray: academicProjectLinkArray,
    webAppProjectLinkArray: webAppProjectLinkArray,
    galleryLinkArray: galleryLinkArray
};




class App extends React.Component {
    constructor(props){
        super(props);
        this.academicProjectPaths = academicProjectLinkArray.map((i, index) => {
            return (
                <Route path={i} render={(props) => <AcademicProject {...props} name={academicProjectArray[index]} listAndLink={listAndLink}/>} key={index}/>
            )
        });
        this.webAppProjectPaths = webAppProjectLinkArray.map((i, index) => {
            return (
                <Route path={i} render={(props) => <WebAppProject {...props} name={webAppProjectArray[index]} listAndLink={listAndLink} />} key={index}/>
            )
        });
        this.galleryPaths = galleryLinkArray.map((i, index) => {
            return (
                <Route path={i} render={(props) => <Gallery {...props} album={index} page={1} /> } key={index}/>
            )
        });

    }
    componentDidMount(){
        const title = [
            '⊂(˃̶͈̀ε ˂̶͈́ ⊂ )))Σ≡=─',
            '( ⸝⸝⸝°_°⸝⸝⸝ )',
            'ฅʕ•̫͡•ʔฅ',
            '(ง •̀_•́)ง',
            'Zzz...(¦3ꇤ[▓▓]',
            '୧(˶‾᷄ ⁻̫ ‾᷅˵)୨',
            'ᕕ( ᐛ )ᕗ',
            'ᶘ ᵒᴥᵒᶅ',
            '┌|°з°|┘└|°ε°|┐┌|°э°|┘',
            'ヽ(‘ ∇‘ )ノ',
            '₍˄·͈༝·͈˄₎ฅ˒˒',
        ];
        const pickOne = Math.floor(Math.random() * title.length );
        document.title = 'Xiaoxi\'s Home' + title[pickOne];
    }

    render() {
        return (
            <Router>
                <ScrollToTop>
                    <Suspense fallback={<Frontpage {...this.props} listAndLink={listAndLink} />} >
                        <Switch>
                            <Route path="/" exact render={(props) => <Frontpage {...props} listAndLink={listAndLink} />} />
                            <Route path="/home" exact render={(props) => <Frontpage {...props} listAndLink={listAndLink} />} />
                            <Route path="/contact" render={(props) => <Contact {...props}/> } />
                            <Route path="/about" render={(props) => <AboutPage {...props}/> } />

                            { this.academicProjectPaths }

                            { this.webAppProjectPaths }

                            { this.galleryPaths }

                            <Route render={ () => Missing404 } />

                        </Switch>
                    </Suspense>
                </ScrollToTop>
            </Router>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('root'));
