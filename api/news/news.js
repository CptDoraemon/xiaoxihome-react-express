require('dotenv').config();
const bodyParser = require('body-parser');
const https = require('https');

const API_KEY_COMPONENT = `&apiKey=${process.env.NEWS_API_KEY}`;
const BASE_URL = `https://newsapi.org/v2/top-headlines?country=ca`;
const CATEGORY_BASE = `&category=`;

const HEAD_LINE_URL = BASE_URL + API_KEY_COMPONENT;
const CATEGORIES = [`business`, `entertainment`, `health`, `science`, `sports`, `technology`];
const CATEGORIES_URLS = CATEGORIES.map(_ => BASE_URL + CATEGORY_BASE + _ + API_KEY_COMPONENT);

const CACHE = {};
let LAST_UPDATE_AT;
let SCHEDULED_UPDATE_TIMER;
const UPDATE_INTERVAL = 30 * 60 * 1000; // 30 minutes

function getNews(url, cacheKey) {
    https.get(url, (res) => {
        let body = '';
        res.on('data', (data) => {
            body += data
        });
        res.on('end', () => {
            body = JSON.parse(body);
            if (body.status === 'ok') {
                CACHE[cacheKey] = body
            }
        });
    })
        .on('error', (e) => {
            console.log(e);
        })
}

function getAllNews() {
    LAST_UPDATE_AT = Date.now();
    console.log('news last updated at: ', LAST_UPDATE_AT);
    getNews(HEAD_LINE_URL, 'headline');
    CATEGORIES_URLS.map((_, i) => getNews(_, CATEGORIES[i]));
    SCHEDULED_UPDATE_TIMER = setTimeout(getAllNews, UPDATE_INTERVAL)
}

module.exports = {
    getAllNews: getAllNews,
    cache: CACHE
};