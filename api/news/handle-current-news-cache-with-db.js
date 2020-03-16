// Collection 'currentNews'
// Reset collection
// Save the current cache to collection

async function saveNewsCacheToDB(cache, currentNewsCollection) {
    try {
        await currentNewsCollection.deleteMany({});
        await currentNewsCollection.insertOne(cache);

        console.log('Current news cache saved to DB');
    } catch (e) {
        console.log('Error occurred when saving current news cache to DB', e);
    }
}

async function getNewsCacheFromDB(currentNewsCollection) {
    try {
        const cache = await currentNewsCollection.findOne({}, {projection: {_id: 0}});

        console.log('Current news cache retrieved from DB');
        return cache
    } catch (e) {
        console.log('Error occurred when retrieving current news cache from DB', e);
    }
}

module.exports = {
    saveNewsCacheToDB,
    getNewsCacheFromDB
};