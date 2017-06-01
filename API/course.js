var url = require('./main.js').config.url;
var request = require('./main.js').config.req;

class Course {
  constructor() {}

/*
  Returns a list containing details about a given course or all courses
*/
  getCourse(index){
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
}

module.exports = Course;
