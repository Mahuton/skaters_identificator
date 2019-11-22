var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'Home', menuId:'home'});
});

/* GET datapath page. */
router.get('/institutions', function(req, res, next) {
  res.render('institutions', {page:'institutions', menuId:'institutions'});
});

/* GET results path page. */
router.get('/photographers', function(req, res, next) {
  res.render('photographers', {page:'photohgraphers', menuId:'photographers'});
});

/* GET form page. */
router.get('/form', function(req, res, next) {
  res.render('form', {page:'form', menuId:'csvform'});
});

module.exports = router;