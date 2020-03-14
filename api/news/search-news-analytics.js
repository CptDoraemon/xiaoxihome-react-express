const ObjectID = require('mongodb').ObjectID;
const DAY = 1000 * 60 * 60 * 24; // a day in ms
let EARLIEST_DOCUMENT_DATE = null;
let LATEST_DOCUMENT_DATE = null;
let DAILY_BIN = null;

function getFrequencyBin(collection) {
    return new Promise(async (resolve, reject) => {
        try {
            // use cache if existed
            if (EARLIEST_DOCUMENT_DATE && LATEST_DOCUMENT_DATE && DAILY_BIN) {
                resolve(DAILY_BIN)
            }

            await setEarliestDocumentDate(collection);
            await setLatestDocumentDate(collection);

            DAILY_BIN = getDailyBin(EARLIEST_DOCUMENT_DATE, LATEST_DOCUMENT_DATE);

            resolve(DAILY_BIN)
        } catch (e) {
            reject(e)
        }
    })
}

function setEarliestDocumentDate(collection) {
    return new Promise((resolve, reject) => {
        collection.aggregate([
            {$sort: {_id: 1}},
            {$limit: 1}
        ])
            .toArray((err, result) => {
                if (err) reject(err);
                const doc = result[0];
                const time = ObjectID(doc._id).getTimestamp();
                EARLIEST_DOCUMENT_DATE = new Date(time).getTime();
                resolve(true);
            });
    })
}

function setLatestDocumentDate(collection) {
    return new Promise((resolve, reject) => {
        collection.aggregate([
            {$sort: {_id: -1}},
            {$limit: 1}
        ])
            .toArray((err, result) => {
                if (err) reject(err);
                const doc = result[0];
                const time = ObjectID(doc._id).getTimestamp();
                LATEST_DOCUMENT_DATE = new Date(time).getTime();
                resolve(true);
            });
    })
}

function getDailyBin(earliest, latest) {
    const bin = [];
    let point = latest;
    //
    const startedAt = Date.now();
    const maximumAllowedTime = 5000;

    while (point > earliest) {
        // end if infinite loop
        const now = Date.now();
        if (now - startedAt > maximumAllowedTime) break;

        bin.push(point);
        point -= DAY;
    }

    bin.push(point);
    bin.reverse();
    // date from earliest to latest now

    bin.forEach((ms, i, array) => {
        const date = new Date(ms);
        const year = date.getFullYear();
        const dayOfYear = getDayOfYear(date);
        array[i] = {
            year,
            dayOfYear,
            ms
        }
    });

    if (bin[0].dayOfYear === bin[1].dayOfYear) {
        bin.unshift()
    }

    return bin
}

function getDayOfYear(date){
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}

function getKeywordFrequencyByDay(keyword, collection) {
    const pipeline = [
        { $match: { $text: { $search : keyword } } },
        { $group: {
                _id: {
                    year: {$year: "$_id"},
                    dayOfYear: {$dayOfYear: "$_id"}
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
                count: 1,
            }
        }
    ];

    return new Promise((resolve, reject) => {
        collection.aggregate(pipeline)
            .toArray((err, result) => {
                if (err) reject(err);
                resolve(result);
            })
    })
}

function matchFrequencyToBin(binArray, frequencyArray) {
    const matched = [];
    binArray.forEach(bin => {
        let isFound = false;
        for (let i=0; i<frequencyArray.length; i++) {
            const frequency = frequencyArray[i];
            if (bin.year === frequency.year && bin.dayOfYear === frequency.dayOfYear) {
                matched.push(frequency.count);
                isFound = true;
                break;
            }
            if (i === frequencyArray.length - 1 && !isFound) {
                matched.push(0);
            }
        }
    });
    return matched
}

async function getFrequency(keyword, collection) {
    try {
        const bin = await getFrequencyBin(collection);
        const rawFrequency = await getKeywordFrequencyByDay(keyword, collection);
        return matchFrequencyToBin(bin, rawFrequency)
    } catch (e) {
        throw(e)
    }
}

async function getFrequencyAnalytics(keyword, collection) {
    try {
        const bin = await getFrequencyBin(collection);
        const frequency = await getFrequency(keyword, collection);

        return {
            bin,
            frequency
        }
    } catch (e) {
        throw(e)
    }
}

module.exports = {
    getFrequencyAnalytics
};