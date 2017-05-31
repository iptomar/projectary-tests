var utils = new (require('./../utils.js'))();

class Attribute {

  /**
   * Truncate the attribute table and test insertions
   */
  async start(connection) {
    this.connection = connection;

    try {
      await this.truncate();
      await this.insertAttributes();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Truncate the attribute table so we while performing insertions
   * we can correctly track the number of rows before and 
   * after the insertions.
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.attribute;"
      `, 'Truncated table atribute', 'Failed to truncate table attribute');
  }

  /**
   * Insert 5 attributes and check if they're inserted by counting
   * the number of rows before and after the insertion of attributes.
   */
  async insertAttributes() {
    try {
      var rowsCount;

      await this.connection.query('SELECT * FROM projectary_tests.attribute;', await function (error, results, fields) {
        rowsCount = results.length;
      });

      // mysqltest
      try {
        await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/tables/insertAttributes.sql`);
      } catch (error) {
        throw new Error(error);
      }

      await this.connection.query('SELECT * FROM projectary_tests.attribute;', await function (error, results, fields) {
        if (rowsCount + 5 == results.length) {
          utils.log('success', 'Inserted 5 attributes successfully');
        } else {
          utils.log('fail', 'The number of rows before and after the insertion do not match');
        }
      });
    } catch (error) {
      utils.log('fail', 'Failed to insert attributes \n' + error);
      return;
    }
  }
}

module.exports = Attribute;