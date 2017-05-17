var request = require('supertest');
var url = "http://localhost:8080";

// USERS -----------------------------------------------------------------------
/*
	"name": "Teste",
	"external":  "1",
	"type": "1",
	"email": "teste@ipt.pt",
	"phone": "911234567",
	"password": "secret"
};*/

function authUser(){
  describe("LOGIN", function(){
    it("Auth", function(done){
    request(url)
      .post("/login")
      .auth("teste@ipt.pt","secret")
      .send({"username":"teste@ipt.pt", "password":"secret"})
      .expect(200, done)
    });
  });
};

function postUser(user){
  describe("POST", function (){
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
  describe("GET", function (){
    // Get user/users info
    it("Return users", function(done){
      request(url)
      .get(searchString)
      .auth("teste@ipt.pt","secret")
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
    });
  });
};

/* TEACHERS --------------------------------------------------------------
/*
  "name": "user",
  "external_id": "15000",
  "email": "user@ipt.pt",
  "phonenumber": "555123123",
  "password": "secret"
*/
function postTeacher(teacher){
  describe("POST", function(){
    it("Create teacher", function(done){
    request(url)
      .post("/user")
      .send(teacher)
      .expect(200, done)
    });
  });
}

// PROJECTS --------------------------------------------------------------------
/*
  "name": "Teste",
  "description":  "Something",
  "course": "1"
*/
function postProject(project){
  describe("POST", function (){
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
      });
    });
  });
};

// SCHOOLS --------------------------------------------------------------------
function getSchools(){
  describe("GET", function (){
    it("Return schools", function(done){
      request(url)
        .get("/school")
        .auth("teste@ipt.pt", "secret")
        .expect(200)
        .end(function(err, res){
          if(err) return done(err);
          done();
        });
    });
  });
};

// COURSES --------------------------------------------------------------------
function getCourse(index){
  var searchString = "/course";
  if (index != null) searchString = "/course/" + index;
  describe("GET", function (){
    it("Return courses", function(done){
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
