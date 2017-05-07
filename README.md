# projectary-tests
Repository for testing the code from the projectary repos.

> Contents
> * [Structure](#structure)
> * [Install](#install)
> * [Usage](#usage)
> * [Documentation](#documentation)

## Structure

API - Folder that holds all of the testing relative to the api.

* main.js - File containing api testing methods

Database - Folder that holds all of the testing relative to the database.

## Install

To install every component you just need NodeJS. Run `npm install` and everything should be installed after a few minutes.

## Usage

**API** - To run just do `npm run api-test`.

**CasperJS** - To run just do `npm run casperjs-test`.

**Database**
* Dependencies: bash, rm command, wget, mysql and mysqldump.
* It uses a [mysql option file](https://dev.mysql.com/doc/refman/5.7/en/option-files.html), example [here](Documentation/Database/.my.cnf). Name it `.my.cnf`, place it on the Database folder with read-only permissions (chmod or file permissions).
* Due to the lack of support for async/await in the node version being used we need to use babel - with [this plugin](https://babeljs.io/docs/plugins/transform-async-to-generator/) - and build it first. Build it with `npm run db-build`. To run just do `npm run db-test`.


**Protractor**
* Dependencies: java runtime and a desktop enviroment.
* Protractor needs to have a selenium server sopreview we automatically install the official standalone server (a .jar file) via webdriver-manager - comes with proctrator.
* To start the server do `npm run selenium-start` and on a different terminal do `npm run selenium-test` to run the tests.


## Documentation

All of our documentation is located [here](Documentation/index.md).

This section contains all the software used to test this project.
