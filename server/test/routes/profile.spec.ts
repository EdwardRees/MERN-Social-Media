import chai, { expect } from "chai";
import { describe } from "mocha";
import request from "request";

chai.use(require("chai-http"));
chai.should();

let PORT = process.env.PORT || 8080;

describe("Profiles", () => {
  describe("GET /api/profile", () => {
    it("Should get all Profiles", (done: any) => {
      request.get(
        `http://localhost:${PORT}/api/profile/`,
        (err: any, res: any, body: any) => {
          expect(res.statusCode).equal(200);
          done();
        }
      );
    });
  });
});
