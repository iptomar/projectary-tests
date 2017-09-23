var utils = new (require('./../utils.js'))();
var de = Promise.defer();

class Course {

  /**
   * Truncate the course table and test insertions
   */
  async start(connection, logfile, batch) {
    this.connection = connection;
	//batch of operations do test
	this.batch = batch;
	//Log file
	this.logfile = logfile;
	
    try {
      await this.truncate();
      await this.insertCourses();
	   return de.promise;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Truncate the course table so we while performing insertions
   * we can correctly track the number of rows before and 
   * after the insertions.
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.course;"
      `, 'Truncated table course', 'Failed to truncate table course');
  }

  /**
   * Insert n courses and check if they're inserted by checking affected rows.
   */
  async insertCourses() {
    try {
		var f = this.logfile;
		var sql = "INSERT INTO course VALUES ?";
		//generating values to insert
		var values = [];
		for(var i = 0; i < this.batch; i++)
			values[i]=[i+1, "course" + (i+1),1];
		var startbench = process.hrtime();
		await this.connection.query(sql, [values], await function(err, saved) {
			var endbench = process.hrtime(startbench);
			if( err || !saved ) utils.log('fail', 'Data not saved' + err);
			else { 	var msg = 'Inserted ' + saved.affectedRows + ' rows into table `Course´ in ' + utils.parseHrTime(endbench);			
					utils.log('success', msg); utils.writeLog(f,msg); 
					de.resolve();
			}		
		});        
	} catch (error) {
      utils.log('fail', 'Failed to insert `Courses´ \n' + error);
      return;
    }
  }
}

module.exports = Course;
