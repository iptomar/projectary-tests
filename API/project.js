var url = require('./main.js').config.url;
var request = require('./main.js').config.req;

class Project {
  constructor() { }

  /*
    Creates a project
    {
      "name": "Teste",
      "description":  "Something",
      "course": "1"
    }
  */
  createProject(project) {
    describe("POST", function () {
      it("Create Project", function (done) {
        request(url)
          .post("/project")
          .auth("ninja@caldas.ipt", "123qwe")
          .send(project)
          .expect(200, done)
      });
    });
  };

  /*
    Returns details for a project or all projects
  */
  getProject(index) {
    var searchString = "/project";
    if (index != null) searchString = "/project/" + index;
    describe("GET", function () {
      it("Return projects", function (done) {
        request(url)
          .get(searchString)
          .auth("ninja@caldas.ipt", "123qwe")
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            done();
            console.log(res.body);
          });
      });
    });
  };

  /*
    Changes the details of a project
  {
    "name": "newProjectName",
    "description": "newDescription",
    "course": "1"
  }
  */
  alterProject(id, details) {
    describe("PUT", function () {
      it("Change the details of a project", function (done) {
        request(url)
          .put("/project/" + id)
          .send(details)
          .auth("ninja@caldas.ipt", "123qwe")
          .expect(200, done)
      });
    });
  }

  /*
    Returns all user applications for a specific project
  */
  getProjectApplications(index) {
    describe("GET", function () {
      it("Return project applications", function (done) {
        request(url)
          .get("/project/" + index + "/applications")
          .auth("ninja@caldas.ipt", "123qwe")
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            done();
          });
      });
    });
  }
}

module.exports = Project;
