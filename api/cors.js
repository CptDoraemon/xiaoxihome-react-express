
const weatherQueryWhitelist = ['http://localhost:3000', 'https://cptdoraemon.github.io', 'https://www.xiaoxihome.com'];
const weatherQueryCors = (req, res, next) => {
    if (weatherQueryWhitelist.indexOf(req.header('Origin')) !== -1) {
        next();
    } else {
        denyAccess(res)
    }
};

const xiaoxihomeWhitelist = ['https://www.xiaoxihome.com', 'https://xiaoxihome.com', 'http://www.xiaoxihome.com', 'http://xiaoxihome.com'];
const xiaoxihomeCors = (req, res, next) => {
    if (xiaoxihomeWhitelist.indexOf(req.header('Origin')) !== -1) {
        next();
    } else {
        denyAccess(res)
    }
};

function denyAccess(res) {
    res.status(403);
    res.json({
        status: 'fail',
        data: 'Access denied'
    })
}

module.exports = {
    weatherQueryCors: weatherQueryCors,
    xiaoxihomeCors: xiaoxihomeCors
};