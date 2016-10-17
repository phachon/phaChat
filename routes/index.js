/**
 * index
 * @author phachon@163.com
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
var Prompt = require('../core/prompt');

/**
 * index
 */
router.get('/', function(req, res, next) {
  res.render('index', { title: '首页'});
});

router.get('/readme', function (req, res, next) {

    var file = 'README.md';

    //异步读取文件
    fs.readFile(file, 'utf-8', function(err, data) {
        if(err) {
            console.log(err);
            return res.json(Prompt.error(err));
        }else {
            console.log(data);
            return res.json(Prompt.success(data));
        }
    });

});

module.exports = router;
