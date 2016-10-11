/**
 * author
 * Created by phachon@163.com
 */

exports.isLogin = function(req, res, next) {
    if (!req.session.user) {
        console.log('no login');
        res.redirect('/author/index');
    } else {
        next();
    }
};



