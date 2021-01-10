import * as chai from "chai";
import app from "../src";
import * as mocha from "mocha";
import { expect } from "chai";
import request from "request";

chai.use(require("chai-http"));
chai.should();

describe("Profiles", () => {
  describe("GET /api/profile", () => {
    it("Should get all Profiles", (done: any) => {
      request.get(
        "http://localhost:8080/api/profile/",
        (err: any, res: any, body: any) => {
          expect(res.statusCode).equal(200);
          done();
        }
      );
    });
  });
});

