function getDocumentsCountByCategory(newsCollection) {
    return new Promise((resolve, reject) => {
        newsCollection.aggregate([
            { $group: {
                    _id: {
                        category: "$category",
                    },
                    count: {
                        $sum: 1
                    }
                }
            },
            { $project: {
                    _id: 0,
                    category: "$_id.category",
                    count: 1,
                }
            }
        ]).toArray((err, doc) => {
            if (err) reject(err);
            resolve(doc);
        })
    })
}

module.exports = {
    getDocumentsCountByCategory
};