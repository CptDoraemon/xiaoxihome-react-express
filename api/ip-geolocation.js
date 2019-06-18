const bodyParser = require('body-parser');
const https = require('https');

module.exports = {
    ipGeolocation: ipGeolocation
};

//TODO api protection

const cors = require('cors');
const corsOptions = {
    origin: ['https://cptdoraemon.github.io', 'http://localhost:3000'],
};

function ipGeolocation(app) {
    app.get('/api/ipGeolocation/', cors(corsOptions), (req, res) => {
        const ip = req.headers['x-forwarded-for'] || req.ip;
        //const ip = req.ip.indexOf('::ffff:') !== -1 ? req.ip.slice(7) : req.ip;
        console.log(ip);
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
                        longitude: longitude,
                        ip: ip
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