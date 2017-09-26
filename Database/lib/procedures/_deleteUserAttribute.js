var utils = new (require('./../utils.js'))();

class DeleteUserAttribute {
	/**
   	* Truncate the project table and test the deleteUserAttribute procedure
   	*/
   	async start(connection) {
	    this.connection = connection;

	    try {
	    	await this.truncate();
	      	await this.testDeleteUserAttribute();
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
      		mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.userattribute;"
      		`, 'Truncated table userattribute', 'Failed to truncate table userattribute');
  	}
  	async testDeleteUserAttribute() {
    	try {
      		var deleteAttribute;

      		// insert a row in the table project
	      	try {
	        	await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/procedures/updateUserAttribute.sql`);
	      	} catch (error) {
	        	throw new Error(error);
	      	}

      		// call procedure
      		await this.connection.query("CALL deleteUserAttribute(1,1,'um');", await function (error, results, fields) {
	      		deleteAttribute = results;
        	});

			// check if the procedured worked 
			await this.connection.query("(SELECT EXISTS(select * from userattribute where userid like 1 and attributeid like 1 and value like 'teste') as output);", await function (error, results, fields) {
				if (deleteAttribute[0].length > 0 && results[0].length > 0) {
					utils.log('success', 'deleteUserAttribute procedure called successfully');
				}
				else {
					utils.log('fail', 'Failed to call the deleteUserAttribute procedure');
				}
			});
   		} catch (error) {
      		utils.log('fail', 'Failed to test the deleteUserAttribute procedure \n' + error);
      		return;
    	}
  	}
}

module.exports = DeleteUserAttribute;
