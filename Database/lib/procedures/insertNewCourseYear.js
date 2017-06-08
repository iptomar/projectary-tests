var utils = new (require('./../utils.js'))();

class InsertNewCourseYear {

  /**
   * Truncate the user table and test the insertNewCourseYear procedure
   */
  async start(connection) {
    this.connection = connection;

    try {
      await this.truncate();
      await this.testInsertNewCourseYear();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Truncate the courseyear table so we can test the procedure
   * without having other interferences
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.courseyear;"
      `, 'Truncated table courseyear', 'Failed to truncate table courseyear');
  }

  /**
   * 
   */
  async testInsertNewCourseYear() {
    try {
      var courseYearStatus;

      // calls procedure insertNewCourseYear and inserts a new courseyear
      await this.connection.query("CALL projectary_tests.insertNewCourseYear('0001', '2017', true);"); 

      //
      await this.connection.query("(SELECT EXISTS(SELECT `course`, `year`, `active` FROM courseyear WHERE `course` LIKE 0001 AND `year` LIKE 2017 AND `active` LIKE true) as output)", 
      
      await function (error, results, fields) {
        //console.log(results[0]['output']);
        courseYearStatus=results[0]['output'];
        if (courseYearStatus == 1 ) {
          utils.log('success', 'insertNewCourseYear procedure called successfully');
        } else {
          utils.log('fail', 'Failed to call the insertNewCourseYear procedure');
        }
      });

    } catch (error) {
      utils.log('fail', 'Failed to test the insertNewCourseYear procedure \n' + error);
      return;
    }
  }
}

module.exports = InsertNewCourseYear;
