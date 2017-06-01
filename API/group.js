var url = require('./main.js').config.url;
var request = require('./main.js').config.req;

class Group {
  constructor() { }

  /*
    Returns a list containing details of a given group or all groups
  */
  getGroup(index) {
    var searchString = "/group";
    if (index != null) searchString = "/group/" + index;
    describe("GET", function () {
      it("Return groups", function (done) {
        request(url)
          .get(searchString)
          .auth("teste@ipt.pt", "secret")
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
    Creates a group
    {
      "desc":"isto e um grupo",
      "password":"secret"
    }
  */
  createGroup(group) {
    describe("POST", function () {
      it("Create a group", function (done) {
        request(url)
          .post("/group/create")
          .send(group)
          .auth("teste@ipt.pt", "secret")
          .expect(200, done)
      });
    });
  };

  /*
    Associates a given user to a group
    {
      "desc":"isto e um grupo",
      "password":"secret"
    }
  */
  joinGroup(group) {
    describe("POST", function () {
      it("Join a group", function (done) {
        request(url)
          .post("/group/join")
          .send(group)
          .auth("teste@ipt.pt", "secret")
          .expect(200, done)
      });
    });
  }

  /*
    Deletes a group
  */
  removeGroup(index) {
    describe("DELETE", function () {
      it("Delete a group", function (done) {
        request(url)
          .delete("/group/" + index)
          .auth("teste@ipt.pt", "secret")
          .expect(200, done)
      });
    });
  }

  /*
    Alter the details of a given group
    {
      "desc":"isto e um grupo",
      "password":"secret"
    }
  */
  alterGroup(index, details) {
    describe("PUT", function () {
      it("Update group details", function (done) {
        request(url)
          .put("/group/" + index)
          .send(details)
          .auth("teste@ipt.pt", "secret")
          .expect(200, done)
      });
    });
  }
}

module.exports = Group;
