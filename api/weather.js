const bodyParser = require('body-parser');
const https = require('https');

module.exports = {
    weather: weather
};

//TODO api protection

function weather(app) {
    app.post('/api/weather/', bodyParser.json(), (req, res) => {
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;
        const darkSkyAPI = `https://api.darksky.net/forecast/${process.env.WEATHER_SECRET_KEY}/${latitude},${longitude}`;

        https.get(darkSkyAPI, (darkSkyAPIRes) => {
            let body = '';
            darkSkyAPIRes.on('data', (data) => {
                body += data
            });
            darkSkyAPIRes.on('end', () => {
                body = JSON.parse(body);
                res.json({
                    status: 'success',
                    data: body
                })
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