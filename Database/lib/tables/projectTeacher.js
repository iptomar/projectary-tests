var utils = new (require('./../utils.js'))();

class ProjectTeacher {

  /**
   * Truncate the projectteacher table and test insertions
   */
  async start(connection, logfile, batch) {
    this.connection = connection;
	//batch of operations do test
	this.batch = batch;
	//Log file
	this.logfile = logfile;
	
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
   * Insert n projectteachers and check if they're inserted by checking affectedRows
   */
  async insertProjectTeachers() {
    try {
		var f = this.logfile;
		var sql = "INSERT INTO projectteacher VALUES ?";
		//generating values to insert
		var values = [];
		for(var i = 0; i < this.batch; i++)
			values[i]=[i+1,i+1];
		var startbench = process.hrtime();
		await this.connection.query(sql, [values], await function(err, saved) {
			var endbench = process.hrtime(startbench);
			if( err || !saved ) utils.log('fail', 'Data not saved' + err);
			else { 	var msg = 'Inserted ' + saved.affectedRows + ' rows into table `projectteacher` in ' + utils.parseHrTime(endbench);			
					utils.log('success', msg); utils.writeLog(f,msg); 
			}		
		});    
    } catch (error) {
      utils.log('fail', 'Failed to insert `projectteacher` \n' + error);
      return;
    }
  }
}

module.exports = ProjectTeacher;