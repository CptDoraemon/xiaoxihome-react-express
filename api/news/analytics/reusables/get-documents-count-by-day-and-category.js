const getISOStringFromDayOfYear = require('./get-iso-string-from-day-of-year');

let cache = null;
const categoryOrder = ['headline', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];


/*
*  type doc = {
*       count: number,
*       year: number,
*       dayOfYear: number,
*       category: string
*   }[]
* */
// returns {
//     documentCount: number[][], // documents count each day grouped by category in the order specified by categoryOrder
//     series: string[], // array of ISO dat string
//     category: string[] // copy of categoryOrder
// }
function processDoc(doc) {
    let lastDay = -1;
    const documentCount = [];
    let currentDayDocumentCount = null;
    const series = [];
    const category = categoryOrder.slice();

    for (let i=0; i<doc.length; i++) {
        const obj = doc[i];
        if (obj.dayOfYear !== lastDay) {
            lastDay = obj.dayOfYear;
            if (currentDayDocumentCount) {
                documentCount.push(currentDayDocumentCount.slice());
            }
            currentDayDocumentCount = (new Array(categoryOrder.length)).fill(0);
            series.push(getISOStringFromDayOfYear(obj.year, obj.dayOfYear));
        }
        const index = categoryOrder.indexOf(obj.category);
        currentDayDocumentCount[index] = obj.count;
    }
    documentCount.push(currentDayDocumentCount.slice());

    return {
        documentCount,
        series,
        category
    }
}

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
            },
            {
                $sort: {
                    year: 1,
                    dayOfYear: 1,
                    category: 1
                }
            }
        ]).toArray((err, doc) => {
            if (err) {
                reject(err);
            } else {
                cache = processDoc(doc);
                console.log(cache, Object.values(cache).map(_=>_.length));
                resolve(cache);
            }
        })
    })
}

module.exports = {
    getDocumentsCountByDayAndCategory
};