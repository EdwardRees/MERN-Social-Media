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
  describe("GET /api/profile/github/edwardrees", () => {
    it("Should get github profile", (done: any) => {
      request.get(`http://localhost:${PORT}/api/profile/github/edwardrees`, (err: any, res: any, body: any) => {
        expect(res.statusCode).equal(200);
        done();
      });
    });
  });
});
