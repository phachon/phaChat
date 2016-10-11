/**
 * Prompt 提示信息 json
 * Created by phachon@163.com
 */

var Prompt = {

    /**
     * code
     */
    code: 0,

    /**
     * message
     */
    message: [],

    /**
     * data
     */
    data: [],

    /**
     * 错误返回
     * @param error
     * @param redirect
     * @returns {*}
     */
    error: function (error, redirect) {
        var data = {
            code: 0,
            message: error,
            redirect: redirect,
            data: []
        };
        return data;
    },

    /**
     * 成功返回
     * @param message
     * @param redirect
     * @returns {*}
     */
    success: function (message, redirect) {
        var data = {
            code: 1,
            message: message,
            redirect: redirect,
            data: []

        };

        return data;
    }
};

module.exports = Prompt;
