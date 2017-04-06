'use strict';

var utils = new (require('./utils.js'))();

class User {

	constructor(){
    	// User generation parameters --------------------------------------------------
    	this.nrUsers = 2000;
    	this.users = [""];
    	this.passLength = 10;
	}

	// Functions for usergeneration ------------------------------------------------
	genUsers() {
	  for (var i = 0; i <= this.nrUsers; i++) {
	    this.users[i] = {
	      username: 'username' + i,
		  password: utils.genPass(this.passLength),
		  name: 'Name' + i,
		  email: 'email' + i + '@ipt.pt',
	      type: utils.genType(),
	      extid: i
	    };
		console.log(this.users[i]);
	  }
	}
	
	// User generation -------------------------------------------------------------
	// Insert new users from userlist ----------------------------------------------
	insertUsers(connection) {
		var users = this.users;
		
		for(var i = 0; i < users.length; i++){
			connection.query('CALL API_InsertNewUser(?,?,?,?,?,?);',
			[users[i].username, users[i].password,
			users[i].name, users[i].email, users[i].type, users[i].extid], function (error, results, fields) {
			  if (error) throw error;
			});
		}
	}

}

module.exports = User;