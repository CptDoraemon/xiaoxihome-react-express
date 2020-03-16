const connectToCityNameDB = require('./city-name-db').connectToCityNameDB;
const connectToMainDB = require('./main-db').connectToMainDB;
const connectToMainDBMongoose = require('./main-db').connectToMainDBMongoose;

async function connectToDBs() {
    try {
        const cityNameDB = await connectToCityNameDB();
        await connectToMainDBMongoose();
        const {
            currentNewsCollection,
            newsCollection
        } = await connectToMainDB();


        return {
            cityNameDB,
            currentNewsCollection,
            newsCollection
        }

    } catch (e) {
        console.log(e);
        throw(e);
    }
}

module.exports = {
    connectToDBs
};