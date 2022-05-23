var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render(name of template file, options to be used in that view
  res.render('index', { title: 'Express' });
});

module.exports = router;
