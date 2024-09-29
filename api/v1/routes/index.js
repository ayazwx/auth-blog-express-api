var express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.status(200).send('This is the API V1 root route.');
});

module.exports = router;