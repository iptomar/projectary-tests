var utils = new (require('./../utils.js'))();

class IsInProject {

  /**
   * Truncate the user table and test the isInProject procedure
   */
  async start(connection) {
    this.connection = connection;

    try {
      await this.truncate();
      await this.testIsInProject();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Truncate the groupuser table so we can test the procedure
   * without having other interferences
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.groupuser;"
      `, 'Truncated table groupuser', 'Failed to truncate table groupuser');
  }

  async testIsInProject() {
    try {
      var projectStatus;

      // insert the a non activated user and an admin
      try {
        await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/procedures/insertGroupUser.sql`);
      } catch (error) {
        throw new Error(error);
      }

      
      // calls procedure isInProject and checks if there is an user in a project with the id = 3
      await this.connection.query("CALL projectary_tests.isInProject(3, @output); SELECT @output as output;", 
      await function (error, results, fields) {
        //console.log(results[1][0]['output']);
        projectStatus=results[1][0]['output'];
        if (projectStatus == 1 ) {
          utils.log('success', 'isInProject procedure called successfully');
        } else {
          utils.log('fail', 'Failed to call the isInProject procedure');
        }
      });

    } catch (error) {
      utils.log('fail', 'Failed to test the isInProject procedure \n' + error);
      return;
    }
  }
}

module.exports = IsInProject;
