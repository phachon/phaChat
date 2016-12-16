
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');
var config = require('config');
var fs = require('fs');

//加载路由文件
var index = require('./routes/index');
var author = require('./routes/author');
var chat = require('./routes/chat');
var user = require('./routes/user');
var about = require('./routes/about');

var app = express();
//设置 cookie
app.use(cookieParser());
//设置 session
app.use(session({
  store: new RedisStore(config.get('redis.session')),
  resave:false,
  saveUninitialized:false,
  secret: 'phachat'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
// 加载 html 文件
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//index route
app.use('/', index);
//author route
app.use('/author', author);
//chat route
app.use('/chat', chat);
//user route
app.use('/user', user);
//about route
app.use('/about', about);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//config path
//var configPath = './config/development';

/**
 * development
 */
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

/**
 * testing
 */
if (app.get('env') === 'testing') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

/**
 * production
 */
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//config
// var config = require(configPath);

module.exports = app;
