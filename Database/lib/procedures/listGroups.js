var utils = new (require('./../utils.js'))();

class listGroups {
	/**
   * Truncate the user table and test the listGroups procedure
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
    	await utils.cmd(`
      		mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.group;"
      		`, 'Truncated table group', 'Failed to truncate table group');
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

      		// check if the procedured worked
      		await this.connection.query("CALL projectary_tests.listGroups(3)",
      		await function (error, results, fields) {
        		if (results[0].length > 0) {
          			utils.log('success', 'listGroups procedure called successfully');
        		} else {
					      utils.log('fail', 'Failed to call the listGroups procedure');
        		}
      		});
  		} catch (error) {
      		utils.log('fail', 'Failed to test the listGroups procedure \n' + error);
      		return;
    	}
  	}
}

module.exports = listGroups;