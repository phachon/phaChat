/**
 * model user
 * Created by phachon@163.com.
 */
var DB = require('../core/db');
var Misc = require('../core/misc');

function UserModel() {

    this.db = 'phachat';
    this.table = 'chat_user';
    this.primaryKey = 'user_id';
}

/**
 * user add
 * @param values
 * @param callback
 */
UserModel.prototype.add = function (values, callback) {

    DB.instance()
        .insert(this.table)
        .columns(Misc.array_keys(values))
        .values(Misc.array_values(values))
        .execute(this.db, function (results) {
            callback(results);
        });
};

/**
 * get all user
 * @param callback
 */
UserModel.prototype.getUsers = function (callback) {

    DB.instance()
        .select('*')
        .from('chat_user')
        .execute('phachat', callback);
};

/**
 * get user by username
 * @param username
 * @param callback
 */
UserModel.prototype.getUserByUsername = function (username, callback) {

    if(username == '' || username == undefined) {
        callback(false);
    }

    DB.instance()
        .select('*')
        .from(this.table)
        .where('username', '=', username)
        .execute(this.db, callback);
};

/**
 * get user by user_id
 * @param userId
 * @param callback
 */
UserModel.prototype.getUserByUserId = function (userId, callback) {
    if(userId == undefined || !userId) {
        callback(false);
    }

    DB.instance()
        .select('*')
        .from(this.table)
        .where(this.primaryKey, '=', userId)
        .execute(this.db, callback);
};

/**
 * update user by user_id
 * @param values
 * @param userId
 * @param callback
 */
UserModel.prototype.updateUserByUserId = function (values, userId, callback) {
    if(userId == undefined || !userId) {
        callback(false);
    }

    DB.instance()
        .update(this.table)
        .set(values)
        .where(this.primaryKey, '=', userId)
        .execute(this.db, callback);
};

module.exports = UserModel;