var request = require('supertest');
var apiUrl = "http://localhost:8080";

exports.config = {
  url: "http://localhost:8080",
  req: request
}

var application = new (require('./application.js'))();
var attribute = new (require('./attribute.js'))();
var course = new (require('./course.js'))();
var group = new (require('./group.js'))();
var project = new (require('./project.js'))();
var school = new (require('./school.js'))();
var user = new (require('./user.js'))();

// Testing data ---------------------------------------

var teacherData = {
  "name": "teacherTest",
  "external": "1",
  "type": "2",
  "email": "teste1@ipt.pt",
  "phone": "911234568",
  "password": "secret"
};

var studentData = {
  "name": "studentTest",
  "external": "2",
  "type": "1",
  "email": "teste2@ipt.pt",
  "phone": "911234569",
  "password": "secret"
};

var attributeData = {
  "name": "attributeTest"
};

var groupData = {
  "desc": "groupTest",
  "password": "secret"
}

var projectData = {
  "name": "projectTest",
  "description": "descTest",
  "course": "1"
}

var authData = {
  "username": "ninja@caldas.ipt",
  "password": "123qwe"
}

var passwordData = {
  "password": "123qwer"
}

var alterUserData = {
  "name": "newName",
  "email": "newmail@ipt.pt",
  "phonenumber": "911111111",
  "password": "pass"
}

var alterProjectData = {
  "name": "newProjectName",
  "description": "newDescription",
  "course": "1"
}

// Tests -------------------------------------------------------

user.authUser(authData);
user.getUser(1);
user.alterUser(alterUserData);
user.changePassword();
user.getPendingUser();
user.getUserPhoto();
user.lockUser(2);

project.createProject(projectData);
project.getProject(1);
project.alterProject(2, alterProjectData);
project.getProjectApplications(1);

attribute.createAttribute(attributeData);
attribute.getAttribute();

school.getSchool();
course.getCourse(1);


test404Routes(apiUrl);
/*
  Returns a 404 in case of unknown route
*/
function test404Routes(url) {
  describe("POST", function () {
    it("Should return 404 on unknown route", function (done) {
      request(url)
        .post("/unknownRoute")
        .auth("ninja@caldas.ipt", "123qwe")
        .expect(404, done)
    });
  });
}
