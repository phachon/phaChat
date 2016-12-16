/**
 * web_router.js
 */
var express = require('express');
var router = express.Router();

//controllers
var index = require('./controllers/index');
var author = require('./controllers/author');
var chat = require('./controllers/chat');

//index
router.get('/', index.index);
//author
router.get('/author/index', author.index);
router.get('/author', author.index);
router.post('/author/login', author.login);
//chat
router.get('/chat/index', chat.index);

module.exports = router;
