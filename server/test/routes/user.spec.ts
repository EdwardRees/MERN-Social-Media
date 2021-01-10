import chai, { expect } from "chai";
import { describe } from "mocha";
import request from "request";

chai.use(require("chai-http"));
chai.should();

let PORT = process.env.PORT || 8080;

describe("Users", () => {
  describe("GET /api/users", () => {
    it("Should be blank", (done: any) => {
      request.get(
        `http://localhost:${PORT}/api/users/`,
        (err: any, res: any, body: any) => {
          expect(res.statusCode).equal(404);
          done();
        }
      );
    });
  });
});
