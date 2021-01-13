import axios from "axios";
import chai, { expect } from "chai";
import { describe } from "mocha";

chai.use(require("chai-http"));
chai.use(require("chai-as-promised"));
chai.should();

let PORT = process.env.PORT || 8080;

describe("Users", () => {
  describe("POST /api/users", () => {
    it("Should create a new user", (done: any) => {
      let call: any = axios.post(`http://localhost:${PORT}/api/users`, {
        name: "Edward Rees",
        email: "erees.hk@edwardrees.info",
        password: "1234567890",
      });
      call.should.be.fulfilled
        .then((token: any) => expect(token.status).equals(200))
        .should.notify(done);
    });
    it(`Should fail and say "User already exists"`, (done: any) => {
      let call: any = axios.post(`http://localhost:${PORT}/api/users`, {
        name: "Edward Rees",
        email: "erees.hk@edwardrees.info",
        password: "1234567890",
      });
      call.should.be.rejected
        .then((val: any) =>
          expect(val.response.data.errors[0].msg).equals("User already exists")
        )
        .should.notify(done);
    });
  });
});
