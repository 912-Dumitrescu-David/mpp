const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'david',
    database: 'mpp'
});
module.exports = connection;