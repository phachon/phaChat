/**
 * user - dao
 * @author phachon@163.com
 */
var Container = require(global.COREPATH + 'container');
var DB = require(global.COREPATH + 'db');
var logger = Container.core('logger');

var table = 'chat_user';
var db = 'phachat';
var premaryKey = 'user_id';

exports.getUserByUsername = function (username, callback) {

    return DB.select('*').from(table)
        .where('username', '=', username)
        .execute(db, callback);
};
