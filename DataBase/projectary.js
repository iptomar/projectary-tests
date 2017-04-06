var mysql = require('mysql');
var user = require('./user.js');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: '',
  database: 'projectary',
  multipleStatements: true // Run queries with multiple statements
});

connection.connect();
// Procedure testing

//
connection.end();
