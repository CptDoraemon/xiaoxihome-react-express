const bodyParser = require('body-parser');
const https = require('https');

module.exports = {
    ipGeolocation: ipGeolocation
};

//TODO api protection

const cors = require('cors');
const corsOptions = {
    origin: ['https://cptdoraemon.github.io'],
    maxAge: 31536000,
    methods: 'POST'
};

function ipGeolocation(app) {
    app.options('/api/ipGeolocation/', cors(corsOptions));

    app.get('/api/ipGeolocation/', (req, res) => {
        const ip = req.ip;
        const ipAPI = `https://api.ipdata.co/${ip}?api-key=${process.env.IP_SECRET_KEY}`;

        https.get(ipAPI, (ipAPIRes) => {
            console.log(ipAPIRes.statusCode);
            // error returned from locationIQ
            if (ipAPIRes.statusCode !== 200) {
                res.json({
                    status: 'fail',
                    data: 'IP API is not available at the moment'
                });
                return
            }
            //
            let body = '';
            ipAPIRes.on('data', (data) => {
                body += data
            });
            ipAPIRes.on('end', () => {
                body = JSON.parse(body);
                const latitude = body.latitude;
                const longitude = body.longitude;
                res.json({
                    status: 'success',
                    data: {
                        latitude: latitude,
                        longitude: longitude
                    }
                })
            });
        })
            .on('error', (e) => {
                console.log(e);
                res.json({
                    status: 'fail',
                    data: 'IP API is not available at the moment'
                })
            })
    })
}