var url = require('./main.js').config.url;
var request = require('./main.js').config.req;

class Attribute {
  constructor() {}

/*
  Returns a list with all attributes
*/
  getAttribute(){
    describe("GET", function (){
      it("Return attributes", function(done){
        request(url)
          .get("/attribute")
          .auth("ninja@caldas.ipt", "123qwe")
          .expect(200)
          .end(function(err, res){
            if(err) return done(err);
            done();
          });
      });
    });
  };

/*
  Adds a attribute
  {
    "name":"teste"
  }
*/
  createAttribute(attribute){
    describe("POST",function() {
      it("Create a attribute", function (done) {
        request(url)
        .post("/attribute")
        .auth("ninja@caldas.ipt", "123qwe")
        .send(attribute)
        .expect(200, done)
      });
    });
  };
}

module.exports = Attribute;
