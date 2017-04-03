var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: '',
  database: 'projectary',
  multipleStatements: true // Run queries with multiple statements
});
// User generation parameters --------------------------------------------------
var nrUsers = 2000;
var users = [""];
var passLength = 10;
// Functions for usergeneration ------------------------------------------------
function genUsers() {
  for (var i = 0; i <= nrUsers; i++) {
    users[i] = {
      username: 'aluno' + i,
	  password: genPass(passLength),
	  name: 'Utilizador' + i,
	  email: 'utilizador' + i + '@ipt.pt',
      type: genType(),
      extid: i
    };
    console.log(users[i]);
  }
}
function genType() {
  var rng = Math.random();
  if (rng < 0.5) { return 1;} 
  else { return 2;}
}
function genPass(passLength) {
  var alphaNum = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var pass = "";
  for (var i = 0; i < passLength; i++) {
    var j = Math.floor(Math.random() * alphaNum.length);
    pass += alphaNum.charAt(j);
  }
  return pass;
}
// User generation -------------------------------------------------------------
// Comment this line if you do not want user generation
genUsers();

connection.connect();

// Insert new users from userlist ----------------------------------------------
/*for(var i = 0; i < users.length; i++){
	connection.query('CALL API_InsertNewUser(?,?,?,?,?,?);', 
	[users[i].username, users[i].password, 
	users[i].name, users[i].email, users[i].type, users[i].extid], function (error, results, fields) {
	  if (error) throw error;
	});	
}*/

// Insert new entities ---------------------------------------------------------
/*for(var i = 0; i < users.length; i++){
	connection.query('CALL InsertNewEntity(?,?,?);', 
	[users[i].name, users[i].type, users[i].extid], function (error, results, fields) {
	  if (error) throw error;
	});	
}*/

connection.end();
