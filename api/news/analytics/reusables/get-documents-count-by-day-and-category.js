let cache = null;

function getDocumentsCountByDayAndCategory(newsCollection) {
    return new Promise((resolve, reject) => {
        if (cache) {
            resolve(cache);
            return
        }

        newsCollection.aggregate([
            { $group: {
                    _id: {
                        year: {$year: '$_id'},
                        dayOfYear: {$dayOfYear: '$_id'},
                        category: "$category",
                    },
                    count: {
                        $sum: 1
                    }
                }
            },
            { $project: {
                    _id: 0,
                    year: "$_id.year",
                    dayOfYear: "$_id.dayOfYear",
                    category: "$_id.category",
                    count: 1,
                }
            }
        ]).toArray((err, doc) => {
            if (err) {
                reject(err);
            } else {
                cache = doc;
                resolve(cache);
            }
        })
    })
}

module.exports = {
    getDocumentsCountByDayAndCategory
};