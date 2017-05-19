var request = require('supertest');
exports.config = {
  url:"http://localhost:8080",
  req: request
}
var application = new (require('./application.js'))();
var attribute = new (require('./attribute.js'))();
var course = new (require('./course.js'))();
var group = new (require('./group.js'))();
var project = new (require('./project.js'))();
var school = new (require('./school.js'))();
var user = new (require('./user.js'))();
/*----------------------------------------------------------------------------*/
application.getApplication();
attribute.getAttribute();
course.getCourse(1);
group.getGroup();
project.getProject();
school.getSchool();
user.getUser();
test404Routes(this.config.url);
/*----------------------------------------------------------------------------*/
/*
  Returns a 404 in case of unknown route
*/
function test404Routes(url) {
  describe("POST",function() {
    it("Should return 404 on unknown route", function (done) {
      request(url)
      .post("/unknownRoute")
      .auth("teste@ipt.pt", "secret")
      .expect(404, done)
    });
  });
}
