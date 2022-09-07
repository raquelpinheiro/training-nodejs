var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let greeting = ('greeting' in req.query ? req.query.greeting : 'Hello');
  res.render('hello', { greeting: greeting });
});

module.exports = router;
