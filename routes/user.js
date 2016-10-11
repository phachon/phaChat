/**
 * user
 * Created by phachon@163.com
 */
var express = require('express');
var router = express.Router();
var Misc = require('../core/misc');
var Prompt = require('../core/prompt');
var UserModel = require('../models/userModel');

/**
 * user set
 */
router.route('/set')
    .get(function(req, res, next) {

        var userId = req.session.user.user_id;

        var userModel = new UserModel();
        try {
            userModel.getUserByUserId(userId, function (users) {
                if(users) {
                    var user = users[0];
                    return res.render(
                        'user/set',
                        { title: '用户设置', user: user}
                    );
                } else {
                    console.log('查找用户失败');
                    next();
                }
            });
        } catch(e) {
            console.log(e.message);
        }
    });

/**
 * user set save
 */
router.route('/save')
    .post(function(req, res, next) {

        var userId = req.body.user_id;
        var sex = req.body.sex;
        var email = req.body.email;
        var phone = req.body.phone;
        var qq = req.body.qq;
        var wechat = req.body.wechat;

        if(!userId) {
            res.json(Prompt.error('user_id错误'));
        }

        var values = {
            sex: sex,
            email: email,
            phone: phone,
            qq: qq,
            wechat: wechat,
            update_time: Date.now() / 1000
        };
        var userModel = new UserModel();
        try {
            userModel.updateUserByUserId(values, userId, function (results) {
                if(!results) {
                    return res.json(Prompt.error('保存信息失败'));
                }else {
                    return res.json(Prompt.success('保存信息成功', '/chat/index'));
                }
            });
        } catch (e) {
            console.log(e.message);
            return res.json(Prompt.error(e.message));
        }

    });

/**
 * update password
 */
router.route('/password')
    .get(function (req, res, next) {
        res.render(
            'user/password',
            { title: '修改密码', user_id: req.session.user.user_id}
        );
    });

/**
 * update password modify
 */
router.route('/passmodify')
    .post(function (req, res, next) {
        var userId = req.body.user_id;
        var password = req.body.password;
        var rePassword = req.body.re_password;
        var againPassword = req.body.again_password;

        if(!userId) {
            return res.json(Prompt.error('user_id 错误'));
        }
        if(password == undefined || password == '') {
            return res.json(Prompt.error('密码不能为空', ''));
        }
        if(rePassword == undefined || rePassword == '') {
            return res.json(Prompt.error('新密码不能为空'));
        }
        if(againPassword == undefined || againPassword == '') {
            return res.json(Prompt.error('确认密码不能为空'));
        }
        if(rePassword !== againPassword) {
            return res.json(Prompt.error('两次密码输入不一致!'));
        }

        var userModel = new UserModel();
        try {
            userModel.getUserByUserId(userId, function (users) {
                if(users) {
                    var user = users[0];
                    if(user.password == Misc.md5(password)) {
                        var values = {
                            password: Misc.md5(rePassword),
                            update_time: Date.now() / 1000
                        };

                        userModel.updateUserByUserId(values, userId, function (results) {
                            if(!results) {
                                return res.json(Prompt.error('修改密码失败'));
                            }
                        });
                        return res.json(Prompt.success('修改密码成功', '/chat/index'));
                    } else {
                        return res.json(Prompt.error('当前密码错误'));
                    }
                }else {
                    return res.json(Prompt.error('用户不存在'));
                }
            });
        } catch(e) {
            console.log(e.message);
            return res.json(Prompt.error(e.message));
        }
    });

module.exports = router;