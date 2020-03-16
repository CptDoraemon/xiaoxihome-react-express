const cors = require('cors');
const corsOptions = {
    origin: '*',
    maxAge: 31536000,
    methods: 'POST'
};
// validators
const validateKeyword = require('./query-validation').validateKeyword;
const validateSkip = require('./query-validation').validateSkip;
const validateDate = require('./query-validation').validateDate;
const validateSort = require('./query-validation').validateSort;
const sortTypes = require('./query-validation').sortTypes;
// DB related
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;
const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// DB related ends

// Analytics imports
const getFrequencyAnalytics = require('../analytics/frequency-by-day').getFrequencyAnalytics;
const getUTCDayOfYear = require('../analytics/frequency-by-day').getUTCDayOfYear;
// Analytics imports end

function searchNews(app) {

    client.connect(err => {
       if (err) console.log(err);
    });
    const collection = client.db().collection("news");

    app.get('/api/search-news', cors(corsOptions), async (req, res) => {
        try {
            let isError = false;
            const setIsError = () => isError = true;

            const keyword = validateKeyword(req.query.keyword, res, setIsError);
            const sort = validateSort(req.query.sort, res, setIsError);
            const skip = validateSkip(req.query.skip, res, setIsError);
            const isFrequency = req.query.frequency;
            const date = validateDate(req.query.date, res, setIsError);

            if (isError) return;

            const docs = await searchNewsInDB(collection,`${keyword}`, sort, skip, date);
            const totalCount = await getKeywordSearchTotalCount(collection, `${keyword}`, date);
            const baseResponse = {
                status: 'ok',
                totalCount,
                data: docs
            };

            // Response with frequency
            if (isFrequency) {
                const frequencyAnalytics = await getFrequencyAnalytics(keyword, collection);
                baseResponse.frequency = Object.assign({}, frequencyAnalytics);
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

function getFindArg(keyword, date) {
    let findArg = {$text: { $search : keyword }};
    if (date !== -1) {
        const dateObj = new Date(date);
        const beginningOfDay = Date.UTC(dateObj.getUTCFullYear(), dateObj.getUTCMonth(), dateObj.getUTCDate());
        const endOfDay = beginningOfDay + 1000 * 60 * 60 * 24 - 1;
        const idMin = ObjectID(Math.floor((new Date(beginningOfDay))/1000).toString(16) + "0000000000000000");
        const idMax = ObjectID(Math.floor((new Date(endOfDay))/1000).toString(16) + "0000000000000000");

        findArg = {
            $text: { $search : keyword },
            _id: {$gt: idMin, $lt: idMax}
        }
    }

    return findArg
}

function getKeywordSearchTotalCount(collection, keyword, date) {
    const findArg = getFindArg(keyword, date);
    return new Promise((resolve, reject) => {
        collection.countDocuments(findArg, null, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

function searchNewsInDB(collection, keyword, sortBy, skipper, date) {
    const sortArg = sortBy === sortTypes.relevance ?
        { score: {$meta: 'textScore'}, _id: -1 } :
        { _id: -1, score: {$meta: 'textScore'} };

    const findArg = getFindArg(keyword, date);

    return new Promise((resolve, reject) => {
        collection
            .find(findArg)
            .project({score: {$meta: 'textScore'}})
            .sort(sortArg)
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