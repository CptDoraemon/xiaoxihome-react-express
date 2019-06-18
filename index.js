const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require ("mongoose");
const helmet = require('helmet');
require('dotenv').config();

const weatherAPI = require('./api/weather').weather;
const reverseGeoCodingAPI = require('./api/geocoding').reverseGeoCoding;
const ipGeolocation = require('./api/ip-geolocation').ipGeolocation;

const uristring = process.env.MONGODB_URI;

let feedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: Date
});
let Feedback = mongoose.model('Feedback', feedbackSchema);




if( process.env.PORT ) {
    app.use((req, res, next) => {
        if (req.header('X-Forwarded-Proto') === 'https') {
            next();
        } else res.redirect('https://' + req.hostname + req.url);
    });
}
app.use(helmet());

app.use(express.static(path.join(__dirname, 'client/build')));



// ROUTERS
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

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

ipGeolocation(app);
weatherAPI(app);
reverseGeoCodingAPI(app);

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


const port = process.env.PORT || 5000;
app.listen(port);
