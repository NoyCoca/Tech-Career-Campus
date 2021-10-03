const server = require("../server/server");
let chai = require("chai");
let chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);

// describe("POST request to /api/register", () => {
//   it("POST to creat a new staff ", () => {
//     const newStaff = {
//         firstName: "firstName",
//         lastName: "lastName",
//         email: "shuanesh897888@gmail.com",
//         phone: "054689756",
//         password: "12345678",
//         age: 25,
//         registeredAs: "Staff",
//         profileImg: "",
//         IdNumber: "323506489",
//         responsible: "אחראית על משאבי אנוש",
//         job:"כוח אדם",
//     };
//     chai.request(server)
//       .post("/api/register")
//       .set(
//         "Authorization",
//         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2UiOjIzLCJqb2QiOiLXqtek16fXmdeTIiwicmVzcG9uc2libGUiOiLXkNeX16jXkNeZ16oiLCJtZXNzYWdlcyI6W10sIl9pZCI6IjYxM2Y5NGEwYmM0NDY3NTQ4YzcyMTM0ZSIsInJvbGUiOiJTdGFmZiIsInByb2ZpbGVJbWciOiIxNjMyNDEyMDIzMjMxX2dpcmxhdmF0YXIuanBnIiwiSWROdW1iZXIiOiIiLCJjb3Vyc2VzIjpbXSwiZXZlbnRzIjpbXSwic3R1ZGVudHMiOltdLCJmaXJzdE5hbWUiOiLXoNeV15nXlCIsImxhc3ROYW1lIjoi16fXlden15QiLCJlbWFpbCI6InRhbGlnZXJncmVAZ21haWwuY29tIiwicGhvbmUiOiIwNTQ2MjY1NTc1IiwicGFzc3dvcmQiOiIkMmIkMTIkMnJ3bVB1LmJQRy91eXRBLjFsVkV6LlZURk1zYXdSc3pFN1o1VEltdVhZMGhSeVRlNTlUcWkiLCJjcmVhdGVkQXQiOiIyMDIxLTA5LTEzVDE4OjEyOjQ4LjUyMloiLCJ1cGRhdGVkQXQiOiIyMDIxLTA5LTIzVDE1OjQ3OjAzLjI3NFoiLCJfX3YiOjAsImlhdCI6MTYzMjY5MTA4MSwiZXhwIjoxNjMyNzc3NDgxfQ.x1NqSBkSjl47hsrCzO1FT_KtOmwt7l7hyptP3muXsfE"
//       )
//       .send(newStaff)
//       .end((err, res) => {
//         console.log(res.text); 
//         const data = res.body.data;
//         console.log(data)
//         res.body.data.have.property("message").eq("create new staff success")
//         res.should.have.status(201);
//         data.should.be.a("object");
//         data.should.have.property("firstName").eq(newStaff.firstName);
//         data.should.have.property("lastName").eq(newStaff.lastName);
//         data.should.have.property("email").eq(newStaff.email);
//         data.should.have.property("job").eq(newStaff.job);
//         data.should.have.property("phone").eq(newStaff.phone);
//         done();
//       });
//   });

// })
