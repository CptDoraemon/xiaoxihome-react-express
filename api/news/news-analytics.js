const cors = require('cors');
const corsOptions = {
    // origin: ['https://cptdoraemon.github.io', 'http://localhost:3000'],
    origin: '*',
    maxAge: 31536000,
    methods: 'POST'
};

async function newsAnalytics(app, newsCollection) {
    try {
        const newsAnalytics = await getNewsAnalytics(newsCollection);

        app.get('/api/news-analytics', cors(corsOptions), (res, req) => {

        })
    } catch (e) {
        throw (e)
    }
}

async function getNewsAnalytics(newsCollection) {
    try {
        const summaryStatistics = await getSummaryStatistics(newsCollection);

        return {
            summaryStatistics
        }
    } catch (e) {
        throw (e)
    }
}

function getSummaryStatistics(newsCollection) {
    return new Promise((resolve, reject) => {

    })
}

module.exports = {
    newsAnalytics
};