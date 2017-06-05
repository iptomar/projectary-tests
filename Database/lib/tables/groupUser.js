var utils = new (require('./../utils.js'))();

class GroupUser {

  /**
   * Truncate the groupuser table and test insertions
   */
  async start(connection) {
    this.connection = connection;

    try {
      await this.truncate();
      await this.insertGroupUsers();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Truncate the groupuser table so we while performing insertions
   * we can correctly track the number of rows before and 
   * after the insertions.
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.groupuser;"
      `, 'Truncated table groupuser', 'Failed to truncate table groupuser');
  }

  /**
   * Insert 5 groupusers and check if they're inserted by counting
   * the number of rows before and after the insertion of groupusers.
   */
  async insertGroupUsers() {
    try {
      var rowsCount;

      await this.connection.query('SELECT * FROM projectary_tests.groupuser;', await function (error, results, fields) {
        rowsCount = results.length;
      });

      // mysqltest
      try {
        await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/tables/insertGroupUsers.sql`);
      } catch (error) {
        throw new Error(error);
      }

      await this.connection.query('SELECT * FROM projectary_tests.groupuser;', await function (error, results, fields) {
        if (rowsCount + 5 == results.length) {
          utils.log('success', 'Inserted 5 groupusers successfully');
        } else {
          utils.log('fail', 'The number of rows before and after the insertion do not match');
        }
      });
    } catch (error) {
      utils.log('fail', 'Failed to insert groupusers \n' + error);
      return;
    }
  }
}

module.exports = GroupUser;