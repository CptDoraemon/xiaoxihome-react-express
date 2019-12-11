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
        title: 'Reddit-like Website',
        demoLink: 'https://riddet.xiaoxihome.com',
        githubLink: 'https://github.com/CptDoraemon/riddet',
        description:
            `
            <p>This is a Reddit like discussion website. </p>
            <p>It was built with React, NodeJS, Express and MongoDB. </p>
            <p>For security reasons, this site does not allow to be loaded in an iFrame, therefore please open it in a new window.<p>
            `,
        summary: 'A Reddit like discussion website.',
    },
    {
        pageType: PageType.SINGLE,
        title: 'Youtube Downloader',
        demoLink: 'https://cptdoraemon.github.io/youtube-downloader/',
        githubLink: 'https://github.com/CptDoraemon/youtube-downloader',
        description:
            `
            <p>An app to download mp3 from Youtube playlist.</p>
            <p>For legal reasons only the frontend is hosted. </p>
            <p>This app is Node ready and it relies on ytdl package to actually download assets from Youtube, in case it's not working, please update ytdl to latest version. </p>
            <p>https://github.com/CptDoraemon/youtube-downloader</p>
            `,
        summary: 'An app to download youtube videos.',
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
                <p>A mobile version written with Dart/Flutter is also available. To lookup cities, a PostgreSQL database is attached to this version instead of using third party API. </p>
            `,
        summary: 'A app for currently, hourly and daily weather forecasts.'
    },
    {
        pageType: PageType.SINGLE,
        title: 'Masonry Gallery',
        demoLink: 'http://gallery.xiaoxihome.com',
        githubLink: 'https://github.com/CptDoraemon/waterfall-gallery',
        description:
        `
            <p>A Pinterest like gallery. </p>
            <p>It uses AWS S3 storage to store the uploaded photos. </p>
            <p>It's hosted on a free server and will be connected via unencrypted HTTP, therefore it will be refused to be loaded in this page, and it may take up to half minutes for server to wake up.</p>
            <p>Please open in new window and wait a moment.</p>
        `,
        summary: 'A Pinterest like gallery.'
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