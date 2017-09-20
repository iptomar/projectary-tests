var utils = new (require('./../utils.js'))();

class Application {

  /**
   * Truncate the application table and test insertions
   */
  async start(connection, logfile, batch) {
    this.connection = connection;
	//batch of operations do test
	this.batch = batch;
	//Log file
	this.logfile = logfile;
	
    try {
      await this.truncate();
      await this.insertApplications();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Truncate the application table so we while performing insertions
   * we can correctly track the number of rows before and 
   * after the insertions.
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.application;"
      `, 'Truncated table application', 'Failed to truncate table application');
  }

  /**
   * Insert n applications and check if they're inserted by counting
   * the number of rows before and after the insertion of applications.
   */
  async insertApplications() {
    try {
		var f = this.logfile;
		var sql = "INSERT INTO application VALUES ?";
		//generating values to insert
		var values = [];
		for(var i = 0; i < this.batch; i++)
			values[i]=[i+1,i+1,'2017-01-03 00:00:01','2017-01-03 00:00:01'];
		var startbench = process.hrtime();
		await this.connection.query(sql, [values], await function(err, saved) {
			var endbench = process.hrtime(startbench);
			if( err || !saved ) utils.log('fail', 'Data not saved' + err);
			else { 	var msg = 'Inserted ' + saved.affectedRows + ' rows into table `application´ in ' + utils.parseHrTime(endbench);			
					utils.log('success', msg); utils.writeLog(f,msg); 
			}		
		});
    } catch (error) {
      utils.log('fail', 'Failed to insert in `Applications´ table \n' + error);
      return;
    }
  }
}

module.exports = Application;
