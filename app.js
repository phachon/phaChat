/**
 * phaChat app.js
 */

/**
 * 定义目录全局变量
 */
global.DOCROOT = __dirname;
global.APPPATH = global.DOCROOT + "/application/";
global.COREPATH = global.DOCROOT + "/core/";
global.LOGPATH = global.DOCROOT + "/logs/";
global.CONFPATH = global.DOCROOT + "/config/";
global.PUBLIC = global.DOCROOT + "/public/";
global.VIEW = global.DOCROOT + "/views/";
global.CONTROLLER = global.APPPATH + "/controller/";
global.BUSINESS = global.APPPATH + "/business/";
global.MODEL = global.APPPATH + "/model/";
global.DAO = global.APPPATH + "/dao/";
global.ENV = process.env.NODE_ENV || "development";

/**
 * 加载module
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var config = require('config');
var fs = require('fs');
var container = require(global.COREPATH + 'container');
var logger = container.core('logger');

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
 * 日志中间件 - 加载访问日志
 */
app.use(container.core('logger').access());

/**
 * cookie 中间件
 */
app.use(cookieParser());

/**
 * session 中间件
 */
app.use(session({
  store: new RedisStore(container.system('config').get('session.redis')),
  resave:false,
  saveUninitialized:false,
  secret: config.get("session.secret")
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

/**
 * 错误处理
 */
if(config.get("debug")) {
  //捕获异常信息(显示html并打印)
  app.use(errorHandler({ showStack: true, dumpExceptions: true }));
} else {
  app.use(function(err, req, res, next) {
    logger.error(err);
    res.status(err.status || 500);
    res.render('error', {
      message: global.ENV === 'production' ? '请求出错' : err.message,
      error: global.ENV === 'production' ? {} : err
    });
  });
}

/**
 * 监听端口
 */
if(!module.parent) {
  app.listen(config.get("port"), function () {
    logger.info('phachat listening on port', config.get("port"));
    logger.info('you can debug your app with http://'+config.get("host")+':' +config.get("port"));
    logger.info('love you...');
  });
}

module.exports = app;
