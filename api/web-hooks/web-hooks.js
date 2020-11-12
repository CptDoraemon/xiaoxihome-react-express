const router = require('express').Router();
const crypto = require('crypto');
const secret = process.env.DJANGO_DISCUSSION_BOARD_WEB_HOOK_SECRET;
const axios = require('axios');

const parseRawBody = (req, res, next) => {
  req.rawBody = '';
  req.setEncoding('utf8');

  req.on('data', function(chunk) {
    req.rawBody += chunk;
  });

  req.on('end', function() {
    next();
  });
};

router.post('/django-discussion-board', parseRawBody, (req, res) => {
  const hmac = crypto.createHmac('sha256', secret);
  const body = req.rawBody;
  const requestSignature = req.headers['Heroku-Webhook-Hmac-SHA256'];
  console.log('body: ', body);
  console.log('requestSignature: ', requestSignature);
  if (requestSignature) {
    return res.status(403).end()
  }

  const calculatedSignature = hmac.update(body).digest('base64');
  console.log('calculatedSignature: ', calculatedSignature);
  if (requestSignature !== calculatedSignature) {
    return res.status(403).end()
  }

  process.nextTick(() => {
    axios
        .get('https://cptdoraemon.github.io/discussion-board-client/')
        .catch()
  });

  return res.status(204).end();
});

module.exports = router;
