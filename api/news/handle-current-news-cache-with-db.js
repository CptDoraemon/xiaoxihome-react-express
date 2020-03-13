// Collection 'currentNews'
// Reset collection
// Save the current cache to collection

// DB related
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;
const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// DB related ends

function connectToDB() {
    return new Promise((resolve, reject) => {
        client.connect(err => {
            if (err) {
                reject(err)
            }
            resolve(client.db().collection("currentNews"))
        });
    })
}

async function saveNewsCacheToDB(cache) {
    try {
        const collection = await connectToDB();
        await collection.deleteMany({});
        await collection.insertOne(cache);

        console.log('Current news cache saved to DB');
        await client.close();
    } catch (e) {
        console.log('Error occurred when saving current news cache to DB', e);
    }
}

async function getNewsCacheFromDB() {
    try {
        const collection = await connectToDB();
        const cache = await collection.findOne({}, {projection: {_id: 0}});

        console.log('Current news cache retrieved from DB');
        client.close();
        return cache
    } catch (e) {
        console.log('Error occurred when retrieving current news cache from DB', e);
    }
}

module.exports = {
    saveNewsCacheToDB,
    getNewsCacheFromDB
};