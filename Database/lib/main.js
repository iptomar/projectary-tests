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
var activeUser = new (require('./procedures/activateUser.js'))();
//var addToGroup = new (require('./procedures/addToGroup.js'))();
//var deleteGroup = new (require('./procedures/deleteGroup.js'))();
//var DeleteUserAttribute = new (require('./procedures/DeleteUserAttribute.js'))();
//var descExists = new (require('./procedures/descExists.js'))();
//var editGroup = new (require('./procedures/editGroup.js'))();
var emailExists = new (require('./procedures/emailExists.js'))();
//var externalExists = new (require('./procedures/externalExists.js'))();
//var insertNewApplication = new (require('./procedures/insertNewApplication.js'))();
//var insertNewCourse = new (require('./procedures/insertNewCourse.js'))();
//var InsertNewCourseYear = new (require('./procedures/InsertNewCourseYear.js'))();
//var insertNewGroup = new (require('./procedures/insertNewGroup.js'))();
//var insertNewProject = new (require('./procedures/insertNewProject.js'))();
//var insertNewType = new (require('./procedures/insertNewType.js'))();
//var insertNewUser = new (require('./procedures/insertNewUser.js'))();
//var InsertUserAttribute = new (require('./procedures/InsertUserAttribute.js'))();
//var isAdmin = new (require('./procedures/isAdmin.js'))();
//var isInGroup = new (require('./procedures/isInGroup.js'))();
//var isInProject = new (require('./procedures/isInProject.js'))();
//var isStudent = new (require('./procedures/isStudent.js'))();
//var isTeacher = new (require('./procedures/isTeacher.js'))();
//var listApplications = new (require('./procedures/listApplications.js'))();
//var listCouses = new (require('./procedures/listCouses.js'))();
//var listGroupDetails = new (require('./procedures/listGroupDetails.js'))();
//var listGroups = new (require('./procedures/listGroups.js'))();
//var listProjects = new (require('./procedures/listProjects.js'))();
//var listSchools = new (require('./procedures/listSchools.js'))();
//var UpdateUserAttribute = new (require('./procedures/UpdateUserAttribute.js'))();



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

    // start activeUser procedure test
    await activeUser.start(connection);
    // start emailExists procedure test
    await emailExists.start(connection);

    // start addToGroup procedure test
    //await addToGroup.start(connection);

    // start deleteGroup procedure test
    //await deleteGroup.start(connection);

    // start DeleteUserAttribute procedure test
    //await DeleteUserAttribute.start(connection);

    // start descExists procedure test
    //await descExists.start(connection);

    // start editGroup procedure test
    //await editGroup.start(connection);

    // start externalExists procedure test
    //await externalExists.start(connection);

    // start insertNewApplication procedure test
    //await insertNewApplication.start(connection);

    // start insertNewCourse procedure test
    //await insertNewCourse.start(connection);

    // start InsertNewCourseYear procedure test
    //await InsertNewCourseYear.start(connection);

    // start insertNewGroup procedure test
    //await insertNewGroup.start(connection);

    // start insertNewProject procedure test
    //await insertNewProject.start(connection);

    // start insertNewType procedure test
    //await insertNewType.start(connection);

    // start insertNewUser procedure test
    //await insertNewUser.start(connection);

    // start InsertUserAttribute procedure test
    //await InsertUserAttribute.start(connection);

    // start isAdmin procedure test
    //await isAdmin.start(connection);

    // start isInGroup procedure test
    //await isInGroup.start(connection);

    // start isInProject procedure test
    //await isInProject.start(connection);

    // start isStudent procedure test
    //await isStudent.start(connection);

    // start isTeacher procedure test
    //await isTeacher.start(connection);

    // start listApplications procedure test
    //await listApplications.start(connection);

    // start listCouses procedure test
    //await listCouses.start(connection);

    // start listGroupDetails procedure test
    //await listGroupDetails.start(connection);

    // start listGroups procedure test
    //await listGroups.start(connection);

    // start listProjects procedure test
    //await listProjects.start(connection);

    // start listSchools procedure test
    //await listSchools.start(connection);

    // start UpdateUserAttribute procedure test
    //await UpdateUserAttribute.start(connection);

    await connection.end();
  } catch (error) {
    await connection.end();
    return;
  }
}

module.exports.start = start;