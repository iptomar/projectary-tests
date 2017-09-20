var utils = new (require('./../utils.js'))();

class School {

  /**
   * Truncate the school table and test insertions
   */
  async start(connection, logfile, batch) {
    this.connection = connection;
	//batch of operations do test
	this.batch = batch;
	//Log file
	this.logfile = logfile;
	
    try {
      await this.truncate();
      await this.insertSchools();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Truncate the school table so we while performing insertions
   * we can correctly track the number of rows before and 
   * after the insertions.
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.school;"
      `, 'Truncated table school', 'Failed to truncate table school');
  }

  /**
   * Insert n schools and check if they're inserted by checking affectedRows
   */
  async insertSchools() {
    try {
		var f = this.logfile;
		var sql = "INSERT INTO school VALUES ?";
		//generating values to insert
		var values = [];
		for(var i = 0; i < this.batch; i++)
			values[i]=[i+1,'school'+(i+1)];
		var startbench = process.hrtime();
		await this.connection.query(sql, [values], await function(err, saved) {
			var endbench = process.hrtime(startbench);
			if( err || !saved ) utils.log('fail', 'Data not saved' + err);
			else { 	var msg = 'Inserted ' + saved.affectedRows + ' rows into table `schools` in ' + utils.parseHrTime(endbench);			
					utils.log('success', msg); utils.writeLog(f,msg); 
			}		
		});    
    } catch (error) {
      utils.log('fail', 'Failed to insert `schools` \n' + error);
      return;
    }
  }
}

module.exports = School;
