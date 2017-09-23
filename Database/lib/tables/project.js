var utils = new (require('./../utils.js'))();
var de = Promise.defer();

class Project {

  /**
   * Truncate the project table and test insertions
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

  /**
   * Truncate the project table so we while performing insertions
   * we can correctly track the number of rows before and 
   * after the insertions.
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.project;"
      `, 'Truncated table project', 'Failed to truncate table project');
  }

  /**
   * Insert n projects and check if they're inserted by checking affectedRows
   */
  async insertProjects() {
    try {
		var f = this.logfile;
		var sql = "INSERT INTO project VALUES ?";
		//generating values to insert
		var values = [];
		for(var i = 0; i < this.batch; i++)
			values[i]=[i+1,'2017-01-02 00:00:01',2017,i,'project'+(i+1),'project'+(i+1),i+1,'2017-01-02 00:00:05','2017-01-02 00:00:05',1];
		var startbench = process.hrtime();
		await this.connection.query(sql, [values], await function(err, saved) {
			var endbench = process.hrtime(startbench);
			if( err || !saved ) utils.log('fail', 'Data not saved' + err);
			else { 	var msg = 'Inserted ' + saved.affectedRows + ' rows into table `project` in ' + utils.parseHrTime(endbench);			
					utils.log('success', msg); utils.writeLog(f,msg); 
					de.resolve();
			}		
		});    
    } catch (error) {
      utils.log('fail', 'Failed to insert in projects table \n' + error);
      return;
    }
  }
}

module.exports = Project;
