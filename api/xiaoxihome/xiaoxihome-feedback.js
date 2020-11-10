const bodyParser = require('body-parser');
const mongoose = require ("mongoose");
const router = require('express').Router();
const AWS = require('aws-sdk');

AWS.config = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_SES_REGION
});
const ses = new AWS.SES({apiVersion: '2010-12-01'});

const getEmailParam = ({name, email, message, date}) => {
  return {
    Destination: {
      ToAddresses: [
        process.env.XIAOXIHOME_FEEDBACK_RECIPIENT,
      ]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
          <p>Name: ${name}</p>
          <p>Email: ${email}</p>
          <p>Message: ${message}</p>
          <p>Date: ${new Date(date).toLocaleString('en-US', { timeZone: 'America/Toronto' })}</p>
          `
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: "New feedback from XiaoxiHome"
      }
    },
    Source: "noreply@xiaoxihome.com",
  }
};

const sendEmail = ({name, email, message, date}) => {
  return new Promise(resolve => {
    ses.sendEmail(getEmailParam({name, email, message, date}), function(err, data) {
      if (err) {
        console.log(err)
      }
      resolve(true)
    })
  })
};

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 1,
    maxlength: 200,
    required: true
  },
  email: {
    type: String,
    minlength: 1,
    maxlength: 200,
    validate: {
      validator: v => v.indexOf('@') !== -1,
      message: props => `Invalid ${props.path}`
    },
    required: true
  },
  message: {
    type: String,
    minlength: 1,
    maxlength: 2000,
    required: true
  },
  date: Date
});
const Feedback = mongoose.model('Feedback', feedbackSchema);

router.post('/', bodyParser.json(), async (req, res) => {
  try {
    const {name, email, message} = req.body;

    const date = new Date().toISOString();
    const feedback = new Feedback({name, email, message, date});
    await feedback.save();
    // don't wait for sending email
    sendEmail({name, email, message, date});

    return res.json({
      response: 'Thank you for your message, I\'ll get back to you soon.'
    });
  } catch (e) {
    let message = 'Server error, please try again later';

    if (e instanceof mongoose.Error) {
      if (e.message) {
        message = e.message
      }
    }

    return res.json({response: message});
  }
});

module.exports = router;
