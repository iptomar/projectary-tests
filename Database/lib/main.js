var ini = require('ini');
var fs = require('fs');
var mysql = require('mysql');
var utils = new (require('./utils.js'))();
var parseArgs = require('minimist');
const params = parseArgs(process.argv);
//default batch size
var batch = 2;
//time in ms between tests to make sure mysql settles after each one
var delay=0;
//recomended ratio between batch size and delay to assure reduced load on mysql
const ratio=5;
var options="";
var scripts="";
//tables scripts array
var tablesScripts = [];
//procedures scripts array
var procsScripts = [];
//log files
var tLogFile = "tResults.log"
var pLogFile = "pResults.log"
// Loads modules
var database = new (require('./database.js'))();
/*
k var activeUser = new (require('./procedures/activateUser.js'))();
k //var addToGroup = new (require('./procedures/addToGroup.js'))();
k //var deleteGroup = new (require('./procedures/deleteGroup.js'))();
k //var deleteUserAttribute = new (require('./procedures/deleteUserAttribute.js'))();
k var descExists = new (require('./procedures/descExists.js'))();
k //var editGroup = new (require('./procedures/editGroup.js'))();
k var emailExists = new (require('./procedures/emailExists.js'))();
k var externalExists = new (require('./procedures/externalExists.js'))();
k var finishProject = new (require('./procedures/finishProject.js'))();
k //var insertGrade = new (require('./procedures/insertGrade.js'))();
k //var insertNewApplication = new (require('./procedures/insertNewApplication.js'))();
k var insertNewCourse = new (require('./procedures/insertNewCourse.js'))();
k var insertNewCourseYear = new (require('./procedures/insertNewCourseYear.js'))();
k //var insertNewGroup = new (require('./procedures/insertNewGroup.js'))();
k var insertNewProject = new (require('./procedures/insertNewProject.js'))();
k var insertNewType = new (require('./procedures/insertNewType.js'))();
k var insertNewUser = new (require('./procedures/insertNewUser.js'))();
k var insertUserAttribute = new (require('./procedures/insertUserAttribute.js'))();
k var isInProject = new (require('./procedures/isInProject.js'))();
k var isStudent = new (require('./procedures/isStudent.js'))();
k var isTeacher = new (require('./procedures/isTeacher.js'))();
k //var listApplications = new (require('./procedures/listApplications.js'))();
k var listCourses = new (require('./procedures/listCourses.js'))();
k var listGroupDetails = new (require('./procedures/listGroupDetails.js'))();
k var listGroups = new (require('./procedures/listGroups.js'))();
k var listProjects = new (require('./procedures/listProjects.js'))();
k var listSchools = new (require('./procedures/listSchools.js'))();
k var updateUserAttribute = new (require('./procedures/updateUserAttribute.js'))();
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

//tests all or designated script
async function scriptTest(scriptArray, path, script) {
	var tested = 0;
	if(isNaN(script) || script==null)
	for (var i=0;i<scriptArray.length;i++) {
		var name = scriptArray[i].split('/').pop();
		if (script==null || (script!=null && script.toUpperCase()==name.split('/').pop().substring(0,name.indexOf('.')).toUpperCase())){
			var test = new (require(path+name))();
			if (path.includes("tab")? logfile=tLogFile:logfile=pLogFile);
			await test.start(connection, logfile, batch).then(	
			function() { 
				if(script==null){
				utils.log('warning', "Waiting...\r\n");
				//Forces delay between tests to assure low mysql server load after previous test
				return new Promise(async function(resolve, reject) {
				await setTimeout(function() {
				utils.log('success', "Resuming...");
				  resolve();
				}, delay);
			  });			
			}} );
			await tested++;
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
	else if (params.l && params.p) { 
		console.log("\r\nAvailable procedures scripts:\r\n");
		for (var i=0; i<procsScripts.length;i++){ 
			var name = procsScripts[i].split('/').pop();
			console.log(name.split('/').pop().substring(0,name.indexOf('.')).toUpperCase());  }
		console.log("\r\n");
		}
	//CLI option -t tests specific table script. Accepts script name and/or batch size
	else if (params.t!=null && params.t!=0 && params.t!=1 && !params.l) {
		if (parseInt(params._[2])>2) batch = parseInt(params._[2]); 
		await initDB();
		await scriptTest(tablesScripts, "./tables/", params.t); }
	//CLI option -p tests specific procedure script. Accepts script name and/or batch size
	else if (params.p!=null && params.p!=0 && params.p!=1 && !params.l) {
		if (parseInt(params._[2])>2) batch = parseInt(params._[2]); 
		await initDB();
		await scriptTest(procsScripts, "./procedures/", params.p); }
	//CLI option -T tests all tables scripts. Accepts batch size and delay -d
	else if (params.T || !isNaN(params.T)) {
		if (parseInt(params.T)>2) batch = parseInt(params.T);
		await initDB();		
		//if not set by user sets delay for a safe value
		if (params.d>0? delay=params.d : delay=batch/ratio);
		console.log("\r\nUsing a " + delay + " ms delay between tests.\r\n");
		await scriptTest(tablesScripts, "./tables/", null); 
	}
	//CLI option -P tests all procedures scripts. Accepts batch size
	else if (params.P || !isNaN(params.P)) {
		if (parseInt(params.P)>2) batch = parseInt(params.P);
		await initDB();		
		//if not set by user sets delay for a safe value
		if (params.d>0? delay=params.d : delay=batch/ratio);
		console.log("\r\nUsing a " + delay + " ms delay between tests.\r\n");
		await scriptTest(procsScripts, "./procedures/", null); 
	}
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
  	await utils.getScripts("./lib/procedures/",".js",procsScripts);
	await CLI(params);
	await connection.end();
	console.log("\r\nTask finished.\r\n")
   } catch (error) {
		await connection.end();
     return;
   }
}

module.exports.start = start;