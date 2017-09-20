var utils = new (require('./../utils.js'))();

class CourseYear {

  /**
   * Truncate the courseyear table and test insertions
   */
  async start(connection, logfile, batch) {
    this.connection = connection;
	//batch of operations do test
	this.batch = batch;
	//Log file
	this.logfile = logfile;
	
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
   * Insert n courseyears and check if they're inserted by checking affected rows.
   */
  async insertCourseYears() {
    try {
 		var f = this.logfile;
		var sql = "INSERT INTO courseyear VALUES ?";
		//generating values to insert
		var values = [];
		for(var i = 0; i < this.batch; i++)
			values[i]=[i+1, 2017,1];
		var startbench = process.hrtime();
		await this.connection.query(sql, [values], await function(err, saved) {
			var endbench = process.hrtime(startbench);
			if( err || !saved ) utils.log('fail', 'Data not saved' + err);
			else { 	var msg = 'Inserted ' + saved.affectedRows + ' rows ingo table `courseyear´ in ' + utils.parseHrTime(endbench);			
					utils.log('success', msg); utils.writeLog(f,msg); 
			}		
		});      
    } catch (error) {
      utils.log('fail', 'Failed to insert `courseyear´ \n' + error);
      return;
    }
  }
}

module.exports = CourseYear;