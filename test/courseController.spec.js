const server = require("../server/server");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2UiOjIzLCJyb2xlIjoiU3RhZmYiLCJqb2QiOiIiLCJyZXNwb25zaWJsZSI6Itee16DXlNec16og16fXldeo16EiLCJtZXNzYWdlcyI6WyI2MTUxYzMwZTc1NjBmMjc4ODhjZTQ5MzYiLCI2MTUxZDVmN2E3MzQ2MzRlOGM4MDZjYzQiLCI2MTU5MDc2MjJlMDQyOTkxOTRjNTE1NWQiLCI2MTU5YzM1NDEyZDUyMTAwMTZjZWNjNzciLCI2MTU5YzNhZTEyZDUyMTAwMTZjZWNjOTMiXSwiX2lkIjoiNjEzZjk0YTBiYzQ0Njc1NDhjNzIxMzRlIiwicHJvZmlsZUltZyI6ImNsaWVudFxccHVibGljXFxpbWFnZXNcXHByb2ZpbGVJbWctMTYzMzI3Mjg2NTc4MC5qcGciLCJJZE51bWJlciI6IiIsImNvdXJzZXMiOltdLCJldmVudHMiOlsiNjE1MzMwYTE5YjljMTEzOWU4ODM1ZmM4Il0sInN0dWRlbnRzIjpbXSwiZmlyc3ROYW1lIjoi16DXldeZ15QiLCJsYXN0TmFtZSI6Iten15XXp9eUIiwiZW1haWwiOiJ0YWxpZ2VyZ3JlQGdtYWlsLmNvbSIsInBob25lIjoiMDU0NjI2NTU3NSIsInBhc3N3b3JkIjoiJDJiJDEyJElnVjF6eUk2RklFbkYwWU9aSHBnSU9aUFVDOVNuTEhJZTd2SWRDOVdEdnZjQUlTRUtYLklPIiwiY3JlYXRlZEF0IjoiMjAyMS0wOS0xM1QxODoxMjo0OC41MjJaIiwidXBkYXRlZEF0IjoiMjAyMS0xMC0wM1QxNDo1NDoyNS44ODRaIiwiX192Ijo2LCJqb2IiOiLXnteg15TXnNeqINen15XXqNehINeeIiwiaWF0IjoxNjMzMjc1MzI3LCJleHAiOjE2MzMzNjE3Mjd9.4t9lIaYGcl-hu2pm5MpLmGUXZpQ3wfKp51xszolxITE";
describe("API REST /api/course", async (done) => {
  ///////////////////post course//////////////////////
    it("is post course  ", (done) => {
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
  //////////////////get course by id//////////////////
    it("is get course by id", (done) => {
   const id ="613f94a0bc4467548c72134e"
      chai
        .request(server)
        .get("/api/course/getCourseById/"+id)
        .set("Authorization", token)
        .end((err, res) => {
          const data = res.body;
          console.log(data);
          data.should.be.a("object");
          done();
        });
    });
  ////////////////////delete course by id////////////////////
    it("is delete course by id", (done) => {
   const id ="6159084ffa331b44e4ad48b5"
      chai
        .request(server)
        .delete("/api/course/deleteCourseById/"+id)
        .set("Authorization", token)
        .end((err, res) => {
          const data = res.body;
          console.log(data);
          // data.should.be.a("object");
          done();
        });
    });
  /////////////////////////not working updateSubject/////////////////
  it("is update course by id", (done) => {
    const id = "6159084ffa331b44e4ad48b5";
    const updateCourse = {
      _id: "6131cf7231323fbda852fc2f",
      nameSubject: "css1",
    };
    chai
      .request(server)
      .delete("/api/course/updateSubject/" + id)
      .set("Authorization", token)
      .send(updateCourse)
      .end((err, res) => {
        const data = res.body;
        console.log(data);
        // data.should.be.a("object");
        done();
      });
  });
  /////////////addSubSubject/////////////////////
  it("is add Sub Subject", (done) => {
    const SubSubject = {
      course_id: "6131cf7231323fbda852fc2f",
      courseInformationId: "6131cf7231323fbda852fc30",
      isDone: false,
      subject: "gagu",
      array: "topics",
    };
    chai
      .request(server)
      .post("/api/course/addSubSubject")
      .set("Authorization", token)
      .send(SubSubject)
      .end((err, res) => {
        const data = res.body;
        console.log(data);
        // data.should.be.a("object");
        done();
      });
  });
  /////////////update Sub Subject/////////////////////
  it("is add Sub Subject", (done) => {
    const updateSubSubject = {
      course_id: "6131cf7231323fbda852fc2f",
      courseInformationId: "6131cf7231323fbda852fc30",
      isDone: false,
      subject: "gagu",
      array: "topics",
    };
    chai
      .request(server)
      .post("/api/course/addSubSubject")
      .set("Authorization", token)
      .send(updateSubSubject)
      .end((err, res) => {
        const data = res.body;
        console.log(data);
        // data.should.be.a("object");
        done();
      });
  });
});
