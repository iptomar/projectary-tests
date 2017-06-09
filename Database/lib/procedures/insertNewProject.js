var utils = new (require('./../utils.js'))();

class insertNewProject {

  /**
   * Truncate the project table and test the insertNewProject procedure
   */
  async start(connection) {
    this.connection = connection;

    try {
      await this.truncate();
      await this.testInsertNewType();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Truncate the project and user table so we can test the procedure
   * without having other interferences
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.project;"
      `, 'Truncated table project', 'Failed to truncate table project');
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.user;"
      `, 'Truncated table user', 'Failed to truncate table user');
  }

  /**
   * 
   */
  async testInsertNewType() {
    try {
      var typeStatus;

      // insert a row in the table project
	  try {
	    await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/procedures/insertTeacher.sql`);
	  } catch (error) {
	    throw new Error(error);
	  }

      // calls procedure insertNewProject and inserts a new courseyear
      await this.connection.query("CALL projectary_tests.insertNewProject(2017, 1, 'teste', 'teste', 1);"); 

      await this.connection.query("(SELECT EXISTS(SELECT * FROM project WHERE `name` LIKE 'teste') as output)",      
      await function (error, results, fields) {
      	console.log(results[0]['output']);
        typeStatus=results[0]['output'];
        if (typeStatus == 1 ) {
          utils.log('success', 'insertNewProject procedure called successfully');
        } else {
          utils.log('fail', 'Failed to call the insertNewProject procedure');
        }
      });

    } catch (error) {
      utils.log('fail', 'Failed to test the insertNewProject procedure \n' + error);
      return;
    }
  }
}

module.exports = insertNewProject;