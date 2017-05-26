# Karma testing

First we have to install karma and jasmine

**Install Karma:**
'$ npm install karma --save-dev''

**Install plugins:**
'$ npm install karma-jasmine karma-chrome-launcher jasmine-core --save-dev'

You can also install it globally by '$ npm install -g karma-cli'

## After installing karma , run the comand 'karma init'
> This will ask you a series of questions:
> *For the framework, press Tab until you see Jasmine
> *For the files, enter projectary-tests/Frontend/KarmaTests/js/*.js and projectary-tests/Frontend/KarmaTests/test/*.js 
> *For the browser, select whichever you have installed. Note that browser names in the configuration file are case-sensitive, for example Chrome, IE, or Firefox, whereas in their related npm package names they're lower case.
> *Accept the defaults for everything else.

You can see your configurations on the file karma.conf.js

## Where to store the code?
The file with the code function you want to test should be in the js folder, while the file doing the testing should be in the test folder

After having tests to test you can run them from the command line 'karma start --single-run'