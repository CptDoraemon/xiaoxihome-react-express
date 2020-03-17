const getUTCDayOfYear = require('./get-utc-day-of-year').getUTCDayOfYear;
const getDocumentDate = require('./get-earliest-and-latest-document-date').getDocumentDate;

const DAY = 1000 * 60 * 60 * 24; // a day in ms
let DAILY_BIN = null;

function getDailyBinInRange(start, end) {
    if (DAILY_BIN) return DAILY_BIN;

    const bin = [];
    let point = end;
    //
    const startedAt = Date.now();
    const maximumAllowedTime = 5000;

    while (point > start) {
        // end if infinite loop
        const now = Date.now();
        if (now - startedAt > maximumAllowedTime) break;

        bin.push(point);
        point -= DAY;
    }

    bin.push(start);
    bin.reverse();
    // date from earliest to latest now

    bin.forEach((ms, i, array) => {
        const date = new Date(ms);
        const year = date.getFullYear();
        const dayOfYear = getUTCDayOfYear(date);
        array[i] = {
            year,
            dayOfYear,
            ms
        }
    });

    if (bin[0].dayOfYear === bin[1].dayOfYear) {
        bin.shift()
    }

    DAILY_BIN = bin;
    return bin
}

function getDailyBinFromEarliestToLatest(collection) {
    return new Promise(async (resolve, reject) => {
        try {
            const earliestDocumentDate = await getDocumentDate('earliest', collection);
            const latestDocumentDate = await getDocumentDate('latest', collection);

            resolve(getDailyBinInRange(earliestDocumentDate, latestDocumentDate))
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getDailyBinInRange,
    getDailyBinFromEarliestToLatest
};