const bodyParser = require('body-parser');
const https = require('https');

module.exports = {
    reverseGeoCoding: reverseGeoCoding
};

//TODO api protection

const cors = require('cors');
const corsOptions = {
    // origin: ['https://cptdoraemon.github.io', 'http://localhost:3000'],
    origin: '*',
    maxAge: 31536000,
    methods: 'POST'
};

function reverseGeoCoding(app) {
    app.options('/api/reversegeocoding/', cors(corsOptions));

    app.post('/api/reversegeocoding/', cors(corsOptions), bodyParser.json(), (req, res) => {
        let latitude = req.body.latitude;
        let longitude = req.body.longitude;
        if (typeof latitude === 'string') latitude = parseFloat(latitude);
        if (typeof longitude === 'string') longitude = parseFloat(longitude);
        const locationIqAPI = `https://us1.locationiq.com/v1/reverse.php?key=${process.env.GEOCODING_SECRET_KEY}&lat=${latitude}&lon=${longitude}&format=json`;
        console.log('locationIqAPI', latitude, longitude);

        https.get(locationIqAPI, (locationIqAPIRes) => {
            // error returned from locationIQ
            if (locationIqAPIRes.statusCode !== 200) {
                res.json({
                    status: 'fail',
                    data: 'locationIq API is not available at the moment'
                });
                return
            }
            //
            let body = '';
            locationIqAPIRes.on('data', (data) => {
                body += data
            });
            locationIqAPIRes.on('end', () => {
                body = JSON.parse(body);
                const addressObj = body.address;
                const neighbourhood = addressObj.neighbourhood === undefined ? '' : addressObj.neighbourhood + ', ';
                const responseString = neighbourhood + addressObj.city + ', ' + addressObj.state + '.';
                res.json({
                    status: 'success',
                    data: responseString
                })
            });
        })
            .on('error', (e) => {
                console.log(e);
                res.json({
                    status: 'fail',
                    data: 'locationIq API is not available at the moment'
                })
            })
    })
}