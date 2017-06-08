var utils = new (require('./../utils.js'))();

class listProjects {
	/**
   	* Truncate the project table and test the listProjects procedure
   	*/
   	async start(connection) {
	    this.connection = connection;

	    try {
	    	await this.truncate();
	      	await this.testListProjects();
	    } catch (error) {
	      	throw new Error(error.message);
	    }
  	}

  	/**
   	* Truncate the userattribute table so we can test the procedure
   	* without having other interferences
   	*/
   	async truncate() {
    	await utils.cmd(`
      		mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.project;"
      		`, 'Truncated table project', 'Failed to truncate table project');
  	}
  	async testListProjects() {
    	try {
      		var listNull;

      		// insert a row in the table project
	      	try {
	        	await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/procedures/insertProject.sql`);
	      	} catch (error) {
	        	throw new Error(error);
	      	}

      		// check if the procedured worked #1
      		await this.connection.query('CALL listProjects(1,2017,0);', await function (error, results, fields) {
	      		listNull = results;
        	});

			// check if the procedured worked #2
			await this.connection.query('CALL listProjects(2,2017,1);', await function (error, results, fields) {
				if (listNull.length > 0 && results.length > 0) {
					utils.log('success', 'listProjects procedure called successfully');
				}
				else {
					utils.log('fail', 'Failed to call the listProjects procedure');
				}
			});
   		} catch (error) {
      		utils.log('fail', 'Failed to test the listProjects procedure \n' + error);
      		return;
    	}
  	}
}

module.exports = listProjects;