const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'david',
//     database: 'mpp'
// });

const connection = mysql.createConnection({
    host: 'database-1.c98m6ssew1p7.eu-north-1.rds.amazonaws.com',
    user: 'admin',
    password: 'davidmpp',
    database: 'database-1'
});

module.exports = connection;