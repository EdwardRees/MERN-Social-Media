import * as chai from "chai";
import app from "../src";
import * as mocha from "mocha";
import { expect } from "chai";
import request from "request";

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
