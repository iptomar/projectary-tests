# projectary-tests

## Structure

DataBase - Folder that holds all of the testing relative to the database

* firstTest.js - Connection test of the mysql node module

## Note
In case of root login authentication error, create and use admin account instead
```sql
CREATE USER 'admin'@'localhost' IDENTIFIED BY '';
GRANT ALL PRIVILEGES ON * . * TO 'admin'@'localhost';
FLUSH PRIVILEGES;
```
