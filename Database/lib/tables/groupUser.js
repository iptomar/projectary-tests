var utils = new (require('./../utils.js'))();
var de = Promise.defer();

class GroupUser {

  /**
   * Truncate the groupuser table and test insertions
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

  /**
   * Truncate the groupuser table so we while performing insertions
   * we can correctly track the number of rows before and 
   * after the insertions.
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
			values[i]=[i+1,i+1,1,20,'2017-01-04 00:00:01'];
		var startbench = process.hrtime();
		await this.connection.query(sql, [values], await function(err, saved) {
			var endbench = process.hrtime(startbench);
			if( err || !saved ) utils.log('fail', 'Data not saved' + err);
			else { 	var msg = 'Inserted ' + saved.affectedRows + ' rows into table `groupuser` in ' + utils.parseHrTime(endbench);			
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