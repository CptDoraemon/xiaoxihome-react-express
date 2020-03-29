let cache = null;

const media = [
    "global", "cbc.ca", "ctv", "sportsnet.ca", "cnn", "tsn", "showbiz", "cheat", "sheet",
    "business", "insider"
];
const blacklist = [
    ...media,
    "null", "news", "new", "first", "now",
    "one", "two",
    "just", "announced", "may", "according", "time", "get",
    "", "also", "i", "me", "my", "myself", "we", "us",
    "our", "ours", "ourselves", "you", "your", "yours",
    "yourself", "yourselves", "he", "him", "his",
    "himself", "she", "her", "hers", "herself", "it",
    "its", "itself", "they", "them", "their", "theirs",
    "themselves", "what", "which", "who", "whom", "whose",
    "this", "that", "these", "those", "am", "is", "are",
    "was", "were", "be", "been", "being", "have", "has",
    "had", "having", "do", "does", "did", "doing", "will",
    "would", "should", "can", "could", "ought", "i'm",
    "you're", "he's", "she's", "it's", "it’s", "we're", "they're",
    "i've", "you've", "we've", "they've", "i'd", "you'd",
    "he'd", "she'd", "we'd", "they'd", "i'll", "you'll",
    "he'll", "she'll", "we'll", "they'll", "isn't",
    "aren't", "wasn't", "weren't", "hasn't", "haven't",
    "hadn't", "doesn't", "don't", "didn't", "won't",
    "wouldn't", "shan't", "shouldn't", "can't", "cannot",
    "couldn't", "mustn't", "let's", "that's", "who's",
    "what's", "here's", "there's", "when's", "where's",
    "why's", "how's", "a", "an", "the", "and", "but",
    "if", "or", "because", "as", "until", "while", "of",
    "at", "by", "for", "with", "about", "against",
    "between", "into", "through", "during", "before",
    "after", "above", "below", "to", "from", "up", "upon",
    "down", "in", "out", "on", "off", "over", "under",
    "again", "further", "then", "once", "here", "there", "when",
    "where", "why", "how", "all", "any", "both", "each",
    "few", "more", "most", "other", "some", "such", "no",
    "nor", "not", "only", "own", "same", "so", "than",
    "too", "very", "say", "says", "said", "shall"];

function getWordCloud(collection) {
    return new Promise((resolve, reject) => {
        if (cache) {
            resolve(cache);
            return
        }

        const pipeline = [
            {
                $addFields: {
                    words: {
                        $map: {
                            input: { $split: ['$description', ' '] },
                            as: 'str',
                            in: {$cond: {
                                    if: {
                                        $not: [{
                                            $in: [
                                                "$$str",
                                                [",", "|", "(", ")", "{", "}", "—", "-", "--", "<", ">", ".", ";", "\"", "&", "...", "…"]
                                            ]
                                        }]
                                    },
                                    then: {
                                        $toLower: "$$str"
                                    },
                                    else: "null"
                                }}
                        }
                    }
                }
            },
            { $unwind: '$words' },
            {
                $match: {
                    words: {
                        $nin: blacklist
                    }
                }
            },
            {
                $group: {
                    _id: {
                        word: "$words"
                    },
                    count: {
                        $sum: 1
                    }
                }
            },
            {$sort: {count: -1}},
            {$limit: 100},
            {$project: {
                    word: "$_id.word",
                    count: 1,
                    _id: 0
                }}
        ];
        collection.aggregate(pipeline).toArray((err, doc) => {
            if (err) {
                reject(err);
            } else {
                cache = doc;
                resolve(doc);
            }
        })
    })
}

module.exports = {
    getWordCloud
};