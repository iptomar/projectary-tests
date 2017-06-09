var utils = new (require('./../utils.js'))();

class IsStudent {

  /**
   * Truncate the user table and test the isStudent procedure
   */
  async start(connection) {
    this.connection = connection;

    try {
      await this.truncate();
      await this.testIsStudent();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Truncate the user and type table so we can test the procedure
   * without having other interferences
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.user;"
      `, 'Truncated table user', 'Failed to truncate table user');
      await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.type;"
      `, 'Truncated table type', 'Failed to truncate table type');
  }

  async testIsStudent() {
    try {
      var studentStatus;

      // insert the a non activated user and an admin
      try {
        await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/procedures/insertUser.sql`);
        await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/procedures/insertType.sql`);
      } catch (error) {
        throw new Error(error);
      }

      
      // calls procedure isStudent and checks if there is an student with the id = 1
      await this.connection.query("CALL projectary_tests.isStudent(1, @output); SELECT @output as output;", 
      await function (error, results, fields) {
        //console.log(results[1][0]['output']);
        studentStatus=results[1][0]['output'];
        if (studentStatus == 1 ) {
          utils.log('success', 'isStudent procedure called successfully');
        } else {
          utils.log('fail', 'Failed to call the isStudent procedure');
        }
      });

    } catch (error) {
      utils.log('fail', 'Failed to test the isStudent procedure \n' + error);
      return;
    }
  }
}

module.exports = IsStudent;
