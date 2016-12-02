/**
 * chat about
 * @author phachon@163.com
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('about', { title: '关于'});
});

router.get('/index', function (req, res, next) {
    res.render('about', { title: '关于'});
});

module.exports = router;