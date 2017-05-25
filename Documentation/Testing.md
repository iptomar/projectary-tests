# What is automated testing?
Is basically the practice of writing code to test our code and then run those tests in an automated fashion


# What is Unit testing?
Units in your source code are small individual testable parts of your application. 
Unit testing is a process in which these small units of your code are tested to ensure their proper operation.

AngularJs is designed to make unit testing easier but it also depends on how you organise the code. Unit testing an application where concerns are divided into small independent units is easy rather than a piece of code that does everything.

# What is Karma?
Karma is a test runner provided by the Angular team, Karma will execute your tests in multiple browsers which shall ensure that our application is compatible in all browsers.

# What is Jasmine?
Jasmine is a javascript unit testing framework and will provide us with utilities to test our application. 
We can use any other javascript testing  framework for our testing but we’ll stick to jasmine as it is the most popular.

# How to install Karma?
**Install Karma:**
'$ npm install karma --save-dev'

**Install plugins that our project needs:**
'$ npm install karma-jasmine karma-chrome-launcher jasmine-core --save-dev'