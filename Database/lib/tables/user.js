var utils = new (require('./../utils.js'))();
//Promise used to keep track of script termination
var de = Promise.defer();

class User {

  /*
   * Truncates the `user´ table and test insertions
   */
  async start(connection, logfile, batch) {
    this.connection = connection;
	//batch of operations do test
	this.batch = batch;
	//Log file
	this.logfile = logfile;
	
    try {
      await this.truncate();
      await this.insertUsers();
	  return de.promise;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /*
   * Truncates the `user´ table providing a clean testbed
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.user;"
      `, 'Truncated table user', 'Failed to truncate table user');
  }

  /*
   * Inserts n users and checks if they're inserted by verifying the number of affected rows
   */
  async insertUsers() {
    try {
      	var f = this.logfile;
		var sql = "INSERT INTO `user` VALUES ?";
		//generating values to insert
		var values = [];
		for(var i = 0; i < this.batch; i++)
			//# id, name, photo, external_id, type_id, email, phonenumber, isadmin, token, password (md5 of 123qwe), locked, 
			values[i]=[i+1,'user'+(i+1),'photo'+(i+1),i+1,(i+1)%2,'mail'+(i+1),'910000000',0,'token','46f94c8de14fb36680850768ff1b7f2a',0,1];
		//keeps time before query
		var startbench = process.hrtime();
		//inserts into database
		await this.connection.query(sql, [values], await function(err, saved) {
			//gets the elapsed time	
			var endbench = process.hrtime(startbench);
			//outputs results
			if( err || !saved ) utils.log('fail', 'Data not saved' + err);
			else { 	var msg = 'Inserted ' + saved.affectedRows + ' rows into table `user` in ' + utils.parseHrTime(endbench);			
				//saves results into the logfile
				utils.log('success', msg); utils.writeLog(f,msg); 
				de.resolve();
			}		
		});    
	} catch (error) {
      utils.log('fail', 'Failed to insert into `user` table \n' + error);
      return;

    }
  }
}

module.exports = User;
