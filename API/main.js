var request = require('supertest');
var url = "http://localhost:8080";

// USERS -----------------------------------------------------------------------
/* user format -----------------------------------------------------------------
	"name": "Teste",
	"external":  "1",
	"type": "1",
	"email": "teste@ipt.pt",
	"phone": "911234567",
	"password": "secret"
};*/
function postUser(user){
  describe("POST User", function (){
    it("Create user", function(done){
    request(url)
      .post("/user")
      .send(user)
      .expect(200, done)
    });
  });
};

function getUser(index){
  var searchString = "/user";
  if (index != null) searchString = "/user/" + index;
  describe("GET User", function (){
    // Get user/users info
    it("Return users", function(done){
      request(url)
      .get(searchString)
      .auth("teste@ipt.pt","secret")
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done();
        console.log(res.body);
      });
    });
  });
};

// PROJECTS --------------------------------------------------------------------
/* project format --------------------------------------------------------------
  "name": "Teste",
  "description":  "Something",
  "course": "1"
*/
function postProject(project){
  describe("POST Project", function (){
    it("Create Project", function(done){
      request(url)
        .post("/project")
        .auth("teste@ipt.pt", "secret")
        .send(project)
        .expect(200, done)
    });
  });
};

function getProject(index){
  var searchString = "/project";
  if (index != null) searchString = "/project/" + index;
  describe("GET", function (){
    it("Return projects", function(done){
      request(url)
      .get(searchString)
      .auth("teste@ipt.pt","secret")
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done();
        console.log(res.body);
      });
    });
  });
};

// TESTS -----------------------------------------------------------------------
/*var user = {
  "name": "Teste",
	"external":  "1",
	"type": "1",
	"email": "teste@ipt.pt",
	"phone": "911234567",
	"password": "secret"
}
postUser(user);*/

getUser();
