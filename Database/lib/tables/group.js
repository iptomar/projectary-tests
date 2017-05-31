var utils = new (require('./utils.js'))();

class Group {

  /**
   * Truncate the user table and test insertions
   */
  async start(connection) {
    this.connection = connection;

    try {
      await this.truncate();
      await this.insertGroups();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Truncate the group table so we while performing insertions
   * we can correctly track the number of rows before and 
   * after the insertions.
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.group;"
      `, 'Truncated table group', 'Failed to truncate table group');
  }

  /**
   * Insert 3 groups and check if they're inserted by counting
   * the number of rows before and after the insertion of groups.
   */
  async insertGroups() {
    try {
      var rowsCount;

      await this.connection.query('SELECT * FROM projectary_tests.group;', await function (error, results, fields) {
        rowsCount = results.length;
      });

      // mysqltest
      try {
        await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/insertGroups.sql`);
      } catch (error) {
        throw new Error(error);
      }

      await this.connection.query('SELECT * FROM projectary_tests.group;', await function (error, results, fields) {
        // check if the rows before and after insertion
        // are the same, including the number of rows added
        if (rowsCount + 3 == results.length) {
          utils.log('success', 'Inserted 3 groups successfully');
        } else {
          utils.log('fail', 'The number of rows before and after the insertion do not match');
        }
      });
    } catch (error) {
      utils.log('fail', 'Failed to insert in groups table \n' + error);
      return;
    }
  }
}

module.exports = Group;
