var utils = new (require('./utils.js'))();

class Project {

  /**
   * Truncate the project table and test insertions
   */
  async start(connection) {
    this.connection = connection;

    try {
      await this.truncate();
      await this.insertProjects();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Truncate the project table so we while performing insertions
   * we can correctly track the number of rows before and 
   * after the insertions.
   */
  async truncate() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "TRUNCATE projectary_tests.project;"
      `, 'Truncated table project', 'Failed to truncate table project');
  }

  /**
   * Insert 5 projects and check if they're inserted by counting
   * the number of rows before and after the insertion of project.
   */
  async insertProjects() {
    try {
      var rowsCount;

      await this.connection.query('SELECT * FROM projectary_tests.project;', await function (error, results, fields) {
        rowsCount = results.length;
      });

      // mysqltest
      try {
        await utils.execPromise(`mysqltest --defaults-file="./.my.cnf" --database projectary_tests < sql/insertProjects.sql`);
      } catch (error) {
        throw new Error(error);
      }

      await this.connection.query('SELECT * FROM projectary_tests.project;', await function (error, results, fields) {
        // check if the rows before and after insertion
        // are the same, including the number of rows added
        if (rowsCount + 5 == results.length) {
          utils.log('success', 'Inserted 5 projects successfully');
        } else {
          utils.log('fail', 'The number of rows before and after the insertion do not match');
        }
      });
    } catch (error) {
      utils.log('fail', 'Failed to insert in projects table \n' + error);
      return;
    }
  }
}

module.exports = Project;
