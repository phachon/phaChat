/**
 * chat
 * @author phachon@163.com
 */
var express = require('express');
var router = express.Router();
var author = require('../core/author');
var UserModel = require('../models/userModel');

/**
 * index
 */
router.get('/', author.isLogin, function(req, res, next) {
    var userModel = new UserModel();
    userModel.getUsers(function (users) {
        res.render(
            'chat',
            {
                title: 'phachat聊天室',
                users: users,
                user: req.session.user
            }
        );
    });
});

router.get('/index', author.isLogin, function(req, res, next) {

    var userModel = new UserModel();
    userModel.getUsers(function (users) {
        res.render(
            'chat',
            {
                title: 'phachat聊天室',
                users: users,
                user: req.session.user
            }
        );
    });
});

module.exports = router;
