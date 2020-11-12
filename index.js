const express = require('express');
const app = express();
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

const connectToDBs = require('./api/db-connections/connect-to-dbs').connectToDBs;
const weatherAPI = require('./api/weather').weather;
const reverseGeoCodingAPI = require('./api/geocoding').reverseGeoCoding;
const searchCityName = require('./api/search-cityname').searchCityName;
const xiaoxihomeGetCoverImage = require('./api/xiaoxihome/get-cover-image');
const xiaoxihomeFeedback = require('./api/xiaoxihome/xiaoxihome-feedback');
const xiaoxihomeAboutpageData = require('./api/xiaoxihome/aboutpage/xiaoxihome-aboutpage-data');
const getNewsGraphQL = require('./api/news/scheme');
const searchNews = require('./api/news/search-news/search-news');
const newsAnalytics = require('./api/news/news-analytics');
const v2exAPI = require('./api/v2ex/v2ex');
const webHooks = require('./api/web-hooks/web-hooks');

if (process.env.PORT) {
    app.use((req, res, next) => {
        if (req.header('X-Forwarded-Proto') === 'https') {
            next();
        } else res.redirect('https://' + req.hostname + req.url);
    });
}
app.use(helmet());
app.use(compression());
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

(async () => {
    try {
        const {
            cityNameDB,
            currentNewsCollection,
            newsCollection
        } = await connectToDBs();

        searchCityName(app, cityNameDB);
        weatherAPI(app);
        reverseGeoCodingAPI(app);
        app.use('/contact/submit', xiaoxihomeFeedback);
        xiaoxihomeAboutpageData(app);
        xiaoxihomeGetCoverImage(app);
        getNewsGraphQL(app, currentNewsCollection);
        searchNews(app, newsCollection);
        newsAnalytics(app, newsCollection);
        app.use('/api/v2ex', v2exAPI);
        app.use('/api/web-hooks', webHooks);

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname+'/client/build/index.html'));
        });

    } catch (e) {
        console.log(e)
    }
})();


const port = process.env.PORT || 5000;
app.listen(port);
