var utils = new (require('./../utils.js'))();

class User {

  /**
   * Truncate the user table and test insertions
   */
  async start(connection) {
    this.connection = connection;

    try {
      await this.truncate();
      await this.insertUsers();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Truncate the user table so we while performing insertions
   * we can correctly track the number of rows before and 
   * after the insertions.
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.user;"
      `, 'Truncated table user', 'Failed to truncate table user');
  }

  /**
   * Insert 10 users, 5 students and 5 teachers, and check
   * if they're inserted by counting the number of rows
   * before and after the insertion of users.
   */
  async insertUsers() {
    try {
      var rowsCount;

      await this.connection.query('SELECT * FROM user;', await function (error, results, fields) {
        rowsCount = results.length;
      });

      // mysqltest
      try {
        await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/tables/insertUsers.sql`);
      } catch (error) {
        throw new Error(error);
      }

      await this.connection.query('SELECT * FROM user;', await function (error, results, fields) {
        if (rowsCount + 10 == results.length) {
          utils.log('success', 'Inserted 10 users successfully');
        } else {
          utils.log('fail', 'The number of rows before and after the insertion do not match');
        }
      });
    } catch (error) {
      utils.log('fail', 'Failed to insert users \n' + error);
      return;
    }
  }
}

module.exports = User;
