var exec = require('child_process').execSync;
var fs = require('fs');
var ini = require('ini');
var mysql = require('mysql');
var user = new (require('./user.js'))();
var entity = new (require('./entity.js'))();

// Loads MySQL config file
var config = ini.parse(fs.readFileSync('./.my.cnf', 'utf8'));

/**
 * Gets the latest database dump file from upstream and duplicates 
 * the database from projectary-master to the new projectary-tests.
 * This database is only for testing purposes of this program
 */
exec('sh ./loadDB.sh', {stdio:[0,1,2]}, function (error, stdout, stderr) {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(stdout);
});

/**
 * Database connection
 */
var connection = mysql.createConnection({
  host: 'localhost',
  user: config.client.user,
  password: config.client.password,
  database: 'projectary_tests',
  multipleStatements: true // Run queries with multiple statements
});
connection.connect();

// User generation and insertion
user.genUsers();
//user.insertUsers(connection);

// Entity generation and insertion
entity.genEntity();
//entity.insertEntity(connection);

connection.end();
