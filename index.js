const express = require('express');
const app = express();
const path = require('path');
const helmet = require('helmet');
require('dotenv').config();

const connectToDBs = require('./api/db-connections/connect-to-dbs').connectToDBs;
const weatherAPI = require('./api/weather').weather;
const reverseGeoCodingAPI = require('./api/geocoding').reverseGeoCoding;
const searchCityName = require('./api/search-cityname').searchCityName;
const xiaoxihomeFeedback = require('./api/xiaoxihome/xiaoxihome-feedback');
const xiaoxihomeAboutpageData = require('./api/xiaoxihome/aboutpage/xiaoxihome-aboutpage-data');
const getNewsGraphQL = require('./api/news/scheme');
const searchNews = require('./api/news/search-news/search-news');
const newsAnalytics = require('./api/news/news-analytics');



if (process.env.PORT) {
    app.use((req, res, next) => {
        if (req.header('X-Forwarded-Proto') === 'https') {
            next();
        } else res.redirect('https://' + req.hostname + req.url);
    });
}
app.use(helmet());
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
        xiaoxihomeFeedback(app);
        xiaoxihomeAboutpageData(app);
        getNewsGraphQL(app, currentNewsCollection);
        searchNews(app, newsCollection);
        newsAnalytics(app, newsCollection);

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname+'/client/build/index.html'));
        });

    } catch (e) {
        console.log(e)
    }
})();


const port = process.env.PORT || 5000;
app.listen(port);
