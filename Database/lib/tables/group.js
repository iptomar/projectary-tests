var utils = new (require('./../utils.js'))();
//Promise used to keep track of script termination
var de = Promise.defer();

class Group {

  /**
   * Truncates the `group´ table and tests insertions
   */
  async start(connection, logfile, batch) {
    this.connection = connection;
	//batch of operations do test
	this.batch = batch;
	//Log file
	this.logfile = logfile;
	
    try {
      await this.truncate();
      await this.insertGroups();
	   return de.promise;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /*
   * Truncates the `group´ table providing a clean testbed
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.group;"
      `, 'Truncated table group', 'Failed to truncate table group');
  }

  /**
   * Insert n groups and check if they're inserted by verifying the number of affected rows
   */
  async insertGroups() {
    try {
		var f = this.logfile;
		var sql = "INSERT INTO `group` VALUES ?";
		//generating values to insert
		var values = [];
		for(var i = 0; i < this.batch; i++)
			//# id, desc, password
			values[i]=[i+1,'group'+(i+1),'46f94c8de14fb36680850768ff1b7f2a'];
		//keeps time before query
		var startbench = process.hrtime();
		//inserts into database
		await this.connection.query(sql, [values], await function(err, saved) {
			//gets the elapsed time	
			var endbench = process.hrtime(startbench);
			//outputs results
			if( err || !saved ) utils.log('fail', 'Data not saved' + err);
			else { 	var msg = 'Inserted ' + saved.affectedRows + ' rows into table `group` in ' + utils.parseHrTime(endbench);			
				//saves results into the logfile
				utils.log('success', msg); utils.writeLog(f,msg); 
				de.resolve();
			}		
		});    
	} catch (error) {
      utils.log('fail', 'Failed to insert in `group` table \n' + error);
      return;
    }
  }
}

module.exports = Group;
