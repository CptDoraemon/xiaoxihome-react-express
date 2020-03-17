const getUTCDayOfYear = require('./get-utc-day-of-year').getUTCDayOfYear;

const DAY = 1000 * 60 * 60 * 24; // a day in ms
let DAILY_BIN = null;

function getDailyBin(earliest, latest) {
    if (DAILY_BIN) return DAILY_BIN;

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

    bin.push(earliest);
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

module.exports = {
    getDailyBin
};