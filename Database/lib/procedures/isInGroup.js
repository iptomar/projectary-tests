var utils = new (require('./../utils.js'))();

class IsInGroup {

  /**
   * Truncate the user table and test the isInGroup procedure
   */
  async start(connection) {
    this.connection = connection;

    try {
      await this.truncate();
      await this.testIsInGroup();
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

  async testIsInGroup() {
    try {
      var groupStatus;

      // insert the a non activated user and an admin
      try {
        await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/procedures/insertGroupUser.sql`);
      } catch (error) {
        throw new Error(error);
      }

      
      // calls procedure isInGroup and checks if there is an entry with the userid = 3 and groupid = 1
      await this.connection.query("CALL projectary_tests.isInGroup(3, 1, @output); SELECT @output as output;", 
      await function (error, results, fields) {
        //console.log(results[1][0]['output']);
        groupStatus=results[1][0]['output'];
        if (groupStatus == 1 ) {
          utils.log('success', 'isInGroup procedure called successfully');
        } else {
          utils.log('fail', 'Failed to call the isInGroup procedure');
        }
      });

    } catch (error) {
      utils.log('fail', 'Failed to test the isInGroup procedure \n' + error);
      return;
    }
  }
}

module.exports = IsInGroup;
