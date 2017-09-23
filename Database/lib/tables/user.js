var utils = new (require('./../utils.js'))();
var de = Promise.defer();

class User {

  /**
   * Truncate the user table and test insertions
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

  /**
   * Truncate the user table so we while performing insertions
   * we can correctly track the number of rows before and 
   * after the insertions.
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.user;"
      `, 'Truncated table user', 'Failed to truncate table user');
  }

  /**
   * Insert n users, 5 students and 5 teachers, and check
   * if they're inserted by counting the number of rows
   * before and after the insertion of users.
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
			var startbench = process.hrtime();
			await this.connection.query(sql, [values], await function(err, saved) {
			var endbench = process.hrtime(startbench);
			if( err || !saved ) utils.log('fail', 'Data not saved' + err);
			else { 	var msg = 'Inserted ' + saved.affectedRows + ' rows into table `user` in ' + utils.parseHrTime(endbench);			
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
