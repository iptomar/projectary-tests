var utils = new (require('./utils.js'))();

class Application {

  /**
   * Truncate the application table and test insertions
   */
  async start(connection) {
    this.connection = connection;

    try {
      await this.truncate();
      await this.insertApplications();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Truncate the application table so we while performing insertions
   * we can correctly track the number of rows before and 
   * after the insertions.
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.application;"
      `, 'Truncated table application', 'Failed to truncate table application');
  }

  /**
   * Insert 2 applications and check if they're inserted by counting
   * the number of rows before and after the insertion of applications.
   */
  async insertApplications() {
    try {
      var rowsCount;

      await this.connection.query('SELECT * FROM projectary_tests.application;', await function (error, results, fields) {
        rowsCount = results.length;
      });

      // mysqltest
      try {
        await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/insertApplications.sql`);
      } catch (error) {
        throw new Error(error);
      }

      await this.connection.query('SELECT * FROM projectary_tests.application;', await function (error, results, fields) {
        // check if the rows before and after insertion
        // are the same, including the number of rows added
        if (rowsCount + 2 == results.length) {
          utils.log('success', 'Inserted 2 applications successfully');
        } else {
          utils.log('fail', 'The number of rows before and after the insertion do not match');
        }
      });
    } catch (error) {
      utils.log('fail', 'Failed to insert in applications table \n' + error);
      return;
    }
  }
}

module.exports = Application;
