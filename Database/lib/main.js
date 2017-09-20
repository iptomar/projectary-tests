var ini = require('ini');
var fs = require('fs');
var mysql = require('mysql');
var utils = new (require('./utils.js'))();
//default batch size
var batch = 1;
//if valid arguments are provided accpept them as desired batch size
if (process.argv[1]!=null && parseInt(process.argv[2])>0) batch = parseInt(process.argv[2]);
// Loads modules
var database = new (require('./database.js'))();

var activeUser = new (require('./procedures/activateUser.js'))();
//var addToGroup = new (require('./procedures/addToGroup.js'))();
//var deleteGroup = new (require('./procedures/deleteGroup.js'))();
//var deleteUserAttribute = new (require('./procedures/deleteUserAttribute.js'))();
var descExists = new (require('./procedures/descExists.js'))();
//var editGroup = new (require('./procedures/editGroup.js'))();
var emailExists = new (require('./procedures/emailExists.js'))();
var externalExists = new (require('./procedures/externalExists.js'))();
var finishProject = new (require('./procedures/finishProject.js'))();
//var insertGrade = new (require('./procedures/insertGrade.js'))();
//var insertNewApplication = new (require('./procedures/insertNewApplication.js'))();
var insertNewCourse = new (require('./procedures/insertNewCourse.js'))();
var insertNewCourseYear = new (require('./procedures/insertNewCourseYear.js'))();
//var insertNewGroup = new (require('./procedures/insertNewGroup.js'))();
var insertNewProject = new (require('./procedures/insertNewProject.js'))();
var insertNewType = new (require('./procedures/insertNewType.js'))();
var insertNewUser = new (require('./procedures/insertNewUser.js'))();
var insertUserAttribute = new (require('./procedures/insertUserAttribute.js'))();
var isAdmin = new (require('./procedures/isAdmin.js'))();
var isInGroup = new (require('./procedures/isInGroup.js'))();
var isInProject = new (require('./procedures/isInProject.js'))();
var isStudent = new (require('./procedures/isStudent.js'))();
var isTeacher = new (require('./procedures/isTeacher.js'))();
//var listApplications = new (require('./procedures/listApplications.js'))();
var listCourses = new (require('./procedures/listCourses.js'))();
var listGroupDetails = new (require('./procedures/listGroupDetails.js'))();
var listGroups = new (require('./procedures/listGroups.js'))();
var listProjects = new (require('./procedures/listProjects.js'))();
var listSchools = new (require('./procedures/listSchools.js'))();
var updateUserAttribute = new (require('./procedures/updateUserAttribute.js'))();



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
    /**
     * start database tests and their tables
     */
    await console.log("\nGrabbing the database dump and test the integrity of it:");
    await database.start();
    
    /**
     * Connect to the database
     */
    await connection.connect();
    
    /**
     * Testing the database tables
     */
    await console.log('\nTesting the database tables injecting ' + batch + ' rows on each:');
	//dev area
	
	var tablesScripts = [];
	await utils.getScripts("./lib/tables/",".js",tablesScripts);
	for (var i=0;i<tablesScripts.length; i++) {
		var test = new (require("./tables/"+tablesScripts[i].split('/').pop()))();	
		await test.start(connection);
	}
	
	//end of dev area
	
    /**
     * Testing the database procedures
     */
	await console.log("\nTesting the database procedures:");

	//dev area
	
	var proceduresScripts = [];
	await utils.getScripts("./lib/procedures/",".js",proceduresScripts);
	for (var i=0;i<proceduresScripts.length; i++) {
		var test = new (require("./procedures/"+proceduresScripts[i].split('/').pop()))();	
		await test.start(connection);
	}
	

    await connection.end();
  } catch (error) {
    await connection.end();
    return;
  }
}

module.exports.start = start;