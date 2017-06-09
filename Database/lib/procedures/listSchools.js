var utils = new (require('./../utils.js'))();

class ListSchools {
	/**
   	* Truncate the project table and test the listSchools procedure
   	*/
   	async start(connection) {
	    this.connection = connection;

	    try {
	    	await this.truncate();
	      	await this.testListSchools();
	    } catch (error) {
	      	throw new Error(error.message);
	    }
  	}

  	/**
   	* Truncate the school table so we can test the procedure
   	* without having other interferences
   	*/
   	async truncate() {
    	await utils.cmd(`
      		mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.school;"
      		`, 'Truncated table school', 'Failed to truncate table school');
  	}
  	async testListSchools() {
    	try {
      		var listSchool;

      		// insert a row in the table project
	      	try {
	        	await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/procedures/insertSchools.sql`);
	      	} catch (error) {
	        	throw new Error(error);
	      	}

      		// check if the procedured worked #1
      		await this.connection.query('CALL listSchools();', await function (error, results, fields) {
	      		listSchool = results;
        	});

			// check if the procedured worked #2
			await this.connection.query('CALL listSchools();', await function (error, results, fields) {
				if (listSchool[0].length > 0 && results[0].length > 0) {
					utils.log('success', 'listSchools procedure called successfully');
				}
				else {
					utils.log('fail', 'Failed to call the listSchools procedure');
				}
			});
   		} catch (error) {
      		utils.log('fail', 'Failed to test the listSchools procedure \n' + error);
      		return;
    	}
  	}
}

module.exports = ListSchools;