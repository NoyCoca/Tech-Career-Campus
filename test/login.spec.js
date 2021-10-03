const server = require("../server/server");
const login = require("../server/controller/authorization/login");
let chai = require("chai");
let chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
describe("API REST /api/login/", () => {
  ///////////////////post work//////////
  it("is post login ", () => {
    chai
      .request(server)
      .post("/api/login")
      .send({
        email: "taligergre@gmail.com",
        password: "12345678",
        role: "Staff",
      })
      .end((err, res) => {
        console.log("this was run the login part");
        res.should.have.status(200);
        expect(res.body.state).to.be.true;
        res.body.should.have.property("token");
        let token = res.body.token;
        console.log(token);
      });
  });
});
