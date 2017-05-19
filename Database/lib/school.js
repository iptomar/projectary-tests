var utils = new (require('./utils.js'))();

class School {

  /**
   * Truncate the school table and test insertions
   */
  async start(connection) {
    this.connection = connection;

    try {
      await this.truncate();
      await this.insertSchools();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Truncate the school table so we while performing insertions
   * we can correctly track the number of rows before and 
   * after the insertions.
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.school;"
      `, 'Truncated table school', 'Failed to truncate table school');
  }

  /**
   * Insert 3 schools and check if they're inserted by counting
   * the number of rows before and after the insertion of schools.
   */
  async insertSchools() {
    try {
      var rowsCount;

      await this.connection.query('SELECT * FROM projectary_tests.school;', await function (error, results, fields) {
        rowsCount = results.length;
      });

      // mysqltest
      try {
        await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/insertSchools.sql`);
      } catch (error) {
        throw new Error(error);
      }

      await this.connection.query('SELECT * FROM projectary_tests.school;', await function (error, results, fields) {
        if (rowsCount + 3 == results.length) {
          utils.log('success', 'Inserted 3 schools successfully');
        } else {
          utils.log('fail', 'The number of rows before and after the insertion do not match');
        }
      });
    } catch (error) {
      utils.log('fail', 'Failed to insert schools \n' + error);
      return;
    }
  }
}

module.exports = School;
