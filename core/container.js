/**
 * container 容器
 * @author phachon@163.com
 */
var path = require('path');

/**
 * require system module
 * @param name
 * @returns {*}
 */
exports.system = function (name) {
    return require(name);
};

/**
 * require business module
 * @param name
 * @returns {*}
 */
exports.business = function (name) {
    return require(path.join(global.BUSINESS, name));
};

/**
 * require controller module
 * @param name
 * @returns {*}
 */
exports.controller = function (name) {
    return require(path.join(global.CONTROLLER, name));
};

/**
 * require dao module
 * @param name
 * @returns {*}
 */
exports.dao = function (name) {
    return require(path.join(global.DAO, name));
};

/**
 * require model module
 * @param name
 * @returns {*}
 */
exports.model = function (name) {
    return require(path.join(global.MODEL, name));
};

/**
 * require core module
 * @param name
 * @returns {*}
 */
exports.core = function (name) {
    return require(path.join(global.COREPATH, name));
};