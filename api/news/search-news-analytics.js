const ObjectID = require('mongodb').ObjectID;
let EARLIEST_DOCUMENT_DATE = null;

function getEarliestDocumentDate(collection) {
    return new Promise((resolve, reject) => {
        if (EARLIEST_DOCUMENT_DATE) {
            resolve(EARLIEST_DOCUMENT_DATE)
        }

        collection.aggregate([
            {$sort: {_id: 1}},
            {$limit: 1},
            {$addFields: {
                week: {$week: "$_id"},
                year: {$year: "$_id"},
                }}
        ])
            .toArray((err, result) => {
                if (err) reject(err);
                const doc = result[0];
                const time = ObjectID(doc._id).getTimestamp();
                EARLIEST_DOCUMENT_DATE = {
                    ms: new Date(time).getTime(),
                    week: doc.week,
                    year: doc.year
                };
                resolve(EARLIEST_DOCUMENT_DATE);
            })
    })
}

function getKeywordFrequencyByWeek(keyword, collection) {
    const pipeline = [
        { $match: { $text: { $search : keyword } } },
        { $group: {
                _id: {
                    year: {$year: "$_id"},
                    week: {$week: "$_id"}
                },
                count: {
                    $sum: 1
                }
            }
        },
        { $project: {
                _id: 0,
                time: "$_id",
                count: 1,
            }
        }
    ];

    return new Promise((resolve, reject) => {
        collection.aggregate(pipeline)
            .toArray((err, result) => {
                if (err) reject(err);
                resolve(result)
            })
    })
}

module.exports = {
    getEarliestDocumentDate,
    getKeywordFrequencyByWeek
};