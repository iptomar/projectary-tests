var ini = require('ini');
var fs = require('fs');
var mysql = require('mysql');
var utils = new (require('./utils.js'))();
var parseArgs = require('minimist');
const params = parseArgs(process.argv);
//default batch size
var batch = 2;
var options="";
var scripts="";
//tables scripts array
var tablesScripts = [];
//log file
var logfile = "results.log"
// Loads modules
var database = new (require('./database.js'))();
/*var activeUser = new (require('./procedures/activateUser.js'))();
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
*/


// Loads MySQL config file
var config = ini.parse(fs.readFileSync('./.my.cnf', 'utf8'));

var connection = mysql.createConnection({
  host: 'localhost',
  user: config.client.user,
  password: config.client.password,
  database: 'projectary_tests',
  multipleStatements: true // Run queries with multiple statements
});

//tests all or designated table
async function tableScript(tablesScripts, script) {
	var tested = 0;
	if(isNaN(script) || script==null)
	for (var i=0;i<tablesScripts.length;i++) {
		var name = tablesScripts[i].split('/').pop();
		if (script==null || (script!=null && script.toUpperCase()==name.split('/').pop().substring(0,name.indexOf('.')).toUpperCase())){
			var test = new (require("./tables/"+name))();
			await test.start(connection, logfile, batch);
			tested++;
				 // await utils.timer(1,10000,"Delaying until next test...");
		}
	}
	//checks if there was a valid test
	if (!tested) console.log("\r\nInvalid script name or missing file!");		
	console.log("\r\n");
}

async function CLI(params){
	//console.log(params);
	//CLI option -lt -tl Lists tables teste scripts
	if (params.l && params.t) { 
		console.log("\r\nAvailable table scripts:\r\n");
		for (var i=0; i<tablesScripts.length;i++){ 
			var name = tablesScripts[i].split('/').pop();
			console.log(name.split('/').pop().substring(0,name.indexOf('.')).toUpperCase());  }
		console.log("\r\n");
		}
	//CLI option -lp -pl Lists procedures test scripts
	else if (params.l && params.p) console.log("output procedure scripts");
	//CLI option -t tests specific script. Accpets script name and/or batch size
	else if (params.t!=null && params.t!=0 && params.t!=1 && !params.l) {
		if (parseInt(params._[2])>2) batch = parseInt(params._[2]); 
		await initDB();
		await tableScript(tablesScripts, params.t); }
	else if (params.p && params.l!=null && params.l!=0 && params.l!=1) console.log("test specific procedure"); 
	//CLI option -T tests all tables scripts. Accepts batch size
	else if (params.T || !isNaN(params.T)) {
		if (parseInt(params.T)>2) batch = parseInt(params.T);
		await initDB();		
		await tableScript(tablesScripts, null); 
	}
	//CLI option -P tests all procedures scripts. Accepts batch size
	else if (params.P) console.log ("test all procedures");
	//CLI option -A tests all tables and procedures scripts. Accepts batch size
	else if (params.A) console.log("test all");
	else //if (params.h || params.help || process.argv.length<3)	
	fs.readFile("./help.txt", 'utf8', function(err, data) {
		if (err) throw err;
		console.log(data);
	});	
}

async function initDB(){

    //starts database tests and their tables
    await console.log("\nGrabbing the database dump and test the integrity...");
    await database.start();
	//connects to database
    await console.log("\nConnected.\r\n");
    await connection.connect();
}

async function start() {
  try {
  	await utils.getScripts("./lib/tables/",".js",tablesScripts);
	await CLI(params);
	//dev area
    /**
     * Testing the database procedures
     */
	/*var proceduresScripts = [];
	await utils.getScripts("./lib/procedures/",".js",proceduresScripts);
	for (var i=0;i<proceduresScripts.length; i++) {
		var test = new (require("./procedures/"+proceduresScripts[i].split('/').pop()))();	
		await test.start(connection);
	*/
	//end of dev area
	await connection.end();
	console.log("\r\nTask finished.\r\n")
   } catch (error) {
    await connection.end();
    return;
  }
}

module.exports.start = start;