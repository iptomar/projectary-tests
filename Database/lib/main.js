var ini = require('ini');
var fs = require('fs');
var mysql = require('mysql');

// Loads modules
var database = new (require('./database.js'))();
var user = new (require('./user.js'))();
var entity = new (require('./entity.js'))();

// Loads MySQL config file
var config = ini.parse(fs.readFileSync('./.my.cnf', 'utf8'));

var connection = mysql.createConnection({
  host: 'localhost',
  user: config.client.user,
  password: config.client.password,
  database: 'projectary_tests',
  multipleStatements: true // Run queries with multiple statements
});

async function start() {
  try {
    await database.load();
    await connection.connect();
    // # User generation and insertion
    await user.genUsers();
    await user.insertUsers(connection);
    await connection.end();
  } catch (error) {
    await connection.end();
    return;
  }
}

module.exports.start = start;