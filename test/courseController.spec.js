const server = require("../server/server");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2UiOjIzLCJqb2QiOiLXnteg15TXnNeqINen15XXqNehINeeIiwicmVzcG9uc2libGUiOiLXnteg15TXnNeqINen15XXqNehIiwibWVzc2FnZXMiOlsiNjE1MWMzMGU3NTYwZjI3ODg4Y2U0OTM2IiwiNjE1MWQ1ZjdhNzM0NjM0ZThjobA2Y2M0Il0sIl9pZCI6IjYxM2Y5NGEwYmM0NDY3NTQ4YzcyMTM0ZSIsInJvbGUiOiJTdGFmZiIsInByb2ZpbGVJbWciOiJpbWFnZXNcXDE2MzMyMDAyMzEyOTFfYm95YXZhdGFyLnBuZyIsIklkTnVtYmVyIjoiIiwiY291cnNlcyI6W10sImV2ZW50cyI6WyI2MTUzMzBhMTliOWMxMTM5ZTg4MzVmYzgiXSwic3R1ZGVudHMiOltdLCJmaXJzdE5hbWUiOiJub3kiLCJsYXN0TmFtZSI6Iten15XXp9eUIiwiZW1haWwiOiJ0YWxpZ2VyZ3JlQGdtYWlsLmNvbSIsInBob25lIjoiMDU0NjI2NTU3NSIsInBhc3N3b3JkIjoiJDJiJDEyJDJyd21QdS5iUEcvdXl0QS4xbFZFei5WVEZNc2F3UnN6RTdaNVRJbXVYWTBoUnlUZTU5VHFpIiwiY3JlYXRlZEF0IjoiMjAyMS0wOS0xM1QxODoxMjo0OC41MjJaIiwidXBkYXRlZEF0IjoiMjAyMS0xMC0wMlQxODo0Mzo1MS40NTNaIiwiX192IjozLCJpYXQiOjE2MzMyMTAwMDMsImV4cCI6MTYzMzI5NjQwM30.XRA4IXqL1BHslEvnMxzDC7hc3nl8bYE-EEzFRVKnaAI";
describe("API REST /api/classSchedule", async (done) => {

  it("is post all of class schedule  ", (done) => {
   
    const newCourse = {
    id:"613f94a0bc4467548c72134e",
      name: "dev",
      courseType: "dev",
      CourseInformation: [
        {
          nameSubject: 
            "html"
          ,
        },
      ],
      createBy: "y"+"קוקה",
    };
    chai
      .request(server)
      .post("/api/course/addNewCourse")
      .set("Authorization", token)
      .send(newCourse)
      .end((err, res) => {
        const data = res.body;
        console.log(data);
        // res.should.have.status(200);
        // data.should.be.a("array");

        done();
      });
  });

  it("is get all of class schedule  ", (done) => {
 const id ="613f94a0bc4467548c72134e"
    chai
      .request(server)
      .get("/api/course/getCourseById/:id/"+id)
      .set("Authorization", token)
 
      .end((err, res) => {
        const data = res.body;
        console.log(data);
        // res.should.have.status(200);
        // data.should.be.a("array");

        done();
      });
  });
});
