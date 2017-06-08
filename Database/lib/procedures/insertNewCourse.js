var utils = new (require('./../utils.js'))();

class InsertNewCourse {

  /**
   * Truncate the user table and test the insertNewCourse procedure
   */
  async start(connection) {
    this.connection = connection;

    try {
      await this.truncate();
      await this.testInsertNewCourse();
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
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.course;"
      `, 'Truncated table course', 'Failed to truncate table course');
  }

  /**
   * 
   */
  async testInsertNewCourse() {
    try {
      var courseStatus;

      // calls procedure insertNewCourse and inserts a new course
      await this.connection.query("CALL projectary_tests.insertNewCourse('0001', 'descricao');"); 

      //
      await this.connection.query("(SELECT EXISTS(SELECT `schoolid`, `desc` FROM course WHERE `schoolid` LIKE 0001 AND `desc` LIKE 'descricao') as output)", 
      
      await function (error, results, fields) {
        //console.log(results[0]['output']);
        courseStatus=results[0]['output'];
        if (courseStatus == 1 ) {
          utils.log('success', 'insertNewCourse procedure called successfully');
        } else {
          utils.log('fail', 'Failed to call the insertNewCourse procedure');
        }
      });

    } catch (error) {
      utils.log('fail', 'Failed to test the insertNewCourse procedure \n' + error);
      return;
    }
  }
}

module.exports = InsertNewCourse;
