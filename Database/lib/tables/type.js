var utils = new (require('./utils.js'))();

class Type {

  /**
   * Truncate the type table and test insertions
   */
  async start(connection) {
    this.connection = connection;

    try {
      await this.truncate();
      await this.insertTypes();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Truncate the type table so we while performing insertions
   * we can correctly track the number of rows before and 
   * after the insertions.
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.type;"
      `, 'Truncated table type', 'Failed to truncate table type');
  }

  /**
   * Insert 2 types and check if they're inserted by counting
   * the number of rows before and after the insertion of types.
   */
  async insertTypes() {
    try {
      var rowsCount;

      await this.connection.query('SELECT * FROM projectary_tests.type;', await function (error, results, fields) {
        rowsCount = results.length;
      });

      // mysqltest
      try {
        await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/insertTypes.sql`);
      } catch (error) {
        throw new Error(error);
      }

      await this.connection.query('SELECT * FROM projectary_tests.type;', await function (error, results, fields) {
        // check if the rows before and after insertion
        // are the same, including the number of rows added
        if (rowsCount + 2 == results.length) {
          utils.log('success', 'Inserted 2 types successfully');
        } else {
          utils.log('fail', 'The number of rows before and after the insertion do not match');
        }
      });
    } catch (error) {
      utils.log('fail', 'Failed to insert in types table \n' + error);
      return;
    }
  }
}

module.exports = Type;
