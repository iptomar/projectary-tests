var url = require('./main.js').config.url;
var request = require('./main.js').config.req;

class School {
  constructor() {}
  
/*
  Returns list containing school details
*/
  getSchool(){
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
}

module.exports = School;
