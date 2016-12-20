/**
 * logger
 * @author phachon@163.com
 */

var log4js = require('log4js');
var config = require('config');

log4js.configure(config.get("logger"));

/**
 * access 日志
 */
module.exports.access = function () {
    var accessLogger = log4js.getLogger('access');
    return log4js.connectLogger(accessLogger, {level:'auto', format:':method :url'});
};

/**
 * info 日志
 */
module.exports.info = function (message) {
    var accessLogger = log4js.getLogger('access');
    accessLogger.setLevel('INFO');
    return accessLogger.info(message);
};

/**
 * warn 日志
 */
module.exports.warning = function (message) {
    var accessLogger = log4js.getLogger('access');
    accessLogger.setLevel('WAIN');
    return accessLogger.warn(message);
};

/**
 * error 日志
 */
module.exports.error = function (message) {
    var errorLogger = log4js.getLogger('error');
    errorLogger.setLevel('ERROR');
    return errorLogger.error(message);
};

/**
 * debug 日志
 */
module.exports.debug = function (message) {
    var debugLogger = log4js.getLogger('debug');
    debugLogger.setLevel('DEBUG');
    return debugLogger.debug(message);
};

/**
 * log - database
 */
module.exports.database = function (message) {
    //TODO write log to database
};