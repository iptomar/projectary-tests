'use strict';

var mysql = require('mysql');
var user = new (require('./user.js'))();

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: '',
  database: 'projectary',
  multipleStatements: true // Run queries with multiple statements
});

connection.connect();

// Procedure testing
user.genUsers();
user.insertUsers(connection);

connection.end();
