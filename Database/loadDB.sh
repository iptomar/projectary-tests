#!/bin/bash

# get the dump from upstream
wget --no-verbose https://raw.githubusercontent.com/iptomar/projectary-bd/master/projectary-bd-dump.sql
# import the dump using a config file
# --default-file - read only config file with the user and password to be used
mysql --defaults-file="./.my.cnf" < projectary-bd-dump.sql
rm projectary-bd-dump.sql

printf '%s\n' "Downloaded and imported the latest database successfully"

# drop the existing tests database, dump the current database to a file,
# create a new database with it and delete the dump file
mysql --defaults-file="./.my.cnf" -e "DROP DATABASE IF EXISTS projectary_tests"
mysqldump --defaults-file="./.my.cnf" --routines projectary-master > dump.sql
mysql --defaults-file="./.my.cnf" -e "CREATE DATABASE IF NOT EXISTS projectary_tests"
mysql --defaults-file="./.my.cnf" projectary_tests < dump.sql
rm -f dump.sql

printf '%s\n' "Created projectary-tests database from projectary-master successfully"