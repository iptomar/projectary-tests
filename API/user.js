var url = require('./main.js').config.url;
var request = require('./main.js').config.req;

class User {
  constructor() { }

  /*
    Authenticates a given user
    {
      "username":"teste@ipt.pt",
      "password":"secret"
    }
  */
  authUser(user) {
    describe("LOGIN", function () {
      it("Auth", function (done) {
        request(url)
          .post("/login")
          .auth("teste@ipt.pt", "secret")
          .send(user)
          .expect(200, done)
      });
    });
  };

  /*
    Creates a student
    {
      "name": "Teste",
      "external":  "1",
      "type": "1",
      "email": "teste@ipt.pt",
      "phone": "911234567",
      "password": "secret"
    }
  */
  createUser(user) {
    describe("POST", function () {
      it("Create a user", function (done) {
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
  getUser(index) {
    var searchString = "/user";
    if (index != null) searchString = "/user/" + index;
    describe("GET", function () {
      it("Return users", function (done) {
        request(url)
          .get(searchString)
          .auth("teste@ipt.pt", "secret")
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            done();
          });
      });
    });
  };

  /*
    Marks a user as active, enabling the user account
  */
  approveUser(index) {
    describe("POST", function () {
      it("Approve user", function (done) {
        request(url)
          .post("/user/" + index + "/approve")
          .auth("teste@ipt.pt", "secret")
          .expect(200, done)
      });
    });
  }

  /*
    Returns the list of users still inactive
  */
  getPendingUser() {
    describe("GET", function () {
      it("Return pending users", function (done) {
        request(url)
          .get("/user/pending")
          .auth("teste@ipt.pt", "secret")
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            done();
          });
      });
    });
  };

  /*
   Locks a user account, disabling its use
  */
  lockUser(index) {
    describe("PUT", function () {
      it("Lock a user", function (done) {
        request(url)
          .put("/user/" + index + "/swlock")
          .auth("teste@ipt.pt", "secret")
          .expect(200, done)
      });
    });
  }

  /*
    Changes the password for a given user account
    {
      "password":"teste"
    }
  */
  changePassword(password) {
    describe("PUT", function () {
      it("Change the password of a user", function (done) {
        request(url)
          .put("/user/chpassword")
          .send(password)
          .auth("teste@ipt.pt", "secret")
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
  createTeacher(teacher) {
    describe("POST", function () {
      it("Create teacher", function (done) {
        request(url)
          .post("/teacher")
          .send(teacher)
          .auth("teste@ipt.pt", "secret")
          .expect(200, done)
      });
    });
  }

  /*
      Changes the details of a given user
    {
        "name": "newName",
        "email": "newmail@ipt.pt",
        "phonenumber": "911111111",
        "password": "pass"
    }
  */
  alterUser(details) {
    describe("PUT", function () {
      it("Change the details of a user", function (done) {
        request(url)
          .put("/user")
          .send(details)
          .auth("teste@ipt.pt", "secret")
          .expect(200, done)
      });
    });
  }

  // Uploads a photo to be used by the user profile
  // path - path to the photo in storage
  sendPhoto(path) {
    describe("POST", function () {
      it("Send user photo", function (done) {
        request(url)
          .post("/photo")
          .auth("teste@ipt.pt", "secret")
          .attach("userPhoto", path)
          .expect(200, done)
      });
    });
  };

  // Returns a buffer containing the user profile photo
  getUserPhoto(index) {
    describe("GET", function () {
      it("Return user photo", function (done) {
        request(url)
          .get("/photo/" + index)
          .auth("teste@ipt.pt", "secret")
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            done();
          });
      });
    });
  };

  recoverUser(){
    describe("GET", function () {
      it("Return user token", function (done) {
        request(url)
          .get("/user/recover")
          .auth("majac@lucyu.com", "secret")
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            done();
          });
      });
    });
  }
}

module.exports = User;
