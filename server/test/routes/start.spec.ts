import chai from "chai";
import { describe } from "mocha";
import app from "../../src";

chai.use(require("chai-http"));
chai.should();

let PORT = process.env.PORT || 8080;

describe("Server Start", () => {
  describe("server response", () => {
    before(() => {
      app.listen(PORT);
    });

    after(() => {
      app.close();
    });
  });
});
