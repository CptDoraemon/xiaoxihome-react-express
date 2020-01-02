const express = require('express');
const app = express();
const path = require('path');
const helmet = require('helmet');
require('dotenv').config();

const weatherAPI = require('./api/weather').weather;
const reverseGeoCodingAPI = require('./api/geocoding').reverseGeoCoding;
const searchCityName = require('./api/search-cityname').searchCityName;
const xiaoxihomeFeedback = require('./api/xiaoxihome/xiaoxihome-feedback');
const xiaoxihomeAboutpageData = require('./api/xiaoxihome/aboutpage/xiaoxihome-aboutpage-data');
const getNewsGraphQL = require('./api/news/scheme');



if( process.env.PORT ) {
    app.use((req, res, next) => {
        if (req.header('X-Forwarded-Proto') === 'https') {
            next();
        } else res.redirect('https://' + req.hostname + req.url);
    });
}
app.use(helmet());
app.use(express.static(path.join(__dirname, 'client/build')));



// ROUTERS
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


searchCityName(app);
weatherAPI(app);
reverseGeoCodingAPI(app);
xiaoxihomeFeedback(app);
xiaoxihomeAboutpageData(app);
getNewsGraphQL(app);


app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


const port = process.env.PORT || 5000;
app.listen(port);
