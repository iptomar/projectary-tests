# Documentation

> Contents
> * [Structure](#structure)
> * [Install](#install)
> * [Run](#run)
> * [API Testing](#api-testing)
> * [Database Testing](#database-testing)
> * [Frontend Testing](#frontend-testing)
>   * Angular Testing
>   * CasperJS
>   * Selenium
>   * PhantomJS
>   * Protractor

## Structure

API - Folder that holds all of the testing relative to the api.

* api_test.js - File containing api testing methods

Database - Folder that holds all of the testing relative to the database.

* getLatestDB.sh - bash script to download the latest available database dump from the repo to a .sql and then run it.

## Install

To install every component you just need NodeJS. Run `npm install` and everything should be installed after a few minutes.

## Setup and Dependencies

**Database**
* Dependencies: bash, mysql and mysqldump.
* It uses a [mysql option file](https://dev.mysql.com/doc/refman/5.7/en/option-files.html), example [here](Database/.my.cnf). Name it `.my.cnf`, place it on the Database folder with read-only permissions (chmod or file permissions).

**Protractor**
* Dependencies: java and a desktop enviroment.
* Protractor needs to have a selenium server so we automatically install the official standalone server (a .jar file) during installation.

## Run

You need to run each component separately:

**API** - To run just do `npm run api-test`.

**CasperJS** - To run just do `npm run casperjs-test`.

**Database** - To run just do `npm run db-test`.

**Protractor** - To start the server do `npm run selenium-start` and on a different terminal do `npm run selenium-test` to run the tests.


## API Testing
Our section about API testing is located [here](API/index.md).

* **Supertest**: Our section about testing angularjs is located [here](API/Supertest/Supertest.md).

## Database Testing
Our section about database testing is located [here](Database/index.md)

## Frontend Testing
Our section about frontend testing is located [here](Frontend/index.md).

* **Angular Testing**: Our section about testing angularjs is located [here](Frontend/Angular/angular.md).
* **CasperJS**: Our section about casperJS is located [here](Frontend/CasperJS/CasperJS.md).
* **Selenium**: Our section about selenium is located [here](Frontend/Selenium/Selenium.md).
* **PhantomJS**: Our section about phantomJS is located [here](Frontend/PhantomJS/PhantomJS.md).
* **Protractor**: Our section about protractor is located [here](Frontend/Selenium/Protractor.md).
