/**
 * web_router.js
 */
var express = require('express');
var router = express.Router();

//controllers
var index = require('./application/controller/index');
var author = require('./application/controller/author');
var chat = require('./application/controller/chat');

//index
router.get('/', index.index);
//author
router.get('/author/index', author.index);
router.get('/author', author.index);
router.post('/author/login', author.login);
//chat
router.get('/chat/index', chat.index);

module.exports = router;
