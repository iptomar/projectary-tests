## Structure

DataBase - Folder that holds all of the testing relative to the database

* firstTest.js - Connection test of the mysql node module

## Angular Testing

Our section about angular is located [here](Angular/angular.md).

## Note
In case of root login authentication error, create and use admin account instead
```sql
CREATE USER 'admin'@'localhost' IDENTIFIED BY '';
GRANT ALL PRIVILEGES ON * . * TO 'admin'@'localhost';
FLUSH PRIVILEGES;
```
