require('dotenv').config();
const bodyParser = require('body-parser');
const https = require('https');

const API_KEY_COMPONENT = `&apiKey=${process.env.NEWS_API_KEY}`;
const BASE_URL = `https://newsapi.org/v2/top-headlines?country=ca`;
const CATEGORY_BASE = `&category=`;

const HEAD_LINE_URL = BASE_URL + API_KEY_COMPONENT;
const CATEGORIES = [`business`, `entertainment`, `health`, `science`, `sports`, `technology`];
const CATEGORIES_URLS = CATEGORIES.map(_ => BASE_URL + CATEGORY_BASE + _ + API_KEY_COMPONENT);

let CACHE = {};
const getCache = () => CACHE;
let LAST_UPDATE_AT;
let SCHEDULED_UPDATE_TIMER;
const UPDATE_INTERVAL = 60 * 60 * 1000; // 60 minutes
const CATEGORY_REQUEST_INTERVAL = 10 * 1000; // 10 seconds

function getNews(url, cacheKey, isLast) {
    https.get(url, (res) => {
        let body = '';
        res.on('data', (data) => {
            body += data
        });
        res.on('end', () => {
            body = JSON.parse(body);
            if (body.status === 'ok') {
                CACHE = Object.assign({}, CACHE, { [cacheKey]: body } );
                console.log(`${cacheKey} news last updated at: `, Date.now());
                console.log(CACHE);
                if (isLast)  {
                    LAST_UPDATE_AT = Date.now();
                    console.log('All news last updated at: ', LAST_UPDATE_AT);
                }
            }
        });
    })
        .on('error', (e) => {
            console.log(e);
        })
}

function getAllNews() {
    let i = 0;
    const getNewsInQueue = () => {
        const isLast = i === CATEGORIES.length - 1;
        getNews(CATEGORIES_URLS[i], CATEGORIES[i], isLast);
        i++;
        if (!isLast) {
            setTimeout(getNewsInQueue, CATEGORY_REQUEST_INTERVAL);
        } else {
            SCHEDULED_UPDATE_TIMER = setTimeout(getAllNews, UPDATE_INTERVAL);
        }
    };

    getNews(HEAD_LINE_URL, 'headline');
    setTimeout(getNewsInQueue, CATEGORY_REQUEST_INTERVAL);
}

module.exports = {
    getAllNews: getAllNews,
    getCache: getCache
};