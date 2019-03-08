//stupid IE
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ScrollToTop from './component/scrolltotop'
import { AcademicProject } from './app/academicProjects';
import { WebAppProject } from './app/webAppProjects';
import { Frontpage } from './app/frontpage';
import { Missing404 } from './component/missing404';
import { Gallery } from './app/gallery/gallery';
import { Contact } from './app/contact/contact';
import { AboutPage } from './app/about/aboutPage';

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
    'FireworkJS',
    'SnakeyJS',
    'PHP/MySQL Login System',
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
const academicProjectLinkArray = [];
const webAppProjectLinkArray = [];
const galleryLinkArray = [];
function convertToLink(array, linkArray) {
    array.map((i) => {
        let item = i.toLowerCase().split(' ').join('-').replace('/', '');
        item = ('/').concat(item);
        linkArray.push(item);
    });
}
convertToLink(academicProjectArray, academicProjectLinkArray);
convertToLink(webAppProjectArray, webAppProjectLinkArray);
convertToLink(galleryArray, galleryLinkArray);
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
                <Switch>
                    <Route path="/" exact render={(props) => <Frontpage {...props} listAndLink={listAndLink} />} />
                    <Route path="/home" exact render={(props) => <Frontpage {...props} listAndLink={listAndLink} />} />
                    <Route path="/contact" render={(props) => <Contact {...props}/> } />
                    <Route path="/about" render={(props) => <AboutPage {...props}/> } />

                    { this.academicProjectPaths }

                    { this.webAppProjectPaths }

                    { this.galleryPaths }

                    <Route component={ Missing404 } />

                </Switch>
                </ScrollToTop>
            </Router>
        )
    }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
