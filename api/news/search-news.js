const cors = require('cors');
const corsOptions = {
    origin: '*',
    maxAge: 31536000,
    methods: 'POST'
};
// DB related
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;
const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// DB related ends

function searchNews(app) {

    client.connect(err => {
       if (err) console.log(err);
    });

    app.get('/api/search-news', cors(corsOptions), async (req, res) => {
        try {
            // var keyword
            const keyword = req.query.keyword;
            if (!keyword) {
                res.json({
                    status: 'error',
                    message: 'keyword required'
                });
                return
            }

            // var skip
            const skip = parseInt(req.query.skip || '0');
            if (isNaN(skip)) {
                res.json({
                    status: 'error',
                    message: 'skip parameter needs to be a non-negative integer'
                });
                return
            }

            const docs = await searchNewsInDB(`${keyword}`, skip);
            const docsCount = docs.length;
            res.json({
                status: 'ok',
                resultsFound: docsCount,
                data: docs
            })
        } catch (e) {
            console.log(e);
            res.json({
                status: 'error',
                message: 'unknown error'
            });
        }
    })
}

function searchNewsInDB(keyword, skipper) {
    return new Promise((resolve, reject) => {
        const collection = client.db().collection("news");
        collection.find({ $text: { $search : keyword } })
            .project({score: {$meta: 'textScore'}})
            .sort({ score: {$meta: 'textScore'}, _id: -1 })
            .skip(skipper)
            .limit(20)
            .toArray((err, docs) => {
                // client.close();
                if (err) reject(err);
                resolve(docs)
            });
    });
}

module.exports = searchNews;