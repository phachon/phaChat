/**
 * mysql-database
 * Created by phachon@163.com
 */
var mysql = require('mysql');
var config = require('config');


function Database(database) {
    this.dbconfig = config.get('mysql.' + database);
}

Database.prototype.query = function (sql, callback) {
    var connection = mysql.createConnection(this.dbconfig);
    connection.connect();
    connection.query(sql, function(err, rows, fields) {
        if(err) throw err;
        callback(rows);
    });
    connection.end();
};

module.exports = Database;
