var utils = new (require('./../utils.js'))();
//Promise used to keep track of script termination
var de = Promise.defer();

class GroupUser {

  /*
   * Truncate the `groupuser´ table and test insertions
   */
  async start(connection, logfile, batch) {
    this.connection = connection;
	//batch of operations do test
	this.batch = batch;
	//Log file
	this.logfile = logfile;
	
    try {
      await this.truncate();
      await this.insertGroupUsers();
 	   return de.promise;
   } catch (error) {
      throw new Error(error.message);
    }
  }

  /*
   * Truncates the `groupuser´ table providing a clean testbed
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.groupuser;"
      `, 'Truncated table groupuser', 'Failed to truncate table groupuser');
  }

  /**
   * Insert n groupusers and check if they're inserted by checking affectedRows
   */
  async insertGroupUsers() {
    try {
		var f = this.logfile;
		var sql = "INSERT INTO groupuser VALUES ?";
		//generating values to insert
		var values = [];
		for(var i = 0; i < this.batch; i++)
			//# groupid, userid, owner, grade, approvedin
			values[i]=[i+1,i+1,1,20,'2017-01-04 00:00:01'];
		//keeps time before query
		var startbench = process.hrtime();
		//inserts into database
		await this.connection.query(sql, [values], await function(err, saved) {
			//gets the elapsed time	
			var endbench = process.hrtime(startbench);
			//outputs results
			if( err || !saved ) utils.log('fail', 'Data not saved' + err);
			else { 	var msg = 'Inserted ' + saved.affectedRows + ' rows into table `groupuser` in ' + utils.parseHrTime(endbench);			
				//saves results into the logfile
				utils.log('success', msg); utils.writeLog(f,msg); 
				de.resolve();
			}	
		});    			
    } catch (error) {
      utils.log('fail', 'Failed to insert `groupuser` \n' + error);
      return;
    }
  }
}

module.exports = GroupUser;