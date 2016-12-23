/**
 * author 业务逻辑
 * @author phachon@163.com
 */
var Container = require(global.COREPATH + 'container');
var logger = Container.core('logger');

/**
 * login
 * @param username
 * @param password
 * @param callback
 */
exports.login = function (username, password, callback) {

    logger.debug('开始登录 business');
    Container.dao('user').getUserByUsername(username, callback);
};
