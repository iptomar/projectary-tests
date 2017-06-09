var utils = new (require('./../utils.js'))();

class listCourses {
	/**
   * Truncate the user table and test the listCourses procedure
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
   	* Truncate the course table so we can test the procedure
   	* without having other interferences
   	*/
   	async truncate() {
    	await utils.cmd(`
      		mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.course;"
      		`, 'Truncated table course', 'Failed to truncate table course');
  	}

  	async testIsTeacher() {
  		try {
  			var admin;

  			// insert a row in the table course
  			try {
        		await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/procedures/insertCourse.sql`);
      		} catch (error) {
        		throw new Error(error);
      		}

      		// check if the procedured worked
      		await this.connection.query("CALL projectary_tests.listCourses(1)",
      		await function (error, results, fields) {
        		if (results[0].length > 0) {
          			utils.log('success', 'listCourses procedure called successfully');
        		} else {
					      utils.log('fail', 'Failed to call the listCourses procedure');
        		}
      		});
  		} catch (error) {
      		utils.log('fail', 'Failed to test the listCourses procedure \n' + error);
      		return;
    	}
  	}
}

module.exports = listCourses;