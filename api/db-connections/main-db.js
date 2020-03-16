require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const mongoose = require ("mongoose");

function connectToMainDB() {
    return new Promise((resolve, reject) => {
        client.connect(err => {
            if (err) {
                reject(err)
            }
            const db = client.db();
            resolve({
                currentNewsCollection: db.collection("currentNews"),
                newsCollection: db.collection("news"),
            })
        });
    })
}

function connectToMainDBMongoose() {
    return new Promise((resolve, reject) => {
        mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .catch((e) => {
                console.log('main db mongoose connection error', e);
                reject(e);
            });

        const db = mongoose.connection;
        db.on('error', (err) => {
            console.log('main db mongoose connection error', err);
            reject(err);
        });
        db.once('open', () => {
            resolve();
        })
    })
}

module.exports = {
    connectToMainDB,
    connectToMainDBMongoose
};