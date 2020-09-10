enum PageType {
    SINGLE = 'SINGLE',
    COLLECTION = 'COLLECTION'
}

export interface WebAppProject {
    pageType: PageType.SINGLE;
    title: string;
    demoLink: string;
    githubLink: string;
    description: string;
    summary: string;
}

export interface WebAppProjectCollections {
    pageType: PageType.COLLECTION;
    title: string;
    projects: Array<WebAppProjectInCollections>;
    summary: string;
}

interface WebAppProjectInCollections {
    title: string;
    demoLink: string;
    githubLink: string | null;
    description: string;
}

const webAppProjectData: Array<WebAppProject | WebAppProjectCollections> = [
    {
        pageType: PageType.SINGLE,
        title: 'Discussion Board',
        demoLink: 'https://cptdoraemon.github.io/discussion-board-client/',
        githubLink: 'https://github.com/CptDoraemon/discussion-board-client',
        description:
            `
            <p>
                A discussion board website, also served as the blog of XiaoxiHome.
            </p>
            <p>
                Backend is a headless RESTful API first Content Management System written with Python, Django and Django Rest Framework.
                The path and response from the API endpoints are designed to be standardised as well as predictable.
            </p>
            <p>
                Frontend is written with React and the help from TypeScript, Redux, React-Router, and MaterialUI.
            </p>
            <br/>
            <hr/>
            <br/>
            <p>There is another Reddit like discussion board available, written with React, NodeJS, Express and MongoDB:
                <br/>
                <br/>
                <a href="https://github.com/CptDoraemon/riddet" target="_blank" rel='noopener noreferrer'>GitHub</a>
                <br/>
                <a href="https://riddet.herokuapp.com/" target="_blank" rel='noopener noreferrer'>Demo</a>
                <br/>
                (Demo server may need up to half minute to wake up)
            </p>
            `,
        summary: 'A discussion board built with Django, React and more.',
    },
    {
        pageType: PageType.SINGLE,
        title: 'News App',
        demoLink: 'https://cptdoraemon.github.io/news-app/',
        githubLink: 'https://github.com/CptDoraemon/news-app',
        description:
            `
            <p>A news app built with TypeScript, React, Redux, MaterialUI, GraphQL, and NodeJS. </p>
            <p>News data courtesy of <a href="https://newsapi.org/" target="_blank" rel='noopener noreferrer'>NewsAPI.org</a>.</p>
            <p>My NodeJS server request and cache news data from NewsAPI.org every hour, and exposes the news data as GraphQL API for my front end app.</p>
            <p>Statistical analysis were made on the news data collected, and visualized to interactive charts and maps with the help from D3JS.</p>
            `,
        summary: 'An app to provide Canada news in the categories of headline, business, entertainment, health, science, sports and technology.',
    },
    {
        pageType: PageType.SINGLE,
        title: 'Weather App',
        demoLink: 'https://cptdoraemon.github.io/weather/',
        githubLink: 'https://github.com/CptDoraemon/weather-app-flutter',
        description:
            `
                <p>A Google like weather app. </p>
                <p>Weather API is provided by DarkSky. </p>
                <p>Reverse geocoding API is provided by LocationIQ. </p>
                <p>The data from third party APIs are then combined in Node.JS server and exposed as my own API.</p>
                <p>A mobile version written with Dart/Flutter is also available. To lookup cities, a PostgreSQL database is attached to this version instead of using third party API. </p>
            `,
        summary: 'An app for currently, hourly and daily weather forecasts.'
    },
    {
        pageType: PageType.SINGLE,
        title: 'Data Explorer',
        demoLink: 'https://test.xiaoxihome.com/',
        githubLink: 'https://github.com/CptDoraemon/zdy-website-2',
        description:
        `
            <p><b>--> Under development! <--</b> </p>
            <p>A website built to present research data.</p>
            <p>The frontend is built with React and MaterialUI, 
            the charts are built with <a href="https://www.highcharts.com/" target="_blank" rel='noopener noreferrer'>HighCharts</a>.
            The backend is built with <a href="https://nestjs.com/" target="_blank" rel='noopener noreferrer'>Nest.js</a>, a fully-fledged framework that provides many features right out of the box.
            </p>
            <p>The core component of the website is a table which provides filter function. The table is working with a stand-alone redux store to improve code reusability.</p>
            <p>The website provides a contribution feature as well, the contributed files are validated in server, then compressed and transferred to an object storage service.</p>
            <p>Unlike many of my projects that take advantage of PaaS products, this website is deployed on an AWS EC2 instance with the help of docker and docker-compose. The SSL decryption and resource compression are offloaded to Nginx.</p>
            <p>Please open in new window since "X-Frame-Options: sameorigin" is enabled.</p>
        `,
        summary: 'A data exploring website.'
    },
    {
        pageType: PageType.COLLECTION,
        title: 'Smaller Projects',
        projects: [
            {
                title: 'Firework Animation',
                demoLink: 'https://cptdoraemon.github.io/firework/',
                githubLink: 'https://github.com/CptDoraemon/firework',
                description: `
                    <p>Inspired by <a href="http://www.playfuljs.com/physics-for-the-lazy/" target="_blank" rel='noopener noreferrer'>PlayfulJS</a>. The fireworks are affected by gravity and air friction (which is linear to the squared velocity). A floor in Green value ensures the fireworks have bright colors.</p>
                `
            },
            {
                title: 'Parallax component library for React',
                demoLink: 'https://cptdoraemon.github.io/parallax-container/',
                githubLink: 'https://github.com/CptDoraemon/parallax-container',
                description: `
                    <p>A parallax effect component library for React. The front page of XiaoxiHome has CSS 3D transforms based parallax effect, it has good performance but with some compatibility issues. This library uses JS approach, with acceptable performance and better consistency across platforms.</p>
                `
            },
            {
                title: 'Youtube Downloader',
                demoLink: 'https://cptdoraemon.github.io/youtube-downloader/',
                githubLink: 'https://github.com/CptDoraemon/youtube-downloader',
                description: `
                    <p>An app to download mp3 from Youtube videos, playlists and mixlists. Only the front end is demonstrated for legal reasons, the github repo is ready to be deployed on NodeJS server though.</p>
                `
            },
            {
                title: 'Shopping Cart',
                demoLink: 'https://cptdoraemon.github.io/shopping/',
                githubLink: 'https://github.com/CptDoraemon/shopping',
                description: `
                    <p>A simple shopping app that allows user to add merchandises into shopping carts. It uses Redux and Typescript.</p>
                `
            },
            {
                title: 'Tetris',
                demoLink: 'https://cptdoraemon.github.io/tetris/',
                githubLink: 'https://github.com/CptDoraemon/tetris',
                description: `<p>You know what's Tetris.</p>`
            },
            {
                title: 'Snakey',
                demoLink: 'https://xiaoxihome.s3.us-east-2.amazonaws.com/webprojects/snake_beta.html',
                githubLink: null,
                description: `<p>You know what's Snakey.</p>`
            },
            {
                title: 'OnePlus 7 pro advertisement page',
                demoLink: 'https://cptdoraemon.github.io/oneplus7pro/',
                githubLink: 'https://github.com/CptDoraemon/oneplus7pro',
                description: '<p>Wanted to try some cool animations.</p>'
            },
            {
                title: 'DOM practise',
                demoLink: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/webprojects/BandWebsite/index.html',
                githubLink: null,
                description: '<p>This is the practice project in the book DOM Scripting: Web Design with JavaScript and the Document Object Model by Jeremy Keith, I followed the book step by step. It was a really good beginner project to practice native DOM APIs.</p>'
            }
        ],
        summary: 'A collection of smaller web projects.'
    },
    {
        pageType: PageType.SINGLE,
        title: 'RaycasterJS',
        demoLink: 'https://raycaster.xiaoxihome.com',
        githubLink: 'https://github.com/CptDoraemon/raycasterJS',
        description: `
            <p>Raycaster was a very popular game engine in the 80s and 90s, the computer was not powerful enough to handle real time 3D rendering, but players were getting tired of 2D games and wanted to see something new. </p>
            <p>Raycaster is able to give audience a 3D feeling only by doing geometry calculation and drawing vertical lines on the screen. </p>
            <p>The most famous game using this engine must be Wolfenstein 3D. </p>
            <p>Press "I" in game for instructions.</p>
            `,
        summary: 'A FPS game built with Raycaster algorithm.'
    }
];

export default webAppProjectData;
