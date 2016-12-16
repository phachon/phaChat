/**
 * index controller
 */

exports.index = function (req, res, next) {
    res.render('index', { title: '首页'});
};
