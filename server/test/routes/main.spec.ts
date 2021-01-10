import chai, { expect } from "chai";
import { describe } from "mocha";
import request from "request";

chai.use(require("chai-http"));
chai.should();
let PORT = process.env.PORT || 8080;

describe("Main Api", () => {
  describe("GET /api/", () => {
    it("Should get starting page", (done: any) => {
      request.get(
        `http://localhost:${PORT}/api/`,
        (err: any, res: any, body: any) => {
          expect(res.statusCode).equal(200);
          done();
        }
      );
    });
  });
});
