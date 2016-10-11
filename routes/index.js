/**
 * index
 * @author phachon@163.com
 */
var express = require('express');
var router = express.Router();

/**
 * index
 */
router.get('/', function(req, res, next) {
  res.render('index', { title: '首页'});
});

module.exports = router;
