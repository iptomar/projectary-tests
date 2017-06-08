var utils = new (require('./../utils.js'))();

class InsertNewType {

  /**
   * Truncate the user table and test the insertNewType procedure
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
   * Truncate the type table so we can test the procedure
   * without having other interferences
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.type;"
      `, 'Truncated table type', 'Failed to truncate table type');
  }

  /**
   * 
   */
  async testInsertNewType() {
    try {
      var typeStatus;

      // calls procedure insertNewType and inserts a new courseyear
      await this.connection.query("CALL projectary_tests.insertNewType('descricao');"); 

      //
      await this.connection.query("(SELECT EXISTS(SELECT `desc` FROM type WHERE `desc` LIKE 'descricao') as output)", 
      
      await function (error, results, fields) {
        //console.log(results[0]['output']);
        typeStatus=results[0]['output'];
        if (typeStatus == 1 ) {
          utils.log('success', 'insertNewType procedure called successfully');
        } else {
          utils.log('fail', 'Failed to call the insertNewType procedure');
        }
      });

    } catch (error) {
      utils.log('fail', 'Failed to test the insertNewType procedure \n' + error);
      return;
    }
  }
}

module.exports = InsertNewType;
