var utils = new (require('./../utils.js'))();

class InsertUserAttribute {

  /**
   * Truncate the user table and test the insertUserAttribute procedure
   */
  async start(connection) {
    this.connection = connection;

    try {
      await this.truncate();
      await this.testInsertUserAttribute();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Truncate the userattribute table so we can test the procedure
   * without having other interferences
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.userattribute;"
      `, 'Truncated table userattribute', 'Failed to truncate table userattribute');
  }

  /**
   * 
   */
  async testInsertUserAttribute() {
    try {
      var attributeStatus;

      // calls procedure insertUserAttribute and inserts a new courseyear
      await this.connection.query("CALL projectary_tests.insertUserAttribute('0001','0001','valor');"); 

      //
      await this.connection.query("(SELECT EXISTS(SELECT `userid`,`attributeid`,`value` FROM userattribute WHERE `userid` LIKE 0001 AND `attributeid` LIKE 0001 AND `value` LIKE 'valor') as output)", 
      
      await function (error, results, fields) {
        //console.log(results[0]['output']);
        attributeStatus=results[0]['output'];
        if (attributeStatus == 1 ) {
          utils.log('success', 'insertUserAttribute procedure called successfully');
        } else {
          utils.log('fail', 'Failed to call the insertUserAttribute procedure');
        }
      });

    } catch (error) {
      utils.log('fail', 'Failed to test the insertUserAttribute procedure \n' + error);
      return;
    }
  }
}

module.exports = InsertUserAttribute;
