var request = require('supertest');
var url = "http://localhost:8080";

// USERS  -----------------------------------------------------------------------
/*
  Authenticates a given user

  {
    "username":"teste@ipt.pt",
    "password":"secret"
  }

*/
function authUser(user){
  describe("LOGIN", function(){
    it("Auth", function(done){
      request(url)
      .post("/login")
      .auth("teste@ipt.pt","secret")
      .send(user)
      .expect(200, done)
    });
  });
};

/*
  Creates a user

  {
  	"name": "Teste",
  	"external":  "1",
  	"type": "1",
  	"email": "teste@ipt.pt",
  	"phone": "911234567",
  	"password": "secret"
  }
*/
function createUser(user){
  describe("POST", function (){
    it("Create a user", function(done){
      request(url)
      .post("/user")
      .send(user)
      .expect(200, done)
    });
  });
};

/*
  Returns info about a specific user or all users
*/
function getUser(index){
  var searchString = "/user";
  if (index != null) searchString = "/user/" + index;
  describe("GET", function (){
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

/*
  Marks a user as active, enabling the user account
*/
function approveUser(index) {
  describe("POST", function (){
    it("Approve user", function(done){
      request(url)
      .post("/user/" + index + "/approve")
      .auth("teste@ipt.pt","secret")
      .expect(200, done)
    });
  });
}

/*
  Returns the list of users still inactive
*/
function getPendingUser(){
  describe("GET", function (){
    it("Return pending users", function(done){
      request(url)
      .get("/user/pending")
      .auth("teste@ipt.pt","secret")
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
    });
  });
};

/*
 Locks a user account, disabling its use
*/
function lockUser(index) {
  describe("PUT", function (){
    it("Lock a user", function(done){
      request(url)
      .put("/user/" + index + "/swlock")
      .auth("teste@ipt.pt","secret")
      .expect(200, done)
    });
  });
}

/*
  Changes the password for a given user account

  {
    "passowrd":"teste"
  }
*/
function changePassword(password) {
  describe("PUT", function (){
    it("Change the password of a user", function(done){
      request(url)
      .put("/user/chpassword")
      .send(password)
      .auth("teste@ipt.pt","secret")
      .expect(200, done)
    });
  });
}

/*
  Creates a teacher account

  {
    "name": "user2",
    "external": "150",
    "email": "user@ipt.pt",
    "phone": "911231231",
    "password": "secret"
  }
*/
function createTeacher(teacher){
  describe("POST", function(){
    it("Create teacher", function(done){
    request(url)
      .post("/teacher")
      .send(teacher)
      .auth("teste@ipt.pt","secret")
      .expect(200, done)
    });
  });
}

function alterUser(details) {
  describe("PUT", function (){
    it("Change the details of a user", function(done){
      request(url)
      .put("/user")
      .send(details)
      .auth("teste@ipt.pt","secret")
      .expect(200, done)
    });
  });
}

// PROJECTS --------------------------------------------------------------------

/*
  Creates a project

  {
    "name": "Teste",
    "description":  "Something",
    "course": "1"
  }
*/
function createProject(project){
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

/*
  Returns details for a project or all projects
*/
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

function alterProject(details) {
  describe("PUT", function (){
    it("Change the details of a project", function(done){
      request(url)
      .put("/project")
      .send(details)
      .auth("teste@ipt.pt","secret")
      .expect(200, done)
    });
  });
}

/*
  Returns all user applications for a specific project
*/

function getProjectApplications(index) {
  describe("GET", function (){
    it("Return project applications", function(done){
      request(url)
      .get("/project/"+ index + "/applications")
      .auth("teste@ipt.pt","secret")
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
    });
  });
}

// GROUPS ----------------------------------------------------------------------
function getGroup(index){
  var searchString = "/group";
  if (index != null) searchString = "/group/" + index;
  describe("GET", function (){
    it("Return groups", function(done){
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

/*
{
  "desc":"isto e um grupo",
  "password":"secret"
}
*/
function createGroup(group){
  describe("POST",function() {
    it("Create a group", function (done) {
      request(url)
      .post("/group/create")
      .send(group)
      .auth("teste@ipt.pt","secret")
      .expect(200, done)
    });
  });
};

/*
{
  "desc":"isto e um grupo",
  "password":"secret"
}
*/
function joinGroup(group) {
  describe("POST",function() {
    it("Join a group", function (done) {
      request(url)
      .post("/group/join")
      .send(group)
      .auth("gandabarcelos@ipt.pt","secret")
      .expect(200, done)
    });
  });
}

function removeGroup(index) {
  describe("DELETE",function() {
    it("Delete a group", function (done) {
      request(url)
      .delete("/group/" + index)
      .auth("teste@ipt.pt","secret")
      .expect(200, done)
    });
  });
}

/*
{
  "desc":"isto e um grupo",
  "password":"secret"
}
*/
function alterGroup(index, details) {
  var searchString = "/group";
  if (index != null) searchString = "/group/" + index;
  describe("PUT", function (){
    it("Update group details", function(done){
      request(url)
      .put(searchString)
      .send(details)
      .auth("teste@ipt.pt","secret")
      .expect(200, done)
    });
  });
}

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
  describe("GET", function (){
    it("Return courses", function(done){
      request(url)
      .get("/course/" + index)
      .auth("teste@ipt.pt","secret")
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
    });
  });
};

// ATTRIBUTES ------------------------------------------------------------------
function getAttribute(){
  describe("GET", function (){
    it("Return attributes", function(done){
      request(url)
        .get("/attribute")
        .auth("teste@ipt.pt", "secret")
        .expect(200)
        .end(function(err, res){
          if(err) return done(err);
          done();
        });
    });
  });
};

/*
  "name":"teste"
*/
function createAttribute(attribute){
  describe("POST",function() {
    it("Create a attribute", function (done) {
      request(url)
      .post("/attribute")
      .auth("teste@ipt.pt", "secret")
      .send(attribute)
      .expect(200, done)
    });
  });
};

// APPLICATIONS -----------------------------------------------------------------------
function getApplication(index) {
  var searchString = "/application";
  if (index != null) searchString = "/application/" + index;
  describe("GET", function (){
    it("Return project applications", function(done){
      request(url)
        .get(searchString)
        .auth("teste@ipt.pt", "secret")
        .expect(200)
        .end(function(err, res){
          if(err) return done(err);
          done();
        });
    });
  });
}

/*
  "groupid":"1",
  "projectid":"1"
*/
function createApplication(application){
  describe("POST",function() {
    it("Create a project application", function (done) {
      request(url)
      .post("/application")
      .auth("teste@ipt.pt", "secret")
      .send(application)
      .expect(200, done)
    });
  });
};

function acceptApplication(application) {
  describe("POST",function() {
    it("Accept a project application", function (done) {
      request(url)
      .post("/application/accept")
      .auth("teste@ipt.pt", "secret")
      .send(application)
      .expect(200, done)
    });
  });
}

function test404Routes() {
  describe("POST",function() {
    it("Should return 404 on unknown route", function (done) {
      request(url)
      .post("/testing404")
      .auth("teste@ipt.pt", "secret")
      .expect(404, done)
    });
  });
}
