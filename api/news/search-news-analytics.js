const ObjectID = require('mongodb').ObjectID;
const WEEK = 1000 * 60 * 60 * 24 * 7; // a week in ms
let EARLIEST_DOCUMENT_DATE = null;
let LATEST_DOCUMENT_DATE = null;
let WEEKLY_BIN = null;

function getFrequencyLegends(collection) {
    return new Promise(async (resolve, reject) => {
        try {
            if (EARLIEST_DOCUMENT_DATE) {
                resolve(EARLIEST_DOCUMENT_DATE)
            }

            await setEarliestDocumentDate(collection);
            await setLatestDocumentDate(collection);

            WEEKLY_BIN = getWeeklyBin(EARLIEST_DOCUMENT_DATE, LATEST_DOCUMENT_DATE);

            resolve({
                earliest: EARLIEST_DOCUMENT_DATE,
                latest: LATEST_DOCUMENT_DATE,
                weeklyBin: WEEKLY_BIN
            })
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

function getWeeklyBin(earliest, latest) {
    const bin = [];
    let point = latest;
    //
    const startedAt = Date.now();
    const maximumAllowedTime = 5000;

    while (point > earliest) {
        // end if infinite loop
        const now = Date.now();
        if (now - startedAt > maximumAllowedTime) break;

        bin.push(point -= WEEK);
    }

    bin.pop();
    bin.push(earliest);
    bin.reverse();

    bin.forEach((ms, i, array) => {
        const date = new Date(ms);
        const year = date.getFullYear();
        const week = getWeekNumber(date);
        array[i] = {
            year,
            week,
            ms
        }
    });

    return bin
}

function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    return Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
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
                year: "$_id.year",
                week: "$_id.week",
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
            if (bin.year === frequency.year && bin.week === frequency.week) {
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

module.exports = {
    getFrequencyLegends,
    getKeywordFrequencyByWeek,
    matchFrequencyToBin
};