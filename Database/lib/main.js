var ini = require('ini');
var fs = require('fs');
var mysql = require('mysql');

// Loads modules
var database = new (require('./database.js'))();
var userType = new (require('./tables/type.js'))();
var user = new (require('./tables/user.js'))();
var school = new (require('./tables/school.js'))();
var course = new (require('./tables/course.js'))();
var group = new (require('./tables/group.js'))();
var project = new (require('./tables/project.js'))();
var application = new (require('./tables/application.js'))();
var attribute = new (require('./tables/attribute.js'))();
var courseyear = new (require('./tables/courseyear.js'))();
var groupuser = new (require('./tables/groupuser.js'))();
var projectattribute = new (require('./tables/projectattribute.js'))();
var projectteacher = new (require('./tables/projectteacher.js'))();
var userattribute = new (require('./tables/userattribute.js'))();

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
    // start database tests and their tables
    await database.start();
    
    await connection.connect();
    
    // start type of users table tests
    await userType.start(connection);
    // start user table tests
    await user.start(connection);
    // start school table tests
    await school.start(connection);
    // start course table tests
    await course.start(connection);
    // start group table tests
    await group.start(connection);
    // start project table tests
    await project.start(connection);
    // start application table tests
    await application.start(connection);
     // start attribute table tests
    await attribute.start(connection);
    // start courseyear table tests
    await courseyear.start(connection);
    // start groupuser table tests
    await groupuser.start(connection);
    // start projectattribute table tests
    await projectattribute.start(connection);
    // start projectteacher  table tests
    await projectteacher.start(connection);
    // start userattribute table tests
    await userattribute.start(connection);

    await connection.end();
  } catch (error) {
    await connection.end();
    return;
  }
}

module.exports.start = start;