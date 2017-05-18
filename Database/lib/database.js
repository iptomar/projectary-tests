var utils = new (require('./utils.js'))();

class Database {

  /**
   * Get the upstream db from the repo, import the dump
   * and create the test database
   */
  async start() {
    try {
      await this.getDB();
      await this.importDB();
      await this.createTestDB();
      await this.checkTables();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Gets the latest database dump file from db repo
   */
  async getDB() {
    await utils.cmd(`
      wget --quiet https://raw.githubusercontent.com/iptomar/projectary-bd/master/projectary-bd-dump.sql -O projectary-bd-dump.sql
      `, 'Downloaded the latest database', 'Failed to download the latest database');
  }

  /**
   * Import the dump using a config file
   * Requires a mysql option file and a dump called projectary-bd-dump.sql
   * It will delete it that file
   * --default-file - read only config file with the user and password to be used
   */
  async importDB() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" < projectary-bd-dump.sql
      rm projectary-bd-dump.sql
      `, 'Imported the database', 'Failed to import the database');
  }

  /**
   * Duplicates the existing projectary-master to a new tests database
   * called projectary_tests.
   * The projectary-tests db is only for testing purposes of this program.
   * --routines - Dump stored routines (procedures and functions) from dumped databases
   */
  async createTestDB() {
    await utils.cmd(`
      mysql --defaults-file="./.my.cnf" -e "DROP DATABASE IF EXISTS projectary_tests"
      mysqldump --defaults-file="./.my.cnf" --routines projectary-master > dump.sql
      mysql --defaults-file="./.my.cnf" -e "CREATE DATABASE IF NOT EXISTS projectary_tests"
      mysql --defaults-file="./.my.cnf" projectary_tests < dump.sql
      rm -f dump.sql
      `, 'Created projectary-tests database from projectary-master', 'Failed to create projectary-tests');
  }

  /**
   * With mysqlcheck verify if everything is ok with the tables
   */
  async checkTables() {
    await utils.cmd(`
      mysqlcheck --defaults-file="./.my.cnf" --analyze projectary_tests
      `, 'Checked tables successfully', 'Failed on checking tables');
  }
}

module.exports = Database;