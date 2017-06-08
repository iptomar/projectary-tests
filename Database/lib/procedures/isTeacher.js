var utils = new (require('./../utils.js'))();

class isTeacher {
	/**
   * Truncate the user table and test the isTeacher procedure
   */
  	async start(connection) {
   		this.connection = connection;

    	try {
	      await this.truncate();
	      await this.testIsTeacher();
    	} catch (error) {
      		throw new Error(error.message);
    	}
  	}

  	/**
   	* Truncate the user table so we can test the procedure
   	* without having other interferences
   	*/
   	async truncate() {
    	await utils.cmd(`
      		mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.user;"
      		`, 'Truncated table user', 'Failed to truncate table user');
  	}

  	async testIsTeacher() {
  		try {
  			var teacher;

  			// insert a row in the table user
  			try {
        		await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/procedures/insertTeacher.sql`);
      		} catch (error) {
        		throw new Error(error);
      		}

      		// get the status of active row of the table user
      		await this.connection.query('SELECT typeid FROM user WHERE id=1;', await function (error, results, fields) {
       			teacher = results[0].typeid;
      		});

      		// check if the procedured worked
      		await this.connection.query("CALL projectary_tests.isTeacher(1,@output); SELECT @output as output",
      		await function (error, results, fields) {
        		if (teacher == 2 && results[1][0]['output'] == 1) {
          			utils.log('success', 'isTeacher procedure called successfully');
        		} else {
					utils.log('fail', 'Failed to call the isTeacher procedure');
        		}
      		});
  		} catch (error) {
      		utils.log('fail', 'Failed to test the isTeacher procedure \n' + error);
      		return;
    	}
  	}
}

module.exports = isTeacher;