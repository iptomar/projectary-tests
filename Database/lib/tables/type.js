var utils = new (require('./../utils.js'))();

class Type {

  /**
   * Truncate the type table and test insertions
   */
  async start(connection, batch) {
    this.connection = connection;
	//batch of operations do test
	this.batch = batch;

    try {
      await this.truncate();
      await this.insertTypes();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Truncate the type table so we while performing insertions
   * we can correctly track the number of rows before and 
   * after the insertions.
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.type;"
      `, 'Truncated table type', 'Failed to truncate table type');
  }

  /**
   * Insert n types and check if they're inserted by counting
   * the number of rows before and after the insertion of types.
   */
  async insertTypes() {
      try {
		var sql = "INSERT INTO type VALUES ?";
		var values = [];
		for(var i = 0; i < this.batch; i++)
			values[i]=[i+1,'test'+(i+1)];

		var startbench = process.hrtime();
		await this.connection.query(sql, [values], await function(err, saved) {
			var endbench = process.hrtime(startbench);
			if( err || !saved ) utils.log('fail', 'Data not saved' + err);
			else utils.log('success', 'Inserted ' + saved.affectedRows + ' rows in table `Types` in ' + utils.parseHrTime(endbench));
		});
    } catch (error) {
      utils.log('fail', 'Failed to insert types \n' + error);
      return;
    }
  }
}

module.exports = Type;
