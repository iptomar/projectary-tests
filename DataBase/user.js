var utils = require('./utils.js');
// User generation parameters --------------------------------------------------
var nrUsers = 2000;
var users = [""];
var passLength = 10;
// Functions for usergeneration ------------------------------------------------
function genUsers() {
  for (var i = 0; i <= nrUsers; i++) {
    users[i] = {
      username: 'username' + i,
	  password: utils.genPass(passLength),
	  name: 'Name' + i,
	  email: 'email' + i + '@ipt.pt',
      type: utils.genType(),
      extid: i
    };
	console.log(users[i]);
  }
}
// User generation -------------------------------------------------------------
// Insert new users from userlist ----------------------------------------------
for(var i = 0; i < users.length; i++){
	connection.query('CALL API_InsertNewUser(?,?,?,?,?,?);',
	[users[i].username, users[i].password,
	users[i].name, users[i].email, users[i].type, users[i].extid], function (error, results, fields) {
	  if (error) throw error;
	});
}
