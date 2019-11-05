//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let User = require("../app/models/user");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe("Users", () => {
  beforeEach(done => {
    //Before each test we empty the database
    User.remove({}, err => {
      done();
    });
  });
  /*
   * Test the /GET route
   */
  describe("/GET user", () => {
    it("it should GET all the users", done => {
      chai
        .request(server)
        .get("/api/users")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
  /*
   * Test the /POST route
   */
  describe("/POST user", () => {
    it("it should POST a user", done => {
      let user = {
        email: "jason@mailinator.com",
        name: "Jason"
      };
      chai
        .request(server)
        .post("/api/user")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });

    it("it should ​jason@mailinator.com​ is already exist in database", done => {
      let user = new User({
        email: "jason@mailinator.com",
        name: "Jason"
      });
      user.save((err, user) => {
        chai
          .request(server)
          .post("/api/user/")
          .send({
            email: "jason@mailinator.com",
            name: "Jason"
          })
          .end((err, res) => {
            res.should.have.status(409);
            res.body.should.be.a("object");
            res.body.should.have.property("email").eql("jason@mailinator.com");
            res.body.should.have
              .property("message")
              .eql("Email has already been used");
            res.body.should.have.property("status").eql(false);
            done();
          });
      });
    });

    it("it should ​jason @mailinator.com​ format is wrong", done => {
      let user = {
        email: "json @mailinator.com",
        name: "Jason"
      };
      chai
        .request(server)
        .post("/api/user/")
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("email").eql("json @mailinator.com");
          res.body.should.have.property("message").eql("is invalid");
          res.body.should.have.property("status").eql(false);
          done();
        });
    });
  });
  /*
   * Test the /GET/:id route
   */
  describe("/GET/:id user", () => {
    it("it should GET a user by the given id", done => {
      let user = new User({
        email: "jason@mailinator.com",
        name: "Jason"
      });
      user.save((err, user) => {
        chai
          .request(server)
          .get("/api/user/" + user._id)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("statusCode");
            res.body.should.have.property("result");
            res.body.result.should.have
              .property("_id")
              .eql(user._id.toString());
            done();
          });
      });
    });
  });
  /*
   * Test the /PUT/:id route
   */
  describe("/PUT/:id user", () => {
    it("it should UPDATE a user given the id", done => {
      let user = new User({
        email: "jason@mailinator.com",
        name: "Jason"
      });
      user.save((err, user) => {
        chai
          .request(server)
          .put("/api/user/" + user._id)
          .send({
            email: "ridho@mailinator.com",
            name: "ridho"
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("Update user successful");
            res.body.result.user.should.have
              .property("email")
              .eql("ridho@mailinator.com");
            res.body.result.user.should.have.property("name").eql("ridho");
            done();
          });
      });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe("/DELETE/:id user", () => {
    it("it should DELETE a user given the id", done => {
      let user = new User({
        email: "ridho@mailinator.com",
        name: "ridho"
      });
      user.save((err, user) => {
        chai
          .request(server)
          .delete("/api/user/" + user._id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("Delete user successful");
            res.body.should.have.property("statusText").eql("ok");
            done();
          });
      });
    });
  });
});
