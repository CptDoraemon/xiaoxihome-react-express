const webAppProjectData = [
    {
        title: 'Reddit-like Website',
        link: 'https://riddet.xiaoxihome.com',
        description:
            '<p>This is a Reddit like discussion website.</p>' +
            '<p>Please open in new window and allow up to half minute for server to wake up.</p>',
        summary: 'A Redit like discussion website.',
    },
    {
        title: 'Youtube Downloader',
        link: 'https://cptdoraemon.github.io/youtube-downloader/',
        description:
            '<p>An app to download mp3 from Youtube playlist</p>' +
            '<p>For legal reasons only the frontend is hosted</p>' +
            '<p>https://github.com/CptDoraemon/youtube-downloader</p>',
        summary: 'An app to download youtube videos.',
    },
    {
        title: 'Weather App',
        link: 'https://cptdoraemon.github.io/weather/',
        description:
            `
                <p>A Google like weather app</p>
                <p>Weather API is provided by DarkSky</p>
                <p>Reverse geocoding API is provided by LocationIQ</p>
                <p>A mobile version written with Dart/Flutter is also available at <a href="https://github.com/CptDoraemon/weather-app-flutter" target="_blank" rel='noopener noreferrer'>HERE</a>. To lookup cities, a PostgreSQL database is attached to this version instead of using third party API.</p>
            `,
        summary: 'A app for currently, hourly and daily weather forecasts.'
    },
    {
        title: 'Masonry Gallery',
        link: 'http://gallery.xiaoxihome.com',
        description:
        '<p>A Pinterest like gallery</p>' +
        '<p>Please open in new window and allow up to half minutes for server to wake up</p>',
        summary: 'A Pinterest like gallery.'
    },
    {
        title: 'Miscellany',
        link: false,
        description:
            `
                <p><a href="https://github.com/CptDoraemon/tetris" target="_blank" rel='noopener noreferrer'>Tetris</a>: You know what's Tetris.</p>
                <p><a href="https://xiaoxihome.s3.us-east-2.amazonaws.com/webprojects/snake_beta.html" target="_blank" rel='noopener noreferrer'>Snakey</a>: You know what's Snakey.</p>
                <p><a href="https://cptdoraemon.github.io/firework/" target="_blank" rel='noopener noreferrer'>Firework animation</a>: Inspired by <a href="http://www.playfuljs.com/physics-for-the-lazy/" target="_blank" rel='noopener noreferrer'>PlayfulJS</a>. The fireworks are affected by gravity and air friction (which is linear to the squared velocity). A floor in Green value ensures the fireworks have bright colors.</p>
                <p><a href="https://github.com/CptDoraemon/oneplus7pro" target="_blank" rel='noopener noreferrer'>OnePlus 7 pro advertisement page</a>: Wanted to try some cool animations.</p>
                <p><a href="https://s3.us-east-2.amazonaws.com/xiaoxihome/webprojects/BandWebsite/index.html" target="_blank" rel='noopener noreferrer'>DOM practise</a>: This is the practice project in the book DOM Scripting: Web Design with JavaScript and the Document Object Model by Jeremy Keith, I followed the book step by step.</p>
            `,
        summary: 'A collection of smaller web projects.'
    },
    {
        title: 'RaycasterJS',
        link: 'https://raycaster.xiaoxihome.com',
        description:
            '<p>Raycaster was a very popular game engine in the 80s and 90s, the computer was not powerful enough to handle real time 3D rendering, but players were getting tired of 2D games and wanted to see something new.</p>' +
            '<p>Raycaster is able to give audience a 3D feeling only by doing geometry calculation and drawing vertical lines on the screen.</p>' +
            '<p>The most famous game using this engine must be Wolfenstein 3D.</p>' +
            '<p>Please Open in new tab and allow up to half minute for server to wake up.</p>',
        summary: 'A FPS game built with Raycaster algorithm.'
    }
];

export default webAppProjectData;