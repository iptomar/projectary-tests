var utils = new (require('./../utils.js'))();

class UpdateUserAttribute {
	/**
   * Truncate the userattribute table and test the updateUserAttribute procedure
   */
   async start(connection) {
    this.connection = connection;

    try {
      await this.truncate();
      await this.testUpdateUserAttribute();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Truncate the userattribute table so we can test the procedure
   * without having other interferences
   */
   async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.userattribute;"
      `, 'Truncated table userattribute', 'Failed to truncate table userattribute');
  }

  async testUpdateUserAttribute() {
    try {
      var update;

      // insert a row in the table userattribute
      try {
        await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/procedures/updateUserAttribute.sql`);
      } catch (error) {
        throw new Error(error);
      }

      // get the status of active row of the table userattribute
      await this.connection.query('SELECT * FROM userattribute WHERE userid=1 AND attributeid=1;', await function (error, results, fields) {
       		update = results[0].value;
      });

      // call the procedure 
      try {
        await utils.execPromise(`mysql --defaults-file="./.my.cnf" -e "CALL projectary_tests.updateUserAttribute(1,1,'teste');"`);
      } catch (error) {
        throw new Error(error);
      }

      // check if the procedured worked
      await this.connection.query('SELECT * FROM userattribute WHERE userid=1 AND attributeid=1;', await function (error, results, fields) {
        if (update == 'um' && results[0].value == 'teste') {
          utils.log('success', 'updateUserAttribute procedure called successfully');
        } else {
			console.log(update, results[0].value);
			utils.log('fail', 'Failed to call the updateUserAttribute procedure');
        }
      });

   } catch (error) {
      utils.log('fail', 'Failed to test the updateUserAttribute procedure \n' + error);
      return;
    }
  }
}

module.exports = UpdateUserAttribute;