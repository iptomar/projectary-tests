var utils = new (require('./../utils.js'))();
//Promise used to keep track of script termination
var de = Promise.defer();

class Type {

  /*
   * Truncates the `type´ table and tests insertions
   */
  async start(connection, logfile, batch) {
    this.connection = connection;
	//batch of operations do test
	this.batch = batch;
	//Log file
	this.logfile = logfile;
	
    try {
      await this.truncate();
      await this.insertTypes();
 	  return de.promise;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /*
   * Truncates the `type´ table providing a clean testbed
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.type;"
      `, 'Truncated table type', 'Failed to truncate table type');
  }

  /**
   * Insert n types and check if they're inserted by verifying the number of affected rows
   */
  async insertTypes() {
      try {
		var f = this.logfile;
		var sql = "INSERT INTO type VALUES ?";
		//generating values to insert
		var values = [];
		for(var i = 0; i < this.batch; i++)
			//# id, desc
			values[i]=[i+1,'test'+(i+1)];
		//keeps time before query
		var startbench = process.hrtime();
		//inserts into database
		await this.connection.query(sql, [values], await function(err, saved) {
			//gets the elapsed time	
			var endbench = process.hrtime(startbench);
			//outputs results
			if( err || !saved ) utils.log('fail', 'Data not saved' + err);
			else { 	var msg = 'Inserted ' + saved.affectedRows + ' rows into table `type` in ' + utils.parseHrTime(endbench);			
				//saves results into the logfile
				utils.log('success', msg); utils.writeLog(f,msg); 
				de.resolve();
			}
		});
    } catch (error) {
      utils.log('fail', 'Failed to insert into `type´ table\n' + error);
      return;
    }
  }
}

module.exports = Type;
