var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    let name = ('userName' in req.query ? req.query.userName : 'user');
    res.render('me', { name: name });
});

module.exports = router;