var utils = new (require('./utils.js'))();

class Projectattribute {

  /**
   * Truncate the projectattribute table and test insertions
   */
  async start(connection) {
    this.connection = connection;

    try {
      await this.truncate();
      await this.insertProjectattributes();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Truncate the projectattribute table so we while performing insertions
   * we can correctly track the number of rows before and 
   * after the insertions.
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.projectattribute;"
      `, 'Truncated table projectattribute', 'Failed to truncate table projectattribute');
  }

  /**
   * Insert 5 projectattributes and check if they're inserted by counting
   * the number of rows before and after the insertion of projectattributes.
   */
  async insertProjectattributes() {
    try {
      var rowsCount;

      await this.connection.query('SELECT * FROM projectary_tests.projectattribute;', await function (error, results, fields) {
        rowsCount = results.length;
      });

      // mysqltest
      try {
        await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/insertProjectattributes.sql`);
      } catch (error) {
        throw new Error(error);
      }

      await this.connection.query('SELECT * FROM projectary_tests.projectattribute;', await function (error, results, fields) {
        if (rowsCount + 5 == results.length) {
          utils.log('success', 'Inserted 5 projectattributes successfully');
        } else {
          utils.log('fail', 'The number of rows before and after the insertion do not match');
        }
      });
    } catch (error) {
      utils.log('fail', 'Failed to insert projectattributes \n' + error);
      return;
    }
  }
}

module.exports = Projectattribute;