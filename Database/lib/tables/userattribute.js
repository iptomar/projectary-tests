var utils = new (require('./../utils.js'))();

class Userattribute {

  /**
   * Truncate the userattribute table and test insertions
   */
  async start(connection) {
    this.connection = connection;

    try {
      await this.truncate();
      await this.insertUserattributes();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Truncate the userattribute table so we while performing insertions
   * we can correctly track the number of rows before and 
   * after the insertions.
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.userattribute;"
      `, 'Truncated table userattribute', 'Failed to truncate table userattribute');
  }

  /**
   * Insert 5 userattributes and check if they're inserted by counting
   * the number of rows before and after the insertion of userattributes.
   */
  async insertUserattributes() {
    try {
      var rowsCount;

      await this.connection.query('SELECT * FROM projectary_tests.userattribute;', await function (error, results, fields) {
        rowsCount = results.length;
      });

      // mysqltest
      try {
        await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/tables/insertUserattributes.sql`);
      } catch (error) {
        throw new Error(error);
      }

      await this.connection.query('SELECT * FROM projectary_tests.userattribute;', await function (error, results, fields) {
        if (rowsCount + 5 == results.length) {
          utils.log('success', 'Inserted 5 userattributes successfully');
        } else {
          utils.log('fail', 'The number of rows before and after the insertion do not match');
        }
      });
    } catch (error) {
      utils.log('fail', 'Failed to insert userattributes \n' + error);
      return;
    }
  }
}

module.exports = Userattribute;