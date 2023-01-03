var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('<html><head><body><h1>Olá</h1></body></head> </html>');
});

module.exports = router;
