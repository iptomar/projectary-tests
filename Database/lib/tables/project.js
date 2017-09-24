var utils = new (require('./../utils.js'))();
//Promise used to keep track of script termination
var de = Promise.defer();

class Project {

  /**
   * Truncates the `project´ table and tests insertions
   */
  async start(connection, logfile, batch) {
    this.connection = connection;
	//batch of operations do test
	this.batch = batch;
	//Log file
	this.logfile = logfile;
	
    try {
      await this.truncate();
      await this.insertProjects();
	  return de.promise;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /*
   * Truncates the `project´ table providing a clean testbed
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.project;"
      `, 'Truncated table project', 'Failed to truncate table project');
  }

  /**
   * Insert n projects and check if they're inserted by verifying the number of affected rows
   */
  async insertProjects() {
    try {
		var f = this.logfile;
		var sql = "INSERT INTO project VALUES ?";
		//generating values to insert
		var values = [];
		for(var i = 0; i < this.batch; i++)
			//# id, approvedin, year, courseid, name, descriptiom, userid, created, finishedin, finished
			values[i]=[i+1,'2017-01-02 00:00:01',2017,i,'project'+(i+1),'desc'+(i+1),i+1,'2017-01-02 00:00:05','2017-01-02 00:00:05',1];
		//keeps time before query
		var startbench = process.hrtime();
		//inserts into database
		await this.connection.query(sql, [values], await function(err, saved) {
			//gets the elapsed time	
			var endbench = process.hrtime(startbench);
			//outputs results
			if( err || !saved ) utils.log('fail', 'Data not saved' + err);
			else { 	var msg = 'Inserted ' + saved.affectedRows + ' rows into table `project´ in ' + utils.parseHrTime(endbench);			
				//saves results into the logfile
				utils.log('success', msg); utils.writeLog(f,msg); 
				de.resolve();
			}		
		});    
    } catch (error) {
      utils.log('fail', 'Failed to insert into `projects´ table \n' + error);
      return;
    }
  }
}

module.exports = Project;
