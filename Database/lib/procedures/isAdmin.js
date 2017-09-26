var utils = new (require('./../utils.js'))();
//Promise used to keep track of script termination
var de = Promise.defer();

class IsAdmin {

  /*
   * Truncates the `user´ table, adds half batch of none admin users and 
   * other halft admin user in order to test the isAdmin procedure
   */
  async start(connection, logfile, batch) {
    this.connection = connection;
	//batch of operations do test
	this.batch = batch;
	//Log file
	this.logfile = logfile;
	
    try {
      await this.truncate();
      await this.testIsAdmin();
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
      `, 'Truncated table user', 'Failed to truncate table `user´');
  }
  
  /*
   * Provides de required dependencies to proceed with the test
   */
  async insertValues() {
    try {
		var ds = Promise.defer();
		var sql = "INSERT INTO `user` VALUES ?";
		//generating values to insert
		var values = [];
		var i;
		//preparing half batch of non admin users
		for(i = 0; i < Math.ceil(this.batch/2); i++)
			//# id, name, photo, external_id, type_id, email, phonenumber, isadmin, token, password (md5 of 123qwe), locked, 
			values[i]=[i+1,'user'+(i+1),'photo'+(i+1),i+1,(i+1)%2,'mail'+(i+1),'910000000',0,'token','46f94c8de14fb36680850768ff1b7f2a',0,1];
		//preparing half batch of admin users
		for(i = Math.ceil(this.batch/2); i < this.batch; i++)
			//# id, name, photo, external_id, type_id, email, phonenumber, isadmin, token, password (md5 of 123qwe), locked, 
			values[i]=[i+1,'user'+(i+1),'photo'+(i+1),i+1,(i+1)%2,'mail'+(i+1),'910000000',1,'token','46f94c8de14fb36680850768ff1b7f2a',0,1];
		//inserts into database
		utils.log('warning', 'Processing dependencies. Please wait...');
		await this.connection.query(sql, [values], await function(err, saved) {
			//outputs results
			if( err || !saved ) utils.log('fail', 'Data not saved' + err);
			else { utils.log('success', 'Inserted ' + Math.ceil(saved.affectedRows/2) + ' ADMINS and ' + Math.floor(saved.affectedRows/2) + ' non ADMIN users');
			ds.resolve();
			}
		});  
		return ds.promise;
	} catch (err) {
      utils.log('fail', 'Failed to insert into `user` table \n' + err);
	  return;
    }
  }

  
  async testIsAdmin() {
   	var f = this.logfile;
	var batch = this.batch;
	var adminQnt=0;
	var connection = this.connection;
	try {
		await this.insertValues().then(
		async function() {
			var i, values=[];
			//calls procedure `isAdmin´
			var sql = "CALL projectary_tests.isAdmin(?, @output);SELECT @output as output;";
			//keeps time before query
			var startbench = process.hrtime();
			for (i=0;i<batch;i++)
				await connection.query(sql, i+1, async function (err, results, fields) {
					//adminQnt+=results[1][0]['output'];
					//await console.log("admins " + adminQnt);
					if( err ) { utils.log('fail', 'Problem detected:' + err); return; }
				});
			//gets the elapsed time	
			var endbench = process.hrtime(startbench);
			var msg='`isAdmin´ procedure was accurately called ' + batch + ' times in ' + utils.parseHrTime(endbench);
			utils.log('success', msg); utils.writeLog(f,msg); 
			de.resolve();
			//apesar de testado falta mostrar que os resultados obtidos correspondem ao esperado				
		});
	} catch (error) {
      utils.log('fail', 'Failed to test the `isAdmin´ procedure \n' + error);
      return;
    }
  }
}

module.exports = IsAdmin;
