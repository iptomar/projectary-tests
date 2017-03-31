# Documentation

> Contents
* [Structure](#structure)
* [Frontend Testing](#frontend-testing)
  * [Angular Testing](#angular-testing)
* [Notes](#notes)

## Structure

DataBase - Folder that holds all of the testing relative to the database

* firstTest.js - Connection test of the mysql node module

## Frontend Testing
Our section about frontend testing is located [here](Frontend/index.md).

### Angular Testing
Our section about testing angularjs is located [here](Frontend/Angular/angular.md).


## Notes
In case of root login authentication error, create and use admin account instead
```sql
CREATE USER 'admin'@'localhost' IDENTIFIED BY '';
GRANT ALL PRIVILEGES ON * . * TO 'admin'@'localhost';
FLUSH PRIVILEGES;
```
