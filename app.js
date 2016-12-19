/**
 * phaChat app.js
 */

/**
 * 定义目录全局变量
 */
global.DOCROOT = __dirname;
global.APPPATH = global.DOCROOT + "/application/";
global.CONTROLLER = global.APPPATH + "/controller/";
global.SERVICE = global.APPPATH + "/service/";
global.MODEL = global.APPPATH + "/model/";
global.DAO = global.APPPATH + "/dao/";
global.COREPATH = global.DOCROOT + "/core/";
global.LOGPATH = global.DOCROOT + "/log/";
global.PUBLIC = global.DOCROOT + "/public/";
global.VIEW = global.DOCROOT + "/views/";
var env = process.env.NODE_ENV == '' ? 'development' : process.env.NODE_ENV;
global.CONFPATH = global.DOCROOT + env;

/**
 * 加载module
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require(global.COREPATH + "logger");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');
var config = require('config');
var fs = require('fs');

/**
 * 路由配置文件
 */
var webRouter = require('./web_router');

/**
 * express
 */
var app = express();

/**
 * 设置模板目录
 */
app.set('views', global.VIEW);

/**
 * 设置模板引擎 html
 */
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

/**
 * cookie 中间件
 */
app.use(cookieParser());

/**
 * session 中间件
 */
app.use(session({
  store: new RedisStore(config.get('redis.session')),
  resave:false,
  saveUninitialized:false,
  secret: 'phachat'
}));

/**
 * favicon.ico 中间件
 */
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

/**
 * 解析客户端请求中间件 (处理 json 数据)
 */
app.use(bodyParser.json());

/**
 * 解析客户端请求中间件 (UTF-8的编码的数据)
 */
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * 静态文件
 */
app.use(express.static(global.PUBLIC));

/**
 * 路由
 */
app.use('/', webRouter);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if(!module.parent) {
  app.listen(3000, function () {
    logger.info('phachat listening on port', 3000);
    logger.info('You can debug your app with http://127.0.0.1:3000');
    logger.info('love you...');
  });
}
module.exports = app;
