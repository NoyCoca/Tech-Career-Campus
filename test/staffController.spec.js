const server = require("../server/server");
let chai = require("chai");
let chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);

describe("API REST /api/homework", () => {
    it("GET all staff", (done) => {
        chai
          .request(server)
          .get("/api/staff/")
          .set(
            "Authorization",
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2UiOjIzLCJqb2QiOiLXqtek16fXmdeTIiwicmVzcG9uc2libGUiOiLXkNeX16jXkNeZ16oiLCJtZXNzYWdlcyI6WyI2MTUxYzMwZTc1NjBmMjc4ODhjZTQ5MzYiLCI2MTUxZDVmN2E3MzQ2MzRlOGM4MDZjYzQiXSwiX2lkIjoiNjEzZjk0YTBiYzQ0Njc1NDhjNzIxMzRlIiwicm9sZSI6IlN0YWZmIiwicHJvZmlsZUltZyI6ImltYWdlc1xcMTYzMjc2NTgwMzE5NF9naXJsYXZhdGFyLmpwZyIsIklkTnVtYmVyIjoiIiwiY291cnNlcyI6W10sImV2ZW50cyI6WyI2MTUzMzBhMTliOWMxMTM5ZTg4MzVmYzgiXSwic3R1ZGVudHMiOltdLCJmaXJzdE5hbWUiOiLXoNeV15kiLCJsYXN0TmFtZSI6Iten15XXp9eUIiwiZW1haWwiOiJ0YWxpZ2VyZ3JlQGdtYWlsLmNvbSIsInBob25lIjoiMDU0NjI2NTU3NSIsInBhc3N3b3JkIjoiJDJiJDEyJDJyd21QdS5iUEcvdXl0QS4xbFZFei5WVEZNc2F3UnN6RTdaNVRJbXVYWTBoUnlUZTU5VHFpIiwiY3JlYXRlZEF0IjoiMjAyMS0wOS0xM1QxODoxMjo0OC41MjJaIiwidXBkYXRlZEF0IjoiMjAyMS0wOS0yOFQxNToxMToyOS4yOTBaIiwiX192IjozLCJpYXQiOjE2MzI4OTM1ODksImV4cCI6MTYzMjk3OTk4OX0.ixi6avlyazE3lpVNovuXTtztg4nKaVyZG0PTgE5gHV4"
          )
          .end((err, res) => {
            const data = res.body.data;
            console.log(data);
            res.should.have.status(200);
            data.should.be.a("array");
            data[0].should.have.property("_id");
            data[0].should.have.property("firstName");
            data[0].should.have.property("lastName");
            data[0].should.have.property("email");
            data[0].should.have.property("role");
            done();
          });
      });

      it("GET Staff by id", (done) => {
        const id = "613f94a0bc4467548c72134e";
        chai
          .request(server)
          .get("/api/staff/getStaffById/" + id)
          .set(
            "Authorization",
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2UiOjIzLCJqb2QiOiLXqtek16fXmdeTIiwicmVzcG9uc2libGUiOiLXkNeX16jXkNeZ16oiLCJtZXNzYWdlcyI6WyI2MTUxYzMwZTc1NjBmMjc4ODhjZTQ5MzYiLCI2MTUxZDVmN2E3MzQ2MzRlOGM4MDZjYzQiXSwiX2lkIjoiNjEzZjk0YTBiYzQ0Njc1NDhjNzIxMzRlIiwicm9sZSI6IlN0YWZmIiwicHJvZmlsZUltZyI6ImltYWdlc1xcMTYzMjc2NTgwMzE5NF9naXJsYXZhdGFyLmpwZyIsIklkTnVtYmVyIjoiIiwiY291cnNlcyI6W10sImV2ZW50cyI6WyI2MTUzMzBhMTliOWMxMTM5ZTg4MzVmYzgiXSwic3R1ZGVudHMiOltdLCJmaXJzdE5hbWUiOiLXoNeV15kiLCJsYXN0TmFtZSI6Iten15XXp9eUIiwiZW1haWwiOiJ0YWxpZ2VyZ3JlQGdtYWlsLmNvbSIsInBob25lIjoiMDU0NjI2NTU3NSIsInBhc3N3b3JkIjoiJDJiJDEyJDJyd21QdS5iUEcvdXl0QS4xbFZFei5WVEZNc2F3UnN6RTdaNVRJbXVYWTBoUnlUZTU5VHFpIiwiY3JlYXRlZEF0IjoiMjAyMS0wOS0xM1QxODoxMjo0OC41MjJaIiwidXBkYXRlZEF0IjoiMjAyMS0wOS0yOFQxNToxMToyOS4yOTBaIiwiX192IjozLCJpYXQiOjE2MzI4OTM1ODksImV4cCI6MTYzMjk3OTk4OX0.ixi6avlyazE3lpVNovuXTtztg4nKaVyZG0PTgE5gHV4"
          )
          .end((err, res) => {
            const data = res.body.data;
            console.log(res.body);
            res.should.have.status(200);
            data.should.be.a("object");
            data.should.have.property("_id");
            data.should.have.property("firstName");
            data.should.have.property("lastName");
            data.should.have.property("email");
            data.should.have.property("role");
            done();
          });
      });



    it("is NOT GET any Staff", (done) => {
        const id = "";
        chai
            .request(server)
            .get("/api/staff/getStaffById/" + id)
            .set(
                "Authorization",
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2UiOjIzLCJqb2QiOiLXqtek16fXmdeTIiwicmVzcG9uc2libGUiOiLXkNeX16jXkNeZ16oiLCJtZXNzYWdlcyI6WyI2MTUxYzMwZTc1NjBmMjc4ODhjZTQ5MzYiLCI2MTUxZDVmN2E3MzQ2MzRlOGM4MDZjYzQiXSwiX2lkIjoiNjEzZjk0YTBiYzQ0Njc1NDhjNzIxMzRlIiwicm9sZSI6IlN0YWZmIiwicHJvZmlsZUltZyI6ImltYWdlc1xcMTYzMjc2NTgwMzE5NF9naXJsYXZhdGFyLmpwZyIsIklkTnVtYmVyIjoiIiwiY291cnNlcyI6W10sImV2ZW50cyI6WyI2MTUzMzBhMTliOWMxMTM5ZTg4MzVmYzgiXSwic3R1ZGVudHMiOltdLCJmaXJzdE5hbWUiOiLXoNeV15kiLCJsYXN0TmFtZSI6Iten15XXp9eUIiwiZW1haWwiOiJ0YWxpZ2VyZ3JlQGdtYWlsLmNvbSIsInBob25lIjoiMDU0NjI2NTU3NSIsInBhc3N3b3JkIjoiJDJiJDEyJDJyd21QdS5iUEcvdXl0QS4xbFZFei5WVEZNc2F3UnN6RTdaNVRJbXVYWTBoUnlUZTU5VHFpIiwiY3JlYXRlZEF0IjoiMjAyMS0wOS0xM1QxODoxMjo0OC41MjJaIiwidXBkYXRlZEF0IjoiMjAyMS0wOS0yOFQxNToxMToyOS4yOTBaIiwiX192IjozLCJpYXQiOjE2MzI4OTM1ODksImV4cCI6MTYzMjk3OTk4OX0.ixi6avlyazE3lpVNovuXTtztg4nKaVyZG0PTgE5gHV4"
            )
            .end((err, res) => {
                console.log(res.text)
                res.should.have.status(404);
                res.text.should.be.eq(
                    "<!DOCTYPE html>\n" +
                    '<html lang="en">\n' +
                    "<head>\n" +
                    '<meta charset="utf-8">\n' +
                    "<title>Error</title>\n" +
                    "</head>\n" +
                    "<body>\n" +
                    "<pre>Cannot GET /api/staff/getStaffById/</pre>\n" +
                    "</body>\n" +
                    "</html>\n"
                );
                done();
            });
    });

      it("PUT staff ", (done) => {
        const id = "613f94a0bc4467548c72134e";
        const staff = {
            firstName: "נוי",
          lastName: "קוקה",
          email: "taligergre@gmail.com",
          password:"12345678",
          phone:"0546265575",
          age: 27
        };
        chai
          .request(server)
          .put("/api/staff/" +id)
          .set(
            "Authorization",
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2UiOjIzLCJqb2QiOiLXqtek16fXmdeTIiwicmVzcG9uc2libGUiOiLXkNeX16jXkNeZ16oiLCJtZXNzYWdlcyI6WyI2MTUxYzMwZTc1NjBmMjc4ODhjZTQ5MzYiLCI2MTUxZDVmN2E3MzQ2MzRlOGM4MDZjYzQiXSwiX2lkIjoiNjEzZjk0YTBiYzQ0Njc1NDhjNzIxMzRlIiwicm9sZSI6IlN0YWZmIiwicHJvZmlsZUltZyI6ImltYWdlc1xcMTYzMjc2NTgwMzE5NF9naXJsYXZhdGFyLmpwZyIsIklkTnVtYmVyIjoiIiwiY291cnNlcyI6W10sImV2ZW50cyI6WyI2MTUzMzBhMTliOWMxMTM5ZTg4MzVmYzgiXSwic3R1ZGVudHMiOltdLCJmaXJzdE5hbWUiOiLXoNeV15kiLCJsYXN0TmFtZSI6Iten15XXp9eUIiwiZW1haWwiOiJ0YWxpZ2VyZ3JlQGdtYWlsLmNvbSIsInBob25lIjoiMDU0NjI2NTU3NSIsInBhc3N3b3JkIjoiJDJiJDEyJDJyd21QdS5iUEcvdXl0QS4xbFZFei5WVEZNc2F3UnN6RTdaNVRJbXVYWTBoUnlUZTU5VHFpIiwiY3JlYXRlZEF0IjoiMjAyMS0wOS0xM1QxODoxMjo0OC41MjJaIiwidXBkYXRlZEF0IjoiMjAyMS0wOS0yOFQxNToxMToyOS4yOTBaIiwiX192IjozLCJpYXQiOjE2MzI4OTM1ODksImV4cCI6MTYzMjk3OTk4OX0.ixi6avlyazE3lpVNovuXTtztg4nKaVyZG0PTgE5gHV4"
          )
          .send(staff)
          .end((err, res) => {
            const data = res.body.data;
            console.log(res.text)
            res.should.have.status(200);
            data.should.be.a('string');
            done();
          });
      });

    it("should NOT PUT to /api/homework/:id when the ID is empty string", (done) => {
        const id = "";
        const staff = {
            firstName: "נוי",
            lastName: "קוקה",
            email: "taligergre@gmail.com",
            password: "12345678",
            phone: "0546265575",
            age: 27
        };
        chai
            .request(server)
            .put("/api/staff/" + id)
            .set(
                "Authorization",
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2UiOjIzLCJqb2QiOiLXqtek16fXmdeTIiwicmVzcG9uc2libGUiOiLXkNeX16jXkNeZ16oiLCJtZXNzYWdlcyI6WyI2MTUxYzMwZTc1NjBmMjc4ODhjZTQ5MzYiLCI2MTUxZDVmN2E3MzQ2MzRlOGM4MDZjYzQiXSwiX2lkIjoiNjEzZjk0YTBiYzQ0Njc1NDhjNzIxMzRlIiwicm9sZSI6IlN0YWZmIiwicHJvZmlsZUltZyI6ImltYWdlc1xcMTYzMjc2NTgwMzE5NF9naXJsYXZhdGFyLmpwZyIsIklkTnVtYmVyIjoiIiwiY291cnNlcyI6W10sImV2ZW50cyI6WyI2MTUzMzBhMTliOWMxMTM5ZTg4MzVmYzgiXSwic3R1ZGVudHMiOltdLCJmaXJzdE5hbWUiOiLXoNeV15kiLCJsYXN0TmFtZSI6Iten15XXp9eUIiwiZW1haWwiOiJ0YWxpZ2VyZ3JlQGdtYWlsLmNvbSIsInBob25lIjoiMDU0NjI2NTU3NSIsInBhc3N3b3JkIjoiJDJiJDEyJDJyd21QdS5iUEcvdXl0QS4xbFZFei5WVEZNc2F3UnN6RTdaNVRJbXVYWTBoUnlUZTU5VHFpIiwiY3JlYXRlZEF0IjoiMjAyMS0wOS0xM1QxODoxMjo0OC41MjJaIiwidXBkYXRlZEF0IjoiMjAyMS0wOS0yOFQxNToxMToyOS4yOTBaIiwiX192IjozLCJpYXQiOjE2MzI4OTM1ODksImV4cCI6MTYzMjk3OTk4OX0.ixi6avlyazE3lpVNovuXTtztg4nKaVyZG0PTgE5gHV4"
            )
            .send(staff)
            .end((err, res) => {
                console.log(res.text)
                res.should.have.status(404);
                res.type.should.be.eq('text/html');
                done();
            });
    });

    ////works with params but dont with body
    it("DELETE staff /api/homework/:id", (done) => {
        const id = "613f94a0bc4467548c777777";
        chai
            .request(server)
            .delete("/api/staff/")
            .set(
                "Authorization",
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2UiOjIzLCJqb2QiOiLXqtek16fXmdeTIiwicmVzcG9uc2libGUiOiLXkNeX16jXkNeZ16oiLCJtZXNzYWdlcyI6WyI2MTUxYzMwZTc1NjBmMjc4ODhjZTQ5MzYiLCI2MTUxZDVmN2E3MzQ2MzRlOGM4MDZjYzQiXSwiX2lkIjoiNjEzZjk0YTBiYzQ0Njc1NDhjNzIxMzRlIiwicm9sZSI6IlN0YWZmIiwicHJvZmlsZUltZyI6ImltYWdlc1xcMTYzMjc2NTgwMzE5NF9naXJsYXZhdGFyLmpwZyIsIklkTnVtYmVyIjoiIiwiY291cnNlcyI6W10sImV2ZW50cyI6WyI2MTUzMzBhMTliOWMxMTM5ZTg4MzVmYzgiXSwic3R1ZGVudHMiOltdLCJmaXJzdE5hbWUiOiLXoNeV15kiLCJsYXN0TmFtZSI6Iten15XXp9eUIiwiZW1haWwiOiJ0YWxpZ2VyZ3JlQGdtYWlsLmNvbSIsInBob25lIjoiMDU0NjI2NTU3NSIsInBhc3N3b3JkIjoiJDJiJDEyJDJyd21QdS5iUEcvdXl0QS4xbFZFei5WVEZNc2F3UnN6RTdaNVRJbXVYWTBoUnlUZTU5VHFpIiwiY3JlYXRlZEF0IjoiMjAyMS0wOS0xM1QxODoxMjo0OC41MjJaIiwidXBkYXRlZEF0IjoiMjAyMS0wOS0yOFQxNToxMToyOS4yOTBaIiwiX192IjozLCJpYXQiOjE2MzI4OTM1ODksImV4cCI6MTYzMjk3OTk4OX0.ixi6avlyazE3lpVNovuXTtztg4nKaVyZG0PTgE5gHV4"
            )
            .send(id)
            .end((err, res) => {
                console.log(res.text);
                res.should.have.status(200);
                res.text.should.be.a.eq('{"success":true,"message":"delete by id staff success!"}');
                done();
            });
    });


      it("DELETE to /api/homework/:id failed because they did not give an ID certificate of the course in the body" , (done) => {
        const id = " ";
        chai
          .request(server)
          .delete("/api/homework/" + id)
          .set(
            "Authorization",
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2UiOjIzLCJqb2QiOiLXqtek16fXmdeTIiwicmVzcG9uc2libGUiOiLXkNeX16jXkNeZ16oiLCJtZXNzYWdlcyI6W10sIl9pZCI6IjYxM2Y5NGEwYmM0NDY3NTQ4YzcyMTM0ZSIsInJvbGUiOiJTdGFmZiIsInByb2ZpbGVJbWciOiIxNjMyNDEyMDIzMjMxX2dpcmxhdmF0YXIuanBnIiwiSWROdW1iZXIiOiIiLCJjb3Vyc2VzIjpbXSwiZXZlbnRzIjpbXSwic3R1ZGVudHMiOltdLCJmaXJzdE5hbWUiOiLXoNeV15nXlCIsImxhc3ROYW1lIjoi16fXlden15QiLCJlbWFpbCI6InRhbGlnZXJncmVAZ21haWwuY29tIiwicGhvbmUiOiIwNTQ2MjY1NTc1IiwicGFzc3dvcmQiOiIkMmIkMTIkMnJ3bVB1LmJQRy91eXRBLjFsVkV6LlZURk1zYXdSc3pFN1o1VEltdVhZMGhSeVRlNTlUcWkiLCJjcmVhdGVkQXQiOiIyMDIxLTA5LTEzVDE4OjEyOjQ4LjUyMloiLCJ1cGRhdGVkQXQiOiIyMDIxLTA5LTIzVDE1OjQ3OjAzLjI3NFoiLCJfX3YiOjAsImlhdCI6MTYzMjY5MTA4MSwiZXhwIjoxNjMyNzc3NDgxfQ.x1NqSBkSjl47hsrCzO1FT_KtOmwt7l7hyptP3muXsfE"
          )
          .end((err, res) => {
            console.log(res.text);
            res.should.have.status(404);
            done();
          });
      });

      it("DELETE to /api/homework/:id failed because they did not give an ID certificate of the course in the body" , (done) => {
        const id = "12345";
        chai
          .request(server)
          .delete("/api/homework/" + id)
          .set(
            "Authorization",
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2UiOjIzLCJqb2QiOiLXqtek16fXmdeTIiwicmVzcG9uc2libGUiOiLXkNeX16jXkNeZ16oiLCJtZXNzYWdlcyI6W10sIl9pZCI6IjYxM2Y5NGEwYmM0NDY3NTQ4YzcyMTM0ZSIsInJvbGUiOiJTdGFmZiIsInByb2ZpbGVJbWciOiIxNjMyNDEyMDIzMjMxX2dpcmxhdmF0YXIuanBnIiwiSWROdW1iZXIiOiIiLCJjb3Vyc2VzIjpbXSwiZXZlbnRzIjpbXSwic3R1ZGVudHMiOltdLCJmaXJzdE5hbWUiOiLXoNeV15nXlCIsImxhc3ROYW1lIjoi16fXlden15QiLCJlbWFpbCI6InRhbGlnZXJncmVAZ21haWwuY29tIiwicGhvbmUiOiIwNTQ2MjY1NTc1IiwicGFzc3dvcmQiOiIkMmIkMTIkMnJ3bVB1LmJQRy91eXRBLjFsVkV6LlZURk1zYXdSc3pFN1o1VEltdVhZMGhSeVRlNTlUcWkiLCJjcmVhdGVkQXQiOiIyMDIxLTA5LTEzVDE4OjEyOjQ4LjUyMloiLCJ1cGRhdGVkQXQiOiIyMDIxLTA5LTIzVDE1OjQ3OjAzLjI3NFoiLCJfX3YiOjAsImlhdCI6MTYzMjY5MTA4MSwiZXhwIjoxNjMyNzc3NDgxfQ.x1NqSBkSjl47hsrCzO1FT_KtOmwt7l7hyptP3muXsfE"
          )
          .end((err, res) => {
            console.log(res.text);
            res.should.have.status(500);
            done();
          });
      });


})