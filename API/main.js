var request = require('supertest');
var url = "http://localhost:8080";

// POST ------------------------------------------------------------------------
describe("POST", function (){
  it("/user", function(done){
    var user = {
  	"name": "Teste",
  	"external":  "1",
  	"type": "1",
  	"email": "teste@ipt.pt",
  	"phone": "911234567",
  	"password": "secret"
  };
  request(url)
    .post("/user")
    .send(user)
    .expect(200, done)
});

// GET -------------------------------------------------------------------------
describe("GET", function (){
  it("/user", function(done){
    request(url)
    .get("/user")
    .auth("teste@ipt.pt","secret") // Authentication
    .expect(200, done)
  });

  it("/user/:id", function(done){
    request(url)
    .get("/user/1")
    .auth("teste@ipt.pt","secret")
    .expect(200, done)
    });
  });
});
