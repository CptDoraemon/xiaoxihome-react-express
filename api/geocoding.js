const bodyParser = require('body-parser');
const https = require('https');

module.exports = {
    reverseGeoCoding: reverseGeoCoding
};

//TODO api protection

function reverseGeoCoding(app) {
    app.post('/api/reversegeocoding/', bodyParser.json(), (req, res) => {
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;
        const locationIqAPI = `https://us1.locationiq.com/v1/reverse.php?key=${process.env.GEOCODING_SECRET_KEY}&lat=${latitude}&lon=${longitude}&format=json`;

        https.get(locationIqAPI, (locationIqAPIRes) => {
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