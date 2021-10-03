const server = require("../server/server");
let chai = require("chai");
let chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
describe("API REST /api/event/:id/", () => {
  //get all/////////////////////////////////////
    it("is GET all students ", (done) => {
      // const id = "6131cf7231323fbda852fc2f";
      chai
        .request(server)
        .get("/api/event")
        .set(
                   "Authorization",
                   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2UiOjIzLCJqb2QiOiLXqtek16fXmdeTIiwicmVzcG9uc2libGUiOiLXkNeX16jXkNeZ16oiLCJtZXNzYWdlcyI6WyI2MTUxYzMwZTc1NjBmMjc4ODhjZTQ5MzYiLCI2MTUxZDVmN2E3MzQ2MzRlOGM4MDZjYzQiXSwiX2lkIjoiNjEzZjk0YTBiYzQ0Njc1NDhjNzIxMzRlIiwicm9sZSI6IlN0YWZmIiwicHJvZmlsZUltZyI6ImltYWdlc1xcMTYzMjkxMjE0ODE0OF9naXJsYXZhdGFyLmpwZyIsIklkTnVtYmVyIjoiIiwiY291cnNlcyI6W10sImV2ZW50cyI6WyI2MTUzMzBhMTliOWMxMTM5ZTg4MzVmYzgiXSwic3R1ZGVudHMiOltdLCJmaXJzdE5hbWUiOiJub3lhIiwibGFzdE5hbWUiOiLXp9eV16fXlCIsImVtYWlsIjoidGFsaWdlcmdyZUBnbWFpbC5jb20iLCJwaG9uZSI6IjA1NDYyNjU1NzUiLCJwYXNzd29yZCI6IiQyYiQxMiQycndtUHUuYlBHL3V5dEEuMWxWRXouVlRGTXNhd1JzekU3WjVUSW11WFkwaFJ5VGU1OVRxaSIsImNyZWF0ZWRBdCI6IjIwMjEtMDktMTNUMTg6MTI6NDguNTIyWiIsInVwZGF0ZWRBdCI6IjIwMjEtMDktMjlUMTA6NDI6MjguMjcxWiIsIl9fdiI6MywiaWF0IjoxNjMyOTk1NDk5LCJleHAiOjE2MzMwODE4OTl9.BBNkEeA6iUIl-T-ulvLD7R0DWB2tIeAu7IFjCPVOo6E"
                 )
        .end((err, res) => {
          const data = res.body.data;
          console.log(data);
            res.should.have.status(200);
            data.should.be.a("array");
            data.map((event)=>{event.should.have.property("eventName")})
            data.map((event)=>{event.should.have.property("massage")})
          done();
        });
    });

  ///////////////////////get by id////////////////////////////
  it("is GET by id of event ", (done) => {
    const id = "6155924a197cdd1e785736f3";
    chai.request(server)
      .get("/api/event/getEventById/" + id)
      .set(
                 "Authorization",
                 "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2UiOjIzLCJqb2QiOiLXqtek16fXmdeTIiwicmVzcG9uc2libGUiOiLXkNeX16jXkNeZ16oiLCJtZXNzYWdlcyI6WyI2MTUxYzMwZTc1NjBmMjc4ODhjZTQ5MzYiLCI2MTUxZDVmN2E3MzQ2MzRlOGM4MDZjYzQiXSwiX2lkIjoiNjEzZjk0YTBiYzQ0Njc1NDhjNzIxMzRlIiwicm9sZSI6IlN0YWZmIiwicHJvZmlsZUltZyI6ImltYWdlc1xcMTYzMjkxMjE0ODE0OF9naXJsYXZhdGFyLmpwZyIsIklkTnVtYmVyIjoiIiwiY291cnNlcyI6W10sImV2ZW50cyI6WyI2MTUzMzBhMTliOWMxMTM5ZTg4MzVmYzgiXSwic3R1ZGVudHMiOltdLCJmaXJzdE5hbWUiOiJub3lhIiwibGFzdE5hbWUiOiLXp9eV16fXlCIsImVtYWlsIjoidGFsaWdlcmdyZUBnbWFpbC5jb20iLCJwaG9uZSI6IjA1NDYyNjU1NzUiLCJwYXNzd29yZCI6IiQyYiQxMiQycndtUHUuYlBHL3V5dEEuMWxWRXouVlRGTXNhd1JzekU3WjVUSW11WFkwaFJ5VGU1OVRxaSIsImNyZWF0ZWRBdCI6IjIwMjEtMDktMTNUMTg6MTI6NDguNTIyWiIsInVwZGF0ZWRBdCI6IjIwMjEtMDktMjlUMTA6NDI6MjguMjcxWiIsIl9fdiI6MywiaWF0IjoxNjMyOTk1NDk5LCJleHAiOjE2MzMwODE4OTl9.BBNkEeA6iUIl-T-ulvLD7R0DWB2tIeAu7IFjCPVOo6E"
               )
      .end((err, res) => {
        const data = res.body.data;
        console.log(data);
        res.should.have.status(200);
        data.should.be.a("object");
        data.should.have.property("_id");
        data.should.have.property("eventName");
        data.should.have.property("message");

        done();
      });
  });
  ////////////////////delete by id ////////////////////
  it("is delete by id of event ", (done) => {
      const id = "6155924a197cdd1e785736f3";
      chai.request(server)
        .delete("/api/event/" + id)
        .set(
                   "Authorization",
                   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2UiOjIzLCJqb2QiOiLXqtek16fXmdeTIiwicmVzcG9uc2libGUiOiLXkNeX16jXkNeZ16oiLCJtZXNzYWdlcyI6WyI2MTUxYzMwZTc1NjBmMjc4ODhjZTQ5MzYiLCI2MTUxZDVmN2E3MzQ2MzRlOGM4MDZjYzQiXSwiX2lkIjoiNjEzZjk0YTBiYzQ0Njc1NDhjNzIxMzRlIiwicm9sZSI6IlN0YWZmIiwicHJvZmlsZUltZyI6ImltYWdlc1xcMTYzMjkxMjE0ODE0OF9naXJsYXZhdGFyLmpwZyIsIklkTnVtYmVyIjoiIiwiY291cnNlcyI6W10sImV2ZW50cyI6WyI2MTUzMzBhMTliOWMxMTM5ZTg4MzVmYzgiXSwic3R1ZGVudHMiOltdLCJmaXJzdE5hbWUiOiJub3lhIiwibGFzdE5hbWUiOiLXp9eV16fXlCIsImVtYWlsIjoidGFsaWdlcmdyZUBnbWFpbC5jb20iLCJwaG9uZSI6IjA1NDYyNjU1NzUiLCJwYXNzd29yZCI6IiQyYiQxMiQycndtUHUuYlBHL3V5dEEuMWxWRXouVlRGTXNhd1JzekU3WjVUSW11WFkwaFJ5VGU1OVRxaSIsImNyZWF0ZWRBdCI6IjIwMjEtMDktMTNUMTg6MTI6NDguNTIyWiIsInVwZGF0ZWRBdCI6IjIwMjEtMDktMjlUMTA6NDI6MjguMjcxWiIsIl9fdiI6MywiaWF0IjoxNjMyOTk1NDk5LCJleHAiOjE2MzMwODE4OTl9.BBNkEeA6iUIl-T-ulvLD7R0DWB2tIeAu7IFjCPVOo6E"
                 )
        .end((err, res) => {
          const data = res.body;
          console.log(data);
          // res.should.have.status(200);
          // data.should.be.a("object");

          done();
        });
    });

    it("is delete by id of event ", (done) => {
      const TEST = {
          eventName: "html",
          message: "event",
      };
      const id = "615591f68117da0bfc6d9137";
      chai
        .request(server)
        .put("/api/event/" + id)
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2UiOjIzLCJqb2QiOiLXqtek16fXmdeTIiwicmVzcG9uc2libGUiOiLXkNeX16jXkNeZ16oiLCJtZXNzYWdlcyI6WyI2MTUxYzMwZTc1NjBmMjc4ODhjZTQ5MzYiLCI2MTUxZDVmN2E3MzQ2MzRlOGM4MDZjYzQiXSwiX2lkIjoiNjEzZjk0YTBiYzQ0Njc1NDhjNzIxMzRlIiwicm9sZSI6IlN0YWZmIiwicHJvZmlsZUltZyI6ImltYWdlc1xcMTYzMjkxMjE0ODE0OF9naXJsYXZhdGFyLmpwZyIsIklkTnVtYmVyIjoiIiwiY291cnNlcyI6W10sImV2ZW50cyI6WyI2MTUzMzBhMTliOWMxMTM5ZTg4MzVmYzgiXSwic3R1ZGVudHMiOltdLCJmaXJzdE5hbWUiOiJub3lhIiwibGFzdE5hbWUiOiLXp9eV16fXlCIsImVtYWlsIjoidGFsaWdlcmdyZUBnbWFpbC5jb20iLCJwaG9uZSI6IjA1NDYyNjU1NzUiLCJwYXNzd29yZCI6IiQyYiQxMiQycndtUHUuYlBHL3V5dEEuMWxWRXouVlRGTXNhd1JzekU3WjVUSW11WFkwaFJ5VGU1OVRxaSIsImNyZWF0ZWRBdCI6IjIwMjEtMDktMTNUMTg6MTI6NDguNTIyWiIsInVwZGF0ZWRBdCI6IjIwMjEtMDktMjlUMTA6NDI6MjguMjcxWiIsIl9fdiI6MywiaWF0IjoxNjMyOTk1NDk5LCJleHAiOjE2MzMwODE4OTl9.BBNkEeA6iUIl-T-ulvLD7R0DWB2tIeAu7IFjCPVOo6E"
        )
        .send(TEST)
        .end((err, res) => {
          const data = res.body;
          console.log(data);
          res.should.have.status(200);
          data.should.be.a("object");

          done();
        });
    });

 // post event////////////////////////////////////////

  it(" post new event", (done) => {
    const newMessage = {
      eventName: "sokot b",
      message: "trying test",
    };
    const id = "613f94a0bc4467548c72134e";
    chai
      .request(server)
      .post("/api/event/" + id)
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2UiOjIzLCJqb2QiOiLXnteg15TXnNeqINen15XXqNehINeeIiwicmVzcG9uc2libGUiOiLXnteg15TXnNeqINen15XXqNehIiwibWVzc2FnZXMiOlsiNjE1MWMzMGU3NTYwZjI3ODg4Y2U0OTM2IiwiNjE1MWQ1ZjdhNzM0NjM0ZThjobA2Y2M0Il0sIl9pZCI6IjYxM2Y5NGEwYmM0NDY3NTQ4YzcyMTM0ZSIsInJvbGUiOiJTdGFmZiIsInByb2ZpbGVJbWciOiJpbWFnZXNcXDE2MzMyMDAyMzEyOTFfYm95YXZhdGFyLnBuZyIsIklkTnVtYmVyIjoiIiwiY291cnNlcyI6W10sImV2ZW50cyI6WyI2MTUzMzBhMTliOWMxMTM5ZTg4MzVmYzgiXSwic3R1ZGVudHMiOltdLCJmaXJzdE5hbWUiOiJub3kiLCJsYXN0TmFtZSI6Iten15XXp9eUIiwiZW1haWwiOiJ0YWxpZ2VyZ3JlQGdtYWlsLmNvbSIsInBob25lIjoiMDU0NjI2NTU3NSIsInBhc3N3b3JkIjoiJDJiJDEyJDJyd21QdS5iUEcvdXl0QS4xbFZFei5WVEZNc2F3UnN6RTdaNVRJbXVYWTBoUnlUZTU5VHFpIiwiY3JlYXRlZEF0IjoiMjAyMS0wOS0xM1QxODoxMjo0OC41MjJaIiwidXBkYXRlZEF0IjoiMjAyMS0xMC0wMlQxODo0Mzo1MS40NTNaIiwiX192IjozLCJpYXQiOjE2MzMyMTAwMDMsImV4cCI6MTYzMzI5NjQwM30.XRA4IXqL1BHslEvnMxzDC7hc3nl8bYE-EEzFRVKnaAI"
      )
      .send(newMessage)
      .end((err, res) => {
        const data = res.body.data;
        console.log(data);
        res.should.have.status(201);
        data.should.be.a("object");
        data.should.have.property("eventName").equal("sokot b");
        data.should.have.property("message").equal("trying test");
        done();
      });
  });

    it("it should NOT POST new event without a require field for example description" ,(done)=> {
      const newEvent = {
          id: "6131cf7231323fbda852fc2f",
          subject: "new homework",
          link: "",
          role:"Staff",
        };
   chai.request(server)
        .post("/api/event/")
        .send(newEvent)
        .end((err, res) => {
            res.should.have.status(400);
            res.text.should.be.eq('{"message":"create new homework filed","error":"homework validation failed: description: Path `description` is required."}')
            done();
        })
    })

    it("is NOT GET by id of event ", (done) => {
      const id = "";
      chai.request(server)
        .get("/api/event/" + id)
        .end((err, res) => {
          const data = res.body.data;
          res.should.have.status(404);
          res.text.should.be.eq(
            "<!DOCTYPE html>\n" +
              '<html lang="en">\n' +
              "<head>\n" +
              '<meta charset="utf-8">\n' +
              "<title>Error</title>\n" +
              "</head>\n" +
              "<body>\n" +
              "<pre>Cannot GET /api/event/</pre>\n" +
              "</body>\n" +
              "</html>\n"
          );
          done();
        });
    });
});
