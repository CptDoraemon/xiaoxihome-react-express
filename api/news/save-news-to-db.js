// Collection 'news'
// Save the new news articles to collection

const mongoose = require ("mongoose");
const newsArticleSchema = new mongoose.Schema({
    source: {
        id: String,
        name: String
    },
    author: String,
    title: String,
    description: String,
    url: String,
    urlToImage: String,
    publishedAt: String,
    content: String,
    requestedAt: String,
    category: String
});
const NewsArticleModel = mongoose.model('News', newsArticleSchema);
const MAX_COLLECTION_SIZE = 300 * 1024 * 1024; // 300 mb

async function savingNewsCacheObjectToDB(newsCacheObject, requestedAt) {
    try {
        // 1
        // await connectToDB();

        // 2
        const savingNewsArticlePromiseArray = mapNewsCacheObjectToPromiseArray(newsCacheObject, requestedAt);
        const savingStatus = await Promise.all(savingNewsArticlePromiseArray);
        const savedArticlesCount = savingStatus.reduce((a, b) => a + b, 0);
        console.log(`${savedArticlesCount} articles saved to database`);

        // 3
        await cleanUpAfterSavingToDB();
        console.log(`news API database operations done`);
    } catch (e) {
        console.log(e);
    }
}

function mapNewsCacheObjectToPromiseArray(newsCacheObject, requestedAt) {
    const savingNewsArticlePromiseArray = [];
    Object.keys(newsCacheObject).forEach((category) => {
        if (!newsCacheObject[category]['articles'] || !newsCacheObject[category]['articles'].length) return;
        const newsInCategoryArray = newsCacheObject[category]['articles'];
        newsInCategoryArray.forEach((article) => {
            savingNewsArticlePromiseArray.push(saveOneArticleToDBWhenNeeded(article, category, requestedAt))
        });
    });
    return savingNewsArticlePromiseArray;
}

function saveOneArticleToDBWhenNeeded(article, category, requestedAt) {
    return new Promise(async (resolve, reject) => {
        const foundArticle = await queryIfArticleExisted(article, category);
        if (!foundArticle) {
            await doSaveOneArticleToDB(article, category, requestedAt);
            resolve(1);
        }
        resolve(0);
    })
}

function doSaveOneArticleToDB(article, category, requestedAt) {
    return new Promise((resolve, reject) => {
        const nonNullArticle = nonNullifyArticleObject(article);
        const newNewsArticle = new NewsArticleModel({
            ...nonNullArticle,
            requestedAt: requestedAt,
            category: category
        });
        newNewsArticle.save((err) => {
            if (err) console.log(err);
            resolve();
        })
    });
}

function queryIfArticleExisted(article, category) {
    return new Promise((resolve, reject) => {
        const query = NewsArticleModel.where({
            title: article.title,
            url: article.url,
            category: category
        });
        query.findOne((err, foundArticle) => {
            if (err) {
                console.log(`err when saving article to db`);
                reject(err);
            }
            resolve(foundArticle);
        })
    })
}

function nonNullifyArticleObject(article) {
    const nonNullArticle = Object.assign({}, article);
    Object.keys(nonNullArticle).forEach((key) => {
        if (key === 'source') {
            if (!nonNullArticle.source.id) nonNullArticle.source.id = '';
            if (!nonNullArticle.source.name) nonNullArticle.source.name = '';
        }
        if (nonNullArticle[key] === null) nonNullArticle[key] = '';
    });
    return nonNullArticle;
}

function cleanUpAfterSavingToDB() {
    return new Promise(async (resolve, reject) => {
        const deletedCount = await trimDBtoMaxStorageSizeIfNeeded();
        console.log (`${deletedCount} documents deleted to restrict collection size`);
        resolve();
    });
}

async function trimDBtoMaxStorageSizeIfNeeded() {
    return new Promise(async (resolve, reject) => {
        const currentCollectionSize = await getDBStorageSize();
        console.log(`current collection size: ${currentCollectionSize}`);
        console.log(`max collection size allowed: ${MAX_COLLECTION_SIZE}`);
        if (currentCollectionSize > MAX_COLLECTION_SIZE) {
            await removeOldestRecordFromDB();
            const deleteCount = await trimDBtoMaxStorageSizeIfNeeded();
            resolve(deleteCount + 1);
        } else {
            resolve(0);
        }
    })
}

function removeOldestRecordFromDB() {
    return new Promise((resolve, reject) => {
        NewsArticleModel.findOneAndRemove({}, {sort: {'_id': 1}}, (err, doc) => {
            if (err) reject();
            console.log('document deleted: ', doc);
            resolve();
        });
    })
}

function getDBStorageSize() {
    return new Promise((resolve, reject) => {
        NewsArticleModel.collection.stats((err, result) => {
            if (err) reject();
            resolve(result.size);
        });
    });
}

module.exports = savingNewsCacheObjectToDB;