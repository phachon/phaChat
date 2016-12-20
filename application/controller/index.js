/**
 * index controller
 */
var logger = require(global.COREPATH + 'logger');

exports.index = function (req, res, next) {
    res.render('index', { title: '首页'});
};
