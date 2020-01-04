require('dotenv').config();
const mongoose = require ("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;
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
const NewsArticle = mongoose.model('News', newsArticleSchema);

function savingNewsCacheObjectToDB(newsCacheObject, requestedAt) {
    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true ,
        useUnifiedTopology: true
    })
        .catch((e) => {
            console.log(e)
        });
    const db = mongoose.connection;

    db.on('error', (err) => {
        console.log('db connection error when saving news', err);
    });
    db.once('open', () => {
        console.log('Saving News Cache to Database');
        Object.keys(newsCacheObject).forEach((key, categoryIndex, categoryArray) => {
            if (!newsCacheObject[key].articles || !newsCacheObject[key].articles.length) return;
            const newsInCategoryArray = newsCacheObject[key]['articles'];
            newsInCategoryArray.forEach((article, articleIndex, articlesArray) => {
                const isLast = (categoryIndex === categoryArray.length - 1) && (articleIndex === articlesArray.length - 1);
                const query = NewsArticle.where({
                    title: article.title,
                    url: article.url,
                    category: key
                });
                query.findOne((err, foundArticle) => {
                    if (err) {
                        console.log(`err when saving article to db`, err);
                    }
                    if (!foundArticle) {
                        const nonNullArticle = Object.assign({}, article);
                        Object.keys(nonNullArticle).forEach((key) => {
                            if (key === 'source') {
                                if (!nonNullArticle.source.id) nonNullArticle.source.id = '';
                                if (!nonNullArticle.source.name) nonNullArticle.source.name = '';
                            }
                            if (nonNullArticle[key] === null) nonNullArticle[key] = '';
                        });

                        const newNewsArticle = new NewsArticle({
                            ...nonNullArticle,
                            requestedAt: requestedAt,
                            category: key
                        });
                        newNewsArticle.save((err) => {
                            if (err) console.log(err);
                            if (isLast) {
                                console.log('News Cache Saved to Database');
                            }
                        })
                    }
                });

            })
        })
    });
}

module.exports = savingNewsCacheObjectToDB;