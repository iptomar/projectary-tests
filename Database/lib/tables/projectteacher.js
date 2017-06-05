var utils = new (require('./../utils.js'))();

class ProjectTeacher {

  /**
   * Truncate the projectteacher table and test insertions
   */
  async start(connection) {
    this.connection = connection;

    try {
      await this.truncate();
      await this.insertProjectTeachers();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Truncate the projectteacher table so we while performing insertions
   * we can correctly track the number of rows before and 
   * after the insertions.
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.projectteacher;"
      `, 'Truncated table projectteacher', 'Failed to truncate table projectteacher');
  }

  /**
   * Insert 5 projectteachers and check if they're inserted by counting
   * the number of rows before and after the insertion of projectteachers.
   */
  async insertProjectTeachers() {
    try {
      var rowsCount;

      await this.connection.query('SELECT * FROM projectary_tests.projectteacher;', await function (error, results, fields) {
        rowsCount = results.length;
      });

      // mysqltest
      try {
        await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/tables/insertProjectTeachers.sql`);
      } catch (error) {
        throw new Error(error);
      }

      await this.connection.query('SELECT * FROM projectary_tests.projectteacher;', await function (error, results, fields) {
        if (rowsCount + 5 == results.length) {
          utils.log('success', 'Inserted 5 projectteachers successfully');
        } else {
          utils.log('fail', 'The number of rows before and after the insertion do not match');
        }
      });
    } catch (error) {
      utils.log('fail', 'Failed to insert projectteachers \n' + error);
      return;
    }
  }
}

module.exports = ProjectTeacher;