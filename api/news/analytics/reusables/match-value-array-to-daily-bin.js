function matchValueArrayToDailyBin(binArray, valueArray) {
    const matched = [];
    binArray.forEach(bin => {
        let isFound = false;
        for (let i=0; i<valueArray.length; i++) {
            const frequency = valueArray[i];
            if (bin.year === frequency.year && bin.dayOfYear === frequency.dayOfYear) {
                matched.push(frequency.count);
                isFound = true;
                break;
            }
            if (i === valueArray.length - 1 && !isFound) {
                matched.push(0);
            }
        }
    });
    return matched
}

module.exports = {
    matchValueArrayToDailyBin
};