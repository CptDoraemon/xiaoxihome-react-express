const bodyParser = require('body-parser');

module.exports = {
    searchCityName: searchCityName
};

function searchCityName(app, cityNameDB) {
    app.get('/api/searchCityName/', bodyParser.urlencoded({extended: false}), (req, res) => {
        const cityName = req.query.cityName;
        if (cityName === undefined) {
            res.json({
                status: 'failed'
            });
            return;
        }
        //
        cityNameDB.query(`SELECT * FROM cityname WHERE city ~* '.*${cityName}.*'`, (err, res) => {
            if (err) {
                console.log(err);
                res.json({
                    status: 'failed',
                })
            }
            if (res.rows.length === 0) {
                res.json({
                    status: 'failed',
                })
            } else {
                res.json({
                    status: 'success',
                    rows: res.rows
                })
            }
        });
        // client.end();
    })
}