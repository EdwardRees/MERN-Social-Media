import chai, { expect } from "chai";
import { describe } from "mocha";
import axios from "axios";
import { doesNotMatch } from "assert";

chai.use(require("chai-http"));
chai.should();

let PORT = process.env.PORT || 8080;
let res: any;
describe("Auth", () => {
  before(async () => {
    res = await axios.post(`http://localhost:${PORT}/api/auth`, {
      email: "erees.hk@gmail.com",
      password: "1234567890",
    });
  });
  describe("POST /api/auth", () => {
    it("should have a valid credential", (done: any) => {
      expect(res.data.token).to.not.be.null;
      done();
    });
  });
});
