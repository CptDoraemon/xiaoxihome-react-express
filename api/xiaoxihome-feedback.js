require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require ("mongoose");

function xiaoxihomeFeedback(app) {
    const uristring = process.env.MONGODB_URI;
    let feedbackSchema = new mongoose.Schema({
        name: String,
        email: String,
        message: String,
        date: Date
    });
    let Feedback = mongoose.model('Feedback', feedbackSchema);

    app.post('/contact/submit/', bodyParser.json(), (req, res) => {
        let name = req.body.name;
        let email = req.body.email;
        let message = req.body.message;
        // input validation
        if (name.match(/^\s*$/) || email.match(/^\s*$/) || message.match(/^\s*$/) || email.indexOf('@') === -1) {
            res.json({response: 'Ooops: please check inputs'})
        } else {
            let date = new Date();
            let newFeedback = new Feedback({
                name: name,
                email: email,
                message: message,
                date: date
            });
            mongoose.connect(uristring, { useNewUrlParser: true });
            let db = mongoose.connection;
            db.on('error', (err) => {
                res.json({response: 'Ooops: ' + err + ', please try again.'});
            });
            db.once('open', () => {
                newFeedback.save((err) => {
                    if (err) {
                        res.json({response: 'Ooops: ' + err + ', please try again.'});
                    } else {
                        res.json({response: 'Thank you for your message, I\'ll get back to you soon.'});
                    }
                })
            });
        }
    });
}

export default xiaoxihomeFeedback;