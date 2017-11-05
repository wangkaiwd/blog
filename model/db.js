// 进行数据库的连接

let mysql = require("mysql");


let db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"bk"
});

module.exports = db;