/**
 * author controller
 * @author phachon@163.com
 */

var prompt = require('../common/prompt');

/**
 * 登录页
 */
exports.index = function (req, res, next) {
    res.render('login', { title: 'phachat用户登录'});
};

/**
 * 登录
 * @param req
 * @param res
 * @param next
 */
exports.login = function (req, res, next) {
    res.json(prompt.error('登录失败'));
};
