/**
 * author
 * @author phachon@163.com
 */
var express = require('express');
var router = express.Router();
var Misc = require('../core/misc');
var Prompt = require('../core/prompt');
var UserModel = require('../models/userModel');

/**
 * index
 */
router.route('/')
    .get(function(req, res, next) {
        res.render('login', { title: 'phachat用户登录'});
    });

/**
 * login page
 */
router.route('/index')
    .get(function (req, res, next) {
        res.render('login', {title: 'phachat用户登录'});
    });

/**
 * login
 */
router.route('/login')
    .post(function (req, res, next) {
        var username = req.body.username;
        var password = req.body.password;

        if(!username) {
            return res.json(Prompt.error('用户名不能为空'));
        }
        if(!password) {
            return res.json(Prompt.error('密码不能为空'));
        }
        try {
            new UserModel().getUserByUsername(username, function (results) {
                if(results) {
                    var user = results[0];
                    if(user.password == Misc.md5(password)) {
                        req.session.user = user;
                        return res.json(Prompt.success('ok', '/'));
                    }else {
                        return res.json(Prompt.error('登录失败,密码错误'));
                    }
                }else {
                    return res.json(Prompt.error('登录失败,账号不存在'));
                }
            });
        } catch (e) {
            return res.json(Prompt.error(e.message));
        }
    });

/**
 * logout
 */
router.route('/logout')
    .post(function (req, res, next) {
        req.session.destroy(function (err) {
            if(err) {
                console.log("session销毁失败.");
            } else {
                console.log("session被销毁.");
                return res.json(Prompt.success('退出成功', '/author'));

            }
        });
    });

/**
 * register page
 */
router.route('/register')
    .get(function (req, res, next) {
        return res.render('register', {title: 'phachat用户注册'});
    });

/**
 * register
 */
router.route('/create')
    .post(function (req, res, next) {

        var username = req.body.username;
        var password = req.body.password;
        var repass = req.body.repass;

        if(!username) {
            return res.json(Prompt.error('用户名不能为空'));
        }
        if(!password) {
            return res.json(Prompt.error('密码不能为空'));
        }
        if(!repass) {
            return res.json(Prompt.error('再次输入密码'));
        }
        if(repass != password) {
            return res.json(Prompt.error('两次密码不一致'))
        }

        var values = {
            username: username,
            password: Misc.md5(password),
            create_time: Date.now() / 1000,
            update_time: Date.now() / 1000
        };

        try {
            new UserModel().add(values, function (results) {
                if(!results) {
                    return res.json(Prompt.error('注册失败'));
                }else {
                    return res.json(Prompt.success('ok', '/'));
                }
            });
        } catch (e) {
            return res.json(Prompt.error(e.message));
        }
    });

module.exports = router;
