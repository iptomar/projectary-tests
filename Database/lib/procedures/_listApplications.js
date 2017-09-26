var utils = new (require('./../utils.js'))();

class listApplications {
	/**
   * Truncate the user table and test the listApplications procedure
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
   	* Truncate the user and application table so we can test the procedure
   	* without having other interferences
   	*/
   	async truncate() {
    	await utils.cmd(`
      		mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.user;"
      		`, 'Truncated table user', 'Failed to truncate table user');
    	await utils.cmd(`
      		mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.application;"
      		`, 'Truncated table application', 'Failed to truncate table application');
    	await utils.cmd(`
      		mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.group;"
      		`, 'Truncated table group', 'Failed to truncate table group');
    	await utils.cmd(`
      		mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.groupuser;"
      		`, 'Truncated table groupuser', 'Failed to truncate table groupuser');
  	}

  	async testIsTeacher() {
  		try {
  			var admin;

  			// insert a row in the table user
  			try {
        		await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/procedures/insertAdmin.sql`);
      		} catch (error) {
        		throw new Error(error);
      		}

      		// insert a row in the table group
  			try {
        		await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/procedures/insertGroup.sql`);
      		} catch (error) {
        		throw new Error(error);
      		}

      		// insert a row in the table groupuser
  			try {
        		await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/procedures/insertGroupUser.sql`);
      		} catch (error) {
        		throw new Error(error);
      		}

      		// insert a row in the table application
  			try {
        		await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/procedures/insertApplication.sql`);
      		} catch (error) {
        		throw new Error(error);
      		}

      		// check if the procedured worked
      		await this.connection.query("CALL projectary_tests.listApplications(3,2,0)",
      		await function (error, results, fields) {
        		if (results[0].length > 0) {
          			utils.log('success', 'listApplications procedure called successfully');
        		} else {
					utils.log('fail', 'Failed to call the listApplications procedure');
        		}
      		});
      		await this.connection.query("CALL projectary_tests.listApplications(3,1,1)",
      		await function (error, results, fields) {
        		if (results[0].length > 0) {
          			utils.log('success', 'listApplications procedure called successfully');
        		} else {
					utils.log('fail', 'Failed to call the listApplications procedure');
        		}
      		});
  		} catch (error) {
      		utils.log('fail', 'Failed to test the listApplications procedure \n' + error);
      		return;
    	}
  	}
}

module.exports = listApplications;