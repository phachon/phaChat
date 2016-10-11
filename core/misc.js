/**
 * misc 杂项
 * Created by phachon@163.com
 */
var crypto = require('crypto');

var Misc = {

    /**
     * 获取字典的键并返回一个新的数组
     * @param data
     * @returns {Array}
     */
    array_keys: function (data) {
        var keys = [];
        for(var key in data) {
            keys.push(key);
        }

        return keys;
    },

    /**
     * 获取字典的值并返回一个新的数组
     * @param data
     * @returns {Array}
     */
    array_values: function (data) {
        var values = [];
        for (var key in data) {
            values.push(data[key]);
        }
        return values;
    },

    /**
     * md5 加密
     * @param content
     * @returns {*}
     */
    md5: function (content) {
        var md5 = crypto.createHash('md5');
        md5.update(content);
        return md5.digest('hex');
    }
};

module.exports = Misc;
