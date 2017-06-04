var utils = new (require('./../utils.js'))();

class DescExists {

  /**
   * Truncate the group table and test the descExists procedure
   */
  async start(connection) {
    this.connection = connection;

    try {
      await this.truncate();
      await this.testDescExists();
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
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.group;"
      `, 'Truncated table group', 'Failed to truncate table group');
  }

  /**
   * Insert a group and check if a description
   * already exists
   */
  async testDescExists() {
    try {
      var descStatus;

      // insert a group
      try {
        await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/procedures/insertGroup.sql`);
      } catch (error) {
        throw new Error(error);
      }

      // calls procedure descExists and checks if there's the a group description
      await this.connection.query("CALL projectary_tests.descExists('descrição', @output); SELECT @output as output;", 
      await function (error, results, fields) {
        descStatus=results[1][0]['output'];
        if (descStatus == 1 ) {
          utils.log('success', 'descExists procedure called successfully');
        } else {
          utils.log('fail', 'Failed to call the descExists procedure');
        }
      });

    } catch (error) {
      utils.log('fail', 'Failed to test the descExists procedure \n' + error);
      return;
    }
  }
}

module.exports = DescExists;