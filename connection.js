const mysql = require("mysql");
const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"user_info"
});

    module.exports = con;