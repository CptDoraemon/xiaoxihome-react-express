const getDocumentsCount = require('../analytics/reusables/get-documents-count').getDocumentsCount;
const getDocumentDate = require('../analytics/reusables/get-earliest-and-latest-document-date').getDocumentDate;
const getFrequencyAnalytics = require('./frequency-by-day').getFrequencyAnalytics;
const getDocumentsCountByCategory = require('./reusables/get-documents-count-by-category').getDocumentsCountByCategory;

let cache = null;

function getSummaryStatistics(newsCollection) {
    return new Promise(async (resolve, reject) => {
        try {
            if (cache) {
                resolve(cache);
                return
            }

            const totalDocuments = await getDocumentsCount(newsCollection, '', -1);
            const earliestDocumentDate = await getDocumentDate('earliest', newsCollection);
            const latestDocumentDate = await getDocumentDate('latest', newsCollection);
            const documentsCountByDay = await getFrequencyAnalytics('', newsCollection);
            const documentsCountByCategory = await getDocumentsCountByCategory(newsCollection);

            cache = {
                totalDocuments,
                earliestDocumentDate,
                latestDocumentDate,
                documentsCountByDay,
                documentsCountByCategory
            };

            resolve(cache)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getSummaryStatistics
};