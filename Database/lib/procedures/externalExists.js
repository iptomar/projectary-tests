var utils = new (require('./../utils.js'))();

class ExternalExists {

  /**
   * Truncate the user table and test the externalExists procedure
   */
  async start(connection) {
    this.connection = connection;

    try {
      await this.truncate();
      await this.testExternalExists();
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
  async testExternalExists() {
    try {
      var externalStatus;

      // insert a user
      try {
        await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/procedures/insertUser.sql`);
      } catch (error) {
        throw new Error(error);
      }

      // calls procedure externalExists and checks if there is an user with the external_id = 10001
      await this.connection.query("CALL projectary_tests.externalExists('10001', @output); SELECT @output as output;", 
      await function (error, results, fields) {
        //console.log(results[1][0]['output']);
        externalStatus=results[1][0]['output'];
        if (externalStatus == 1 ) {
          utils.log('success', 'externalExists procedure called successfully');
        } else {
          utils.log('fail', 'Failed to call the externalExists procedure');
        }
      });

    } catch (error) {
      utils.log('fail', 'Failed to test the externalExists procedure \n' + error);
      return;
    }
  }
}

module.exports = ExternalExists;
