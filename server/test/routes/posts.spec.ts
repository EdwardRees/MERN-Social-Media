import chai, { expect } from "chai";
import { describe } from "mocha";
import request from "request";
import axios from "axios";

chai.use(require("chai-http"));
chai.use(require("chai-as-promised"));
chai.should();

let PORT = process.env.PORT || 8080;

let token: any;
