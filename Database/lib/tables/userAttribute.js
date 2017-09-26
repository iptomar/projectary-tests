var utils = new (require('./../utils.js'))();
//Promise used to keep track of script termination
var de = Promise.defer();

class UserAttribute {

  /**
   * Truncates the `userattribute´ table and test insertions
   */
  async start(connection, logfile, batch,counter) {
    this.connection = connection;
	//batch of operations do test
	this.batch = batch;
	//Log file
	this.logfile = logfile;
	
    try {
      await this.truncate();
      await this.insertUserAttributes();
	  return de.promise;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /*
   * Truncates the `userattribute´ table providing a clean testbed
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.userattribute;"
      `, 'Truncated table userattribute', 'Failed to truncate table userattribute');
  }

  /*
   * Inserts n userattributes and checks if they're inserted by verifying the number of affected rows
   */
  async insertUserAttributes() {
    try {
		var f = this.logfile;
		var sql = "INSERT INTO userattribute VALUES ?";
		//generating values to insert
		var values = [];
		for(var i = 0; i < this.batch; i++)
			//# userid, attributeid, value
			values[i]=[i+1,i+1,'value'];
		//keeps time before query
		var startbench = process.hrtime();
		//inserts into database
		await this.connection.query(sql, [values], await function(err, saved) {
			//gets the elapsed time	
			var endbench = process.hrtime(startbench);
			//outputs results
			if( err || !saved ) utils.log('fail', 'Data not saved' + err);
			else { 	var msg = 'Inserted ' + saved.affectedRows + ' rows into table `userattribute` in ' + utils.parseHrTime(endbench);			
				//saves results into the logfile
				utils.log('success', msg); utils.writeLog(f,msg); 
				de.resolve();
			}		
		});    
	} catch (error) {
      utils.log('fail', 'Failed to insert into `userattribute` table \n' + error);
      return;
	  }
  }
}

module.exports = UserAttribute;