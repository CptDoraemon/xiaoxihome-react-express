const ObjectID = require('mongodb').ObjectID;
let EARLIEST_DOCUMENT_DATE = null;
let LATEST_DOCUMENT_DATE = null;

function getDocumentDate(which, collection) {
    let sortBy;
    if (which === 'latest') {
        if (LATEST_DOCUMENT_DATE) return LATEST_DOCUMENT_DATE;
        sortBy = -1
    } else if (which === 'earliest') {
        if (EARLIEST_DOCUMENT_DATE) return EARLIEST_DOCUMENT_DATE;
        sortBy = 1
    } else {
        return false
    }

    return new Promise((resolve, reject) => {
        collection.aggregate([
            {$sort: {_id: sortBy}},
            {$limit: 1}
        ])
            .toArray((err, result) => {
                if (err) reject(err);
                const doc = result[0];
                const time = ObjectID(doc._id).getTimestamp();
                const ms = new Date(time).getTime();

                if (sortBy === -1) {
                    LATEST_DOCUMENT_DATE = ms
                } else if (sortBy === 1) {
                    EARLIEST_DOCUMENT_DATE = ms
                }
                resolve(ms);
            });
    })
}

module.exports = {
    getDocumentDate
};