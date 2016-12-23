/**
 * author controller
 * @author phachon@163.com
 */
var validator  = require('validator');
var eventproxy  = require('eventproxy');
var prompt = require(global.COREPATH + 'prompt');
var Misc = require(global.COREPATH + 'misc');
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
		Container.business('author').login(username, password, function (results) {
			if(results) {
				var user = results[0];
				if(user.password == Misc.md5(password)) {
					req.session.user = user;
					return res.json(prompt.success('ok', '/'));
				}else {
					return ep.emit('login_error', '登录失败，密码不能为空');
				}
			}else {
				return ep.emit('login_error', '登录失败，账号不存在');
			}
		});
	}catch(e) {
		console.log(e);
	}
};
