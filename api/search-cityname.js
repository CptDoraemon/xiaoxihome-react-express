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
        const queryString = `
                SELECT city, province, country, longitude, latitude
                FROM (
                  SELECT *, regexp_match(city, '(.*)(${cityName}).*', 'i') AS matched
                  FROM cityname
                ) sub
                WHERE matched IS NOT NULL
                ORDER BY length(matched[1]) ASC, city ASC
                LIMIT 5;
            `;
        cityNameDB.query(queryString, (err, queryRes) => {
            if (err) {
                console.log(err);
                res.json({
                    status: 'failed',
                })
            }
            res.json({
                status: 'success',
                rows: queryRes.rows
            })
        });
        // client.end();
    })
}