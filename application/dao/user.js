/**
 * user - dao
 * @author phachon@163.com
 */
var Container = require(global.COREPATH + 'container');
var logger = Container.core('logger');

var table = '';
var db = '';
var premaryKey = '';

exports.getUserByUsername = function (username) {
    logger.debug('到达dao');
};
