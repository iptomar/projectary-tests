var request = require('supertest');
var url = "http://localhost:8080";

describe("POST", function (){
  it("POST user", function(done){
    var user = {
  	"name": "aluno",
  	"external":  "1",
  	"type": "1",
  	"email": "email1",
  	"phone": "911234567",
  	"password": "secret"
  };
    request(url)
      .post("/user")
      .send(user)
      .expect(200, done)
  });
});
