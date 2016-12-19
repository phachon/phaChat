/**
 * use model
 */
var DB = require('../common/db');
var Misc = require('../core/misc');

var _table = '';
var _db = '';
var _p
/**
 * 添加一个用户
 * @param values
 * @param callback
 */
exports.add = function (values, callback) {
    DB.instance()
        .insert(this.table)
        .columns(Misc.array_keys(values))
        .values(Misc.array_values(values))
        .execute(this.db, function (results) {
            callback(results);
        });
};

/**
 * 根据用户名获取用户
 * @param username
 * @param callback
 */
exports.getUserByUsername = function (username, callback) {
    if(username == '' || username == undefined) {
        callback(false);
    }
    DB.instance()
        .select('*')
        .from(this.table)
        .where('username', '=', username)
        .execute(this.db, callback);
};
