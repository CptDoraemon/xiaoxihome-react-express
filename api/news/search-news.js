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

// Analytics imports
const getEarliestDocumentDate = require('./search-news-analytics').getEarliestDocumentDate;
const getKeywordFrequencyByWeek = require('./search-news-analytics').getKeywordFrequencyByWeek;
// Analytics imports end

function searchNews(app) {

    client.connect(err => {
       if (err) console.log(err);
    });
    const collection = client.db().collection("news");

    app.get('/api/search-news', cors(corsOptions), async (req, res) => {
        try {
            // param keyword
            const keyword = req.query.keyword;
            if (!keyword) {
                res.json({
                    status: 'error',
                    message: 'keyword required'
                });
                return
            }

            // param skip
            const skip = parseInt(req.query.skip || '0');
            if (isNaN(skip)) {
                res.json({
                    status: 'error',
                    message: 'skip parameter needs to be a non-negative integer'
                });
                return
            }

            // param frequency
            const isFrequency = req.query.frequency;

            const docs = await searchNewsInDB(`${keyword}`, skip, collection);
            const totalCount = await getKeywordSearchTotalCount(`${keyword}`, collection);
            const baseResponse = {
                status: 'ok',
                totalCount,
                data: docs
            };

            // Response with frequency
            if (isFrequency) {
                const keywordFrequencyByWeek = await getKeywordFrequencyByWeek(`${keyword}`, collection);
                const earliestDocumentDate = await getEarliestDocumentDate(collection);
                baseResponse.frequency = {
                    timeOrigin: earliestDocumentDate,
                    data: keywordFrequencyByWeek
                };
            }

            // Base response
            res.json(baseResponse)

        } catch (e) {
            console.log(e);
            res.json({
                status: 'error',
                message: 'unknown error'
            });
        }
    })
}

function getKeywordSearchTotalCount(keyword, collection) {
    return new Promise((resolve, reject) => {
        collection.countDocuments({ $text: { $search : keyword } }, null, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

function searchNewsInDB(keyword, skipper, collection) {
    return new Promise((resolve, reject) => {
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