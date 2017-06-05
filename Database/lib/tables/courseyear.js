var utils = new (require('./../utils.js'))();

class CourseYear {

  /**
   * Truncate the courseyear table and test insertions
   */
  async start(connection) {
    this.connection = connection;

    try {
      await this.truncate();
      await this.insertCourseYears();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Truncate the courseyear table so we while performing insertions
   * we can correctly track the number of rows before and 
   * after the insertions.
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.courseyear;"
      `, 'Truncated table courseyear', 'Failed to truncate table courseyear');
  }

  /**
   * Insert 5 courseyears and check if they're inserted by counting
   * the number of rows before and after the insertion of courseyears.
   */
  async insertCourseYears() {
    try {
      var rowsCount;

      await this.connection.query('SELECT * FROM projectary_tests.courseyear;', await function (error, results, fields) {
        rowsCount = results.length;
      });

      // mysqltest
      try {
        await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/tables/insertCourseYears.sql`);
      } catch (error) {
        throw new Error(error);
      }

      await this.connection.query('SELECT * FROM projectary_tests.courseyear;', await function (error, results, fields) {
        if (rowsCount + 5 == results.length) {
          utils.log('success', 'Inserted 5 courseyears successfully');
        } else {
          utils.log('fail', 'The number of rows before and after the insertion do not match');
        }
      });
    } catch (error) {
      utils.log('fail', 'Failed to insert courseyears \n' + error);
      return;
    }
  }
}

module.exports = CourseYear;