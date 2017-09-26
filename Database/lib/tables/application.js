var utils = new (require('./../utils.js'))();
//Promise used to keep track of script termination
var de = Promise.defer();

class Application {

  /*
   * Truncates the `application´ table and tests insertions
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
	  return de.promise;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /*
   * Truncates the `application´ table providing a clean testbed
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.application;"
      `, 'Truncated table application', 'Failed to truncate table application');
  }

  /*
   * Inserts n applications and checks if they're inserted by verifying the number of affected rows
   */
  async insertApplications() {
    try {
		var f = this.logfile;
		var sql = "INSERT INTO application VALUES ?";
		//generating values to insert
		var values = [];
		for(var i = 0; i < this.batch; i++)
			//# groupid, projectid, submitedin, approvedin
			values[i]=[i+1,i+1,'2017-01-03 00:00:01','2017-01-03 00:00:01'];
		//keeps time before query
		var startbench = process.hrtime();
		//inserts into database
		await this.connection.query(sql, [values], await function(err, saved) {
			//gets the elapsed time	
			var endbench = process.hrtime(startbench);
			//outputs results
			if( err || !saved ) utils.log('fail', 'Data not saved' + err);
			else { 	var msg = 'Inserted ' + saved.affectedRows + ' rows into table `application´ in ' + utils.parseHrTime(endbench);			
				//saves results into the logfile
				utils.log('success', msg); utils.writeLog(f,msg);
				de.resolve();
			}
		});
    } catch (error) {
      utils.log('fail', 'Failed to insert into `application´ table \n' + error);
      return;
    }
  }
}

module.exports = Application;
