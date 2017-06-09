var utils = new (require('./../utils.js'))();

class IsAdmin {

  /**
   * Truncate the user table and test the isAdmin procedure
   */
  async start(connection) {
    this.connection = connection;

    try {
      await this.truncate();
      await this.testIsAdmin();
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
  }

  async testIsAdmin() {
    try {
      var adminStatus;

      // insert the a non activated user and an admin
      try {
        await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/procedures/insertNotActiveUser.sql`);
      } catch (error) {
        throw new Error(error);
      }

      
      // calls procedure isAdmin and checks if there is an admin with the id = 2
      await this.connection.query("CALL projectary_tests.isAdmin('2', @output); SELECT @output as output;", 
      await function (error, results, fields) {
        //console.log(results[1][0]['output']);
        adminStatus=results[1][0]['output'];
        if (adminStatus == 1 ) {
          utils.log('success', 'isAdmin procedure called successfully');
        } else {
          utils.log('fail', 'Failed to call the isAdmin procedure');
        }
      });

    } catch (error) {
      utils.log('fail', 'Failed to test the isAdmin procedure \n' + error);
      return;
    }
  }
}

module.exports = IsAdmin;
