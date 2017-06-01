var utils = new (require('./../utils.js'))();

class EmailExists {

  /**
   * Truncate the user table and test the emailExists procedure
   */
  async start(connection) {
    this.connection = connection;

    try {
      await this.truncate();
      await this.testEmailExists();
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

  /**
   * 
   */
  async testEmailExists() {
    try {
      var emailStatus;

      // insert a user
      try {
        await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/procedures/insertUser.sql`);
      } catch (error) {
        throw new Error(error);
      }

      // calls procedure emailExists and checks if there is an user with the email 10001@ipt.pt
      await this.connection.query("CALL projectary_tests.emailExists('10001@ipt.pt', @output); SELECT @output as output;", 
      await function (error, results, fields) {
        //console.log(results[1][0]['output']);
        emailStatus=results[1][0]['output'];
        if (emailStatus == 1 ) {
          utils.log('success', 'emailExists procedure called successfully');
        } else {
          utils.log('fail', 'Failed to call the emailExists procedure');
        }
      });

    } catch (error) {
      utils.log('fail', 'Failed to test the emailExists procedure \n' + error);
      return;
    }
  }
}

module.exports = EmailExists;
