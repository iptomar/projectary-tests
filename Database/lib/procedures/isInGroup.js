var utils = new (require('./../utils.js'))();
//Promise used to keep track of script termination
var de = Promise.defer();

class IsInGroup {

  /*
   * Truncate the `groupuser´ table and test the isInGroup procedure
   */
   async start(connection, logfile, batch) {
    this.connection = connection;
	//batch of operations do test
	this.batch = batch;
	//Log file
	this.logfile = logfile;
	
    try {
      await this.truncate();
      await this.testIsInGroup();
	  return de.promise;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Truncate the `groupuser´ table providing a clean testbed
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.groupuser;"
      `, 'Truncated table groupuser', 'Failed to truncate table groupuser');
  }

  
   /*
   * Provides de required dependencies to proceed with the test
   */
  async insertValues() {
    try {
		var ds = Promise.defer();
		var sql = "INSERT INTO `groupuser` VALUES ?";
		//generating values to insert
		var values = [];
		var i;
		//preparing half batch of non admin users
		for(i = 0; i < Math.ceil(this.batch/2); i++)
			//# groupid, userid, owner, grade, approvedin
			values[i]=[1,i+1,1,20,'2017-06-06 23:07:26'];
		//preparing half batch of admin users
		for(i = Math.ceil(this.batch/2); i < this.batch; i++)
			//# groupid, userid, owner, grade, approvedin
			values[i]=[2,i+1,1,20,'2017-06-06 23:07:26'];
		//inserts into database
		utils.log('warning', 'Processing dependencies. Please wait...');
		await this.connection.query(sql, [values], await function(err, saved) {
			//outputs results
			if( err || !saved ) utils.log('fail', 'Data not saved' + err);
			else { utils.log('success', 'Inserted ' + Math.ceil(saved.affectedRows/2) + ' users in one group and ' + Math.floor(saved.affectedRows/2) + ' on a second group');
			ds.resolve();
			}
		});  
		return ds.promise;
	} catch (err) {
      utils.log('fail', 'Failed to insert into `groupuser` table \n' + err);
	  return;
    }
  }

  
  async testIsInGroup() {
   	var f = this.logfile;
	var batch = this.batch;
	var connection = this.connection;
	try {
		await this.insertValues().then(
		async function() {
			var i, values=[];
 			var sql = "CALL projectary_tests.isInGroup(?, 2, @output); SELECT @output as output;";
			var user = Math.round(utils.getRandom(1,batch));
			//keeps time before query
			var startbench = process.hrtime();
			for (i=0;i<batch;i++)
				await connection.query(sql, user, async function (err, results, fields) {
					if( err ) { utils.log('fail', 'Problem detected:' + err); return; }
					//if (results[1][0]['output'])
					//	await utils.log('success', 'Random user ' + user + ' exists in that group!');
					//else await utils.log('success', 'Random user ' + user + ' does not exists in that group!');
				});
			//gets the elapsed time	
			var endbench = process.hrtime(startbench);
			var msg='`isInGroup´ procedure was accurately called ' + batch + ' times in ' + utils.parseHrTime(endbench);
			utils.log('success', msg); utils.writeLog(f,msg); 
			de.resolve();
			//apesar de testado falta mostrar que os resultados obtidos correspondem ao esperado				
		});
    } catch (error) {
      utils.log('fail', 'Failed to test the `isInGroup´ procedure \n' + error);
      return;
    }
  }
}

module.exports = IsInGroup;
