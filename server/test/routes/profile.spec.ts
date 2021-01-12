import axios from "axios";
import chai, { expect } from "chai";
import { describe } from "mocha";

chai.use(require("chai-http"));
chai.use(require("chai-as-promised"));
chai.should();

let PORT = process.env.PORT || 8080;
let res: any;
let user_id: any;
describe("Profile", () => {
  describe("Profile Before Profile Creation", () => {
    before(async () => {
      res = await axios.post(`http://localhost:${PORT}/api/auth`, {
        email: "erees.hk@gmail.com",
        password: "1234567890",
      });
    });

    describe("GET /api/profile", () => {
      it("Should get all Profiles", (done: any) => {
        axios
          .get(`http://localhost:${PORT}/api/profile`)
          .then((data: any) => expect(data.statusCode).equal(200))
          .finally(() => done());
      });
    });

    describe("POST /api/profile", () => {
      it(`Should say "Status is required"`, function (done: any) {
        let data = {
          skills: "HTML, CSS, JavaScript, TypeScript, Java, Python, C, C++",
          location: "Hong Kong, Hong Kong SAR",
          bio: "I am a developer and educator at Byte Education",
          githubusername: "EdwardRees",
          linkedin: "Edward-R-0601",
        };
        let call: any = axios.post(
          `http://localhost:${PORT}/api/profile`,
          data,
          {
            headers: {
              "x-auth-token": res.data.token,
            },
          }
        );
        call.should.be.rejected
          .then((err: any) => {
            err.response.data.errors.should.lengthOf(1);
            err.response.data.errors[0].should.have.property(
              "msg",
              "Status is required"
            );
          })
          .should.notify(done);
      });
      it(`Should say "Skills is required"`, function (done: any) {
        let data = {
          status: "Junior Developer",
          location: "Hong Kong, Hong Kong SAR",
          bio: "I am a developer and educator at Byte Education",
          githubusername: "EdwardRees",
          linkedin: "Edward-R-0601",
        };
        let call: any = axios.post(
          `http://localhost:${PORT}/api/profile`,
          data,
          {
            headers: {
              "x-auth-token": res.data.token,
            },
          }
        );
        call.should.be.rejected
          .then((err: any) => {
            err.response.data.errors.should.lengthOf(1);
            err.response.data.errors[0].should.have.property(
              "msg",
              "Skills is required"
            );
          })
          .should.notify(done);
      });
      it(`Should create / update profile without problems`, function (done: any) {
        let data = {
          skills: "HTML, CSS, JavaScript, TypeScript, Java, Python, C, C++",
          status: "Junior Developer",
          location: "Hong Kong, Hong Kong SAR",
          bio: "I am a developer and educator at Byte Education",
          githubusername: "EdwardRees",
          linkedin: "Edward-R-0601",
        };
        let call: any = axios.post(
          `http://localhost:${PORT}/api/profile`,
          data,
          {
            headers: {
              "x-auth-token": res.data.token,
            },
          }
        );
        call.should.be.fulfilled
          .then((result: any) => {
            expect(result.status).equals(200);
          })
          .should.notify(done);
      });
    });
  });
  describe("Profile with Existing Profile", () => {
    before(async () => {
      let user: any = await axios.get(
        `http://localhost:${PORT}/api/profile/me`,
        {
          headers: { "X-auth-token": res.data.token },
        }
      );
      user_id = user.data.user._id;
    });
    describe("Valid GET /api/profiles/me", () => {
      it("Should get the user's data", (done: any) => {
        let call: any = axios.get(`http://localhost:${PORT}/api/profile/me`, {
          headers: { "X-auth-token": res.data.token },
        });
        call.should.be.fulfilled
          .then((data: any) => expect(data.data).to.not.be.null)
          .should.notify(done);
      });
    });

    describe("Invalid GET /api/profiles/me", () => {
      it("Should say invalid token for this user", (done: any) => {
        let call: any = axios.get(`http://localhost:${PORT}/api/profile/me`, {
          headers: { "x-auth-token": `${res.data.token}a` },
        });
        call.should.be.rejected
          .then((err: any) => {
            expect(err.response.status).equal(401);
            expect(err.response.data.msg).equal("Invalid token");
          })
          .should.notify(done);
      });
      it("Should say no Authorization token", (done: any) => {
        let call: any = axios.get(`http://localhost:${PORT}/api/profile/me`);
        call.should.be.rejected
          .then((err: any) => {
            expect(err.response.status).equal(401);
            expect(err.response.data.msg).equal(
              "No token, authorization denied"
            );
          })
          .should.notify(done);
      });
    });

    describe("PUT /api/profile/experience", () => {
      it(`Should say "Title is required"`, (done: any) => {
        let data: any = {
          company: "Byte Education",
          location: "Hong Kong",
          from: "June 1 2020",
          to: "",
          current: true,
          description:
            "Founded company, developed lessons for students of all ages",
        };
        let call: any = axios.put(
          `http://localhost:${PORT}/api/profile/experience`,
          data,
          { headers: { "x-auth-token": res.data.token } }
        );
        call.should.be.rejected
          .then((rej: any) => {
            expect(rej.response.status).equal(400);
            expect(rej.response.data.errors[0].msg).equal("Title is required");
          })
          .should.notify(done);
      });
      it(`Should say "Company is required"`, (done: any) => {
        let data: any = {
          title: "Developer and Educator",
          location: "Hong Kong",
          from: "June 1 2020",
          to: "",
          current: true,
          description:
            "Founded company, developed lessons for students of all ages",
        };
        let call: any = axios.put(
          `http://localhost:${PORT}/api/profile/experience`,
          data,
          { headers: { "x-auth-token": res.data.token } }
        );
        call.should.be.rejected
          .then((rej: any) => {
            expect(rej.response.status).equal(400);
            expect(rej.response.data.errors[0].msg).equal(
              "Company is required"
            );
          })
          .should.notify(done);
      });
      it(`Should say "From is required"`, (done: any) => {
        let data: any = {
          title: "Developer and Educator",
          company: "Byte Education",
          location: "Hong Kong",
          to: "",
          current: true,
          description:
            "Founded company, developed lessons for students of all ages",
        };
        let call: any = axios.put(
          `http://localhost:${PORT}/api/profile/experience`,
          data,
          { headers: { "x-auth-token": res.data.token } }
        );
        call.should.be.rejected
          .then((rej: any) => {
            expect(rej.response.status).equal(400);
            expect(rej.response.data.errors[0].msg).equal(
              "From date is required"
            );
          })
          .should.notify(done);
      });
      it(`Should create experience listing without problems`, (done: any) => {
        let data: any = {
          title: "Developer and Educator",
          company: "Byte Education",
          location: "Hong Kong",
          from: "Jun 1 2020",
          to: "",
          current: true,
          description:
            "Founded company, developed lessons for students of all ages",
        };
        let call: any = axios.put(
          `http://localhost:${PORT}/api/profile/experience`,
          data,
          { headers: { "x-auth-token": res.data.token } }
        );
        call.should.be.fulfilled
          .then((response: any) => {
            expect(response.status).equal(200);
          })
          .should.notify(done);
      });
    });

    describe("PUT /api/profile/education", () => {
      it(`Should say "School is required"`, (done: any) => {
        let data: any = {
          degree: "Bachelor of Science",
          fieldofstudy: "Computer Science",
          location: "San Francisco, CA",
          from: "Aug 18 2018",
          to: "",
          current: true,
          description: "Major in Computer Science, Minor in Psychology",
        };
        let call: any = axios.put(
          `http://localhost:${PORT}/api/profile/education`,
          data,
          { headers: { "x-auth-token": res.data.token } }
        );
        call.should.be.rejected
          .then((rej: any) => {
            expect(rej.response.status).equal(400);
            expect(rej.response.data.errors[0].msg).equal("School is required");
          })
          .should.notify(done);
      });
      it(`Should say "Degree is required"`, (done: any) => {
        let data: any = {
          school: "University of San Francisco",
          fieldofstudy: "Computer Science",
          location: "San Francisco, CA",
          from: "Aug 18 2018",
          to: "",
          current: true,
          description: "Major in Computer Science, Minor in Psychology",
        };
        let call: any = axios.put(
          `http://localhost:${PORT}/api/profile/education`,
          data,
          { headers: { "x-auth-token": res.data.token } }
        );
        call.should.be.rejected
          .then((rej: any) => {
            expect(rej.response.status).equal(400);
            expect(rej.response.data.errors[0].msg).equal("Degree is required");
          })
          .should.notify(done);
      });
      it(`Should say "Field of Study is required"`, (done: any) => {
        let data: any = {
          school: "University of San Francisco",
          degree: "Bachelor of Science",
          location: "San Francisco, CA",
          from: "Aug 18 2018",
          to: "",
          current: true,
          description: "Major in Computer Science, Minor in Psychology",
        };
        let call: any = axios.put(
          `http://localhost:${PORT}/api/profile/education`,
          data,
          { headers: { "x-auth-token": res.data.token } }
        );
        call.should.be.rejected
          .then((rej: any) => {
            expect(rej.response.status).equal(400);
            expect(rej.response.data.errors[0].msg).equal(
              "Field of Study is required"
            );
          })
          .should.notify(done);
      });
      it(`Should say "From is required"`, (done: any) => {
        let data: any = {
          school: "University of San Francisco",
          degree: "Bachelor of Science",
          fieldofstudy: "Computer Science",
          location: "San Francisco, CA",
          to: "",
          current: true,
          description: "Major in Computer Science, Minor in Psychology",
        };
        let call: any = axios.put(
          `http://localhost:${PORT}/api/profile/education`,
          data,
          { headers: { "x-auth-token": res.data.token } }
        );
        call.should.be.rejected
          .then((rej: any) => {
            expect(rej.response.status).equal(400);
            expect(rej.response.data.errors[0].msg).equal(
              "From date is required"
            );
          })
          .should.notify(done);
      });
      it(`Should create education listing without problems`, (done: any) => {
        let data: any = {
          school: "University of San Francisco",
          degree: "Bachelor of Science",
          fieldofstudy: "Computer Science",
          location: "San Francisco, CA",
          from: "Aug 18 2018",
          to: "",
          current: true,
          description: "Major in Computer Science, Minor in Psychology",
        };
        let call: any = axios.put(
          `http://localhost:${PORT}/api/profile/education`,
          data,
          { headers: { "x-auth-token": res.data.token } }
        );

        call.should.be.fulfilled
          .then((response: any) => {
            expect(response.status).equal(200);
          })
          .should.notify(done);
      });
    });

    describe("GET /api/profiles/user/:user_id", () => {
      it("Should get the user's data based on the id", (done: any) => {
        let call: any = axios.get(
          `http://localhost:${PORT}/api/profile/user/${user_id}`
        );
        call.should.be.fulfilled
          .then((result: any) => {
            expect(result.status).equals(200);
          })
          .should.notify(done);
      });
    });

    describe("DELETE /api/profile/", () => {
      it("Should delete the current account", (done: any) => {
        let call: any = axios.delete(`http://localhost:${PORT}/api/profile`, {
          headers: { "x-auth-token": res.data.token },
        });
        call.should.be.fulfilled
          .then((result: any) => {
            expect(result.status).equal(200);
          })
          .should.notify(done);
      });
    });
  });

  describe.skip("GitHub Profiles", () => {
    describe("GET /api/profile/github/edwardrees", () => {
      it("Should get github profile", (done: any) => {
        axios
          .get(`http://localhost:${PORT}/api/profile/github/edwardrees`)
          .then((data: any) => {
            expect(data.statusCode).equal(200);
          })
          .finally(() => done());
      });
    });
  });
});
