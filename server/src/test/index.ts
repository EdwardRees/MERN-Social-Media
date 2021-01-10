import * as chai from "chai";
import "chai-http";
import app from "../";

chai.should();

describe("Users", () => {
  describe("GET /api/users", () => {
    it("should get all users", (done) => {
      chai
        .request(app)
        .get("/api/users/")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });``
  });
});

export {}