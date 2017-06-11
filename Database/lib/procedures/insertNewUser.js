var utils = new (require('./../utils.js'))();

class insertNewUser {

  /**
   * Truncate the user table and test the insertNewUser procedure
   */
  async start(connection) {
    this.connection = connection;

    try {
      await this.truncate();
      await this.testInsertNewType();
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
  async testInsertNewType() {
    try {
      var typeStatus;

      // calls procedure insertNewUser and inserts a new courseyear
      await this.connection.query("CALL projectary_tests.insertNewUser('teste', 'default_photo.png', '10001', 1, '10001@ipt.pt','999999999', '46f94c8de14fb36680850768ff1b7f2a');"); 

      await this.connection.query("(SELECT EXISTS(SELECT * FROM user WHERE `name` LIKE 'teste') as output)",      
      await function (error, results, fields) {
        //console.log(results);
        typeStatus=results[0]['output'];
        if (typeStatus == 1 ) {
          utils.log('success', 'insertNewUser procedure called successfully');
        } else {
          utils.log('fail', 'Failed to call the insertNewUser procedure');
        }
      });

    } catch (error) {
      utils.log('fail', 'Failed to test the insertNewUser procedure \n' + error);
      return;
    }
  }
}

module.exports = insertNewUser;