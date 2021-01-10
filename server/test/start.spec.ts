import chai from "chai";
import { describe } from "mocha";
import app from "../src";

chai.use(require("chai-http"));
chai.should();

describe("Server Start", () => {
  describe("server response", () => {
    before(function () {
      app.listen(8080);
    });

    after(function () {
      app.close();
    });
  });
});
