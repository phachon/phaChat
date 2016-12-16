/**
 * Prompt 提示信息 json
 * @author phachon@163.com
 */

/**
 * 错误返回 json
 */
exports.error = function (error, redirect) {

    var data = {
        code: 0,
        message: error,
        redirect: redirect,
        data: []
    };
    return data;
};

/**
 * 成功返回json
 */
exports.success = function (message, redirect) {
    
    var data = {
        code: 1,
        message: message,
        redirect: redirect,
        data: []
    };
    return data;
};
