var utils = new (require('./../utils.js'))();

class FinishProject {

  /**
   * Truncate the user table and test the finishProject procedure
   */
  async start(connection) {
    this.connection = connection;

    try {
      await this.truncate();
      await this.testFinishProject();
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

  async testFinishProject() {
    try {
      var groupStatus;

      // insert the admin
      try {
        await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/procedures/insertAdmin.sql`);
      } catch (error) {
        throw new Error(error);
      }
      try {
        await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/procedures/insertProject.sql`);
      } catch (error) {
        throw new Error(error);
      }
      
      // calls procedure finishProject and checks if there is an entry with the userid = 3 and projectid = 1
      await this.connection.query("CALL projectary_tests.finishProject(3, 1);"); 

      await this.connection.query("(SELECT EXISTS(SELECT `id`, `finishedin`, `finished` FROM project WHERE `id` LIKE 1 AND `finished` LIKE 1) as output)", 
      await function (error, results, fields) {
        //console.log(results[0]['output']);
        groupStatus=results[0]['output'];
        if (groupStatus == 1 ) {
          utils.log('success', 'finishProject procedure called successfully');
        } else {
          utils.log('fail', 'Failed to call the finishProject procedure');
        }
      });

    } catch (error) {
      utils.log('fail', 'Failed to test the finishProject procedure \n' + error);
      return;
    }
  }
}

module.exports = FinishProject;
