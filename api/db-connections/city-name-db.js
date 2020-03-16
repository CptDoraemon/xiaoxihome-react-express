require('dotenv').config();
const { Client } = require('pg');


async function connectToCityNameDB() {
    try {
        const cityNameDB = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: true,
        });
        await cityNameDB.connect();

        return cityNameDB;
    } catch (e) {
        throw (e)
    }
}

module.exports = {
    connectToCityNameDB
};