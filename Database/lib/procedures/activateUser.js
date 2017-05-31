var utils = new (require('./../utils.js'))();

class ActivateUser {

  /**
   * Truncate the user table and test the activeUser procedure
   */
  async start(connection) {
    this.connection = connection;

    try {
      await this.truncate();
      await this.testActivateUser();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Truncate the user table so we can test the procedure
   * without having other interferences
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.user;"
      `, 'Truncated table user', 'Failed to truncate table user');
  }

  /**
   * 
   */
  async testActivateUser() {
    try {
      var activeStatus;

      // insert the a non activated user and an admin
      // so we can activate the user via the admin account
      try {
        await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/procedures/insertNotActiveUser.sql`);
      } catch (error) {
        throw new Error(error);
      }

      // get the status of active row of the inserted user
      await this.connection.query('SELECT * FROM user WHERE id=1;', await function (error, results, fields) {
        activeStatus = results[0].active;
      });

      // call the procedure account
      try {
        await utils.execPromise(`mysql --defaults-file="./.my.cnf" -e "CALL projectary_tests.activateUser(2, 1);"`);
      } catch (error) {
        throw new Error(error);
      }

      // check if the procedured worked
      await this.connection.query('SELECT * FROM user WHERE id=1;', await function (error, results, fields) {
        if (activeStatus == 0 && results[0].active == 1) {
          utils.log('success', 'activeUser procedure called successfully');
        } else {
          utils.log('fail', 'Failed to call the activeUser procedure');
        }
      });
    } catch (error) {
      utils.log('fail', 'Failed to test the activeUser procedure \n' + error);
      return;
    }
  }
}

module.exports = ActivateUser;
