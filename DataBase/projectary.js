var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: '',
  database: 'projectary',
  multipleStatements: true // Run queries with multiple statements
});
// User generation parameters --------------------------------------------------
var nrUsers = 20000;
var users = [""];
var passLenth = 10;
// Functions for usergeneration ------------------------------------------------
function genUsers() {
  for (var i = 0; i <= nrUsers; i++) {
    users[i] = {
      username: 'User' + i,
      password: genPass(passLenth),
      email: 'User' + i + '@mail.com',
      type: genType(),
      extid: i
    };
    console.log(users[i]);
  }
}
function genType() {
  var rng = Math.random();
  if (rng < 0.5) {
    return 1;
  } else {
    return 2;
  }
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
// DB Queries ------------------------------------------------------------------
connection.connect();
// Insert new users from userlist ----------------------------------------------
// NOT WORKING
connection.query('CALL InsertNewUser(?)', users, function (error, results, fields) {
  if (error) throw error;
});
connection.end();