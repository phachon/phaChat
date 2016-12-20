/**
 * author controller
 * @author phachon@163.com
 */
var validator  = require('validator');
var eventproxy  = require('eventproxy');
var prompt = require(global.COREPATH + 'prompt');
var Container = require(global.COREPATH + 'container');

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

    var username = validator.trim(req.body.username);
    var password = validator.trim(req.body.password);
    var ep = new eventproxy();

    ep.on('login_error', function (message) {
        res.json(prompt.error(message));
    });
    if(!username) {
        return ep.emit('login_error', '用户名不能为空')
    }
    if(!password) {
        return ep.emit('login_error', '密码不能为空');
    }

    try {
        Container.business('author').login(username, password);
    }catch(e) {
        console.log(e);
    }
    return ep.emit('login_error', '密码不能为空');
};
