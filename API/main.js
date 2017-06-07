var request = require('supertest');
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

var userData = {
  "name": "userTest",
  "external": "1",
  "type": "1",
  "email": "teste@ipt.pt",
  "phone": "911234567",
  "password": "secret"
};

var teacherData = {
  "name": "teacherTest",
  "external": "2",
  "type": "2",
  "email": "teste2@ipt.pt",
  "phone": "911234568",
  "password": "secret"
};

var studentData = {
  "name": "studentTest",
  "external": "3",
  "type": "3",
  "email": "teste3@ipt.pt",
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

// Tests -------------------------------------------------------
user.createUser(userData);
user.createTeacher(teacherData);
user.approveUser(9);
user.authUser();

/*
  Returns a 404 in case of unknown route
*/
function test404Routes(url) {
  describe("POST", function () {
    it("Should return 404 on unknown route", function (done) {
      request(url)
        .post("/unknownRoute")
        .auth("teste@ipt.pt", "secret")
        .expect(404, done)
    });
  });
}
