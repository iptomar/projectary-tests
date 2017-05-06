var utils = new (require('./utils.js'))();

class User {

	constructor() {
		// User generation parameters --------------------------------------------------
		this.nrUsers = 10;
		this.users = [""];
		this.passLength = 10;
	}

	// Functions for usergeneration ------------------------------------------------
	genUsers() {
		for (var i = 0; i <= this.nrUsers; i++) {
			this.users[i] = {
				//username: 'username' + i,
				name: 'Name' + i,
				password: utils.genPass(this.passLength),
				email: 'email' + i + '@ipt.pt',
				type: utils.genType(),
				// extid: i
			};
			//console.log(this.users[i]);
		}
		utils.log('success', 'Generated Users');
	}

	// User generation -------------------------------------------------------------
	// Insert new users from userlist ----------------------------------------------
	insertUsers(connection) {
		var users = this.users;

		for (var i = 0; i < users.length; i++) {
			// id ? username?
			connection.query('INSERT INTO user(name, typeid, email, password) VALUES (?, ?, ?, ?);',
				[users[i].name, users[i].type, users[i].email, users[i].password],
				function (error, results, fields) {
					if (error) throw error;
				});
		}

		connection.query('SELECT * FROM USER;',
			function (error, results, fields) {
				if (error) throw error;
			}
    );
		utils.log('success', 'Inserted Users');
	}

}

module.exports = User;
