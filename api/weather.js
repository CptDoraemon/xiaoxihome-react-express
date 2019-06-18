const bodyParser = require('body-parser');
const https = require('https');

module.exports = {
    weather: weather
};

//TODO api protection

const cors = require('cors');
const whitelist = ['https://cptdoraemon.github.io/weather/'];
const corsOptions = {
    origin: (origin, callback) => {
        whitelist.indexOf(origin) !== -1 ? callback(null, true) : callback(new Error('Not allowed by CORS'))
    },
    maxAge: 31536000
};

function weather(app) {
    app.options('/api/weather/', cors(corsOptions));

    app.post('/api/weather/', cors(corsOptions), bodyParser.json(), (req, res) => {
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;
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