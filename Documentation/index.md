# Documentation

> Contents
> * [Structure](#structure)
> * [Frontend Testing](#frontend-testing)
>   * [Angular Testing](#angular-testing)
> * [API Testing](#api-testing)
> * [Notes](#notes)

## Structure

DataBase - Folder that holds all of the testing relative to the database

* getLatestDB.sh - bash script to download the latest available database dump from the repo to a .sql and then run it.

API - Folder that holds all of the testing relative to the api

* api_test.js - File containing api testing methods

## Frontend Testing
Our section about frontend testing is located [here](Frontend/index.md).

### Angular Testing
Our section about testing angularjs is located [here](Frontend/Angular/angular.md).

### API Testing
Our section about api testing is located [here](API/index.md).

## Notes
In case of root login authentication error, create and use admin account instead
```sql
CREATE USER 'admin'@'localhost' IDENTIFIED BY '';
GRANT ALL PRIVILEGES ON * . * TO 'admin'@'localhost';
FLUSH PRIVILEGES;
```
