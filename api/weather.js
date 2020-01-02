require('dotenv').config();
const bodyParser = require('body-parser');
const https = require('https');

module.exports = {
    weather: weather
};

//TODO api protection

const cors = require('cors');
const corsOptions = {
    // origin: ['https://cptdoraemon.github.io', 'http://localhost:3000'],
    origin: '*',
    maxAge: 31536000,
    methods: 'POST'
};

function weather(app) {
    app.options('/api/weather/', cors(corsOptions));

    app.post('/api/weather/', cors(corsOptions), bodyParser.json(), (req, res) => {
        let latitude = req.body.latitude;
        let longitude = req.body.longitude;
        if (typeof latitude === 'string') latitude = parseFloat(latitude);
        if (typeof longitude === 'string') longitude = parseFloat(longitude);
        const darkSkyAPI = `https://api.darksky.net/forecast/${process.env.WEATHER_SECRET_KEY}/${latitude},${longitude}`;
        console.log('darkSkyAPI', latitude, longitude);

        https.get(darkSkyAPI, (darkSkyAPIRes) => {
            let body = '';
            darkSkyAPIRes.on('data', (data) => {
                body += data
            });
            darkSkyAPIRes.on('end', () => {
                body = JSON.parse(body);
                if (body.error !== undefined) {
                    // error returned from darkSkyAPI
                    res.json({
                        status: 'fail',
                        data: 'DarkSky API is not available at the moment'
                    })
                } else {
                    res.json({
                        status: 'success',
                        data: body
                    })
                }
            });
        })
            .on('error', (e) => {
            console.log(e);
                res.json({
                    status: 'fail',
                    data: 'DarkSky API is not available at the moment'
                })
        })
    })
}