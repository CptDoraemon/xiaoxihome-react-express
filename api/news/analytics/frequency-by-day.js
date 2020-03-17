const getDocumentDate = require('./reusables/get-earliest-and-latest-document-date').getDocumentDate;
const getDailyBin = require('./reusables/get-daily-bin').getDailyBin;

function getFrequencyBin(collection) {
    return new Promise(async (resolve, reject) => {
        try {
            const earliestDocumentDate = await getDocumentDate('earliest', collection);
            const latestDocumentDate = await getDocumentDate('latest', collection);

            resolve(getDailyBin(earliestDocumentDate, latestDocumentDate))
        } catch (e) {
            reject(e)
        }
    })
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

async function getFrequency(keyword, collection, bin) {
    try {
        const rawFrequency = await getKeywordFrequencyByDay(keyword, collection);
        return matchFrequencyToBin(bin, rawFrequency)
    } catch (e) {
        throw(e)
    }
}

async function getFrequencyAnalytics(keyword, collection) {
    try {
        const bin = await getFrequencyBin(collection);
        const frequency = await getFrequency(keyword, collection, bin);

        return {
            bin,
            frequency
        }
    } catch (e) {
        throw(e)
    }
}

module.exports = {
    getFrequencyAnalytics,
};