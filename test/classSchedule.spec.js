const server = require("../server/server");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const ScheduleModel = require('../server/models/classScheduleModel')

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlcyI6W10sIl9pZCI6IjYxNDg0YmMzYzEzNmZhNjEzNTY1YmQ5YyIsImZpcnN0TmFtZSI6IteX158iLCJsYXN0TmFtZSI6IteW15DXldeT15QiLCJlbWFpbCI6ImN6YXVkYUBnbWFpbC5jb20iLCJwaG9uZSI6IjA1NDQ0NDQ0NTQiLCJwYXNzd29yZCI6IiQyYiQxMiRkWHNjQS5IQXJBeVdlaDRzRmlwYW5ld0RjM25oV2tCUEZXTGhiWUdzYlVlc256Nm5CekljVyIsImFnZSI6MjUsImNvdXJzZU5hbWUiOiLXpNeZ16rXldeXINeeIiwiY291cnNlSWQiOiI2MTMxY2Y3MjMxMzIzZmJkYTg1MmZjMmYiLCJyb2xlIjoiU3R1ZGVudCIsInByb2ZpbGVJbWciOiIiLCJJZE51bWJlciI6IiIsInRlc3RzIjpbXSwiY3JlYXRlZEF0IjoiMjAyMS0wOS0yMFQwODo1MjoxOS44ODRaIiwidXBkYXRlZEF0IjoiMjAyMS0wOS0yMlQxOTo1ODo0Ni4yMDRaIiwiX192IjowLCJpYXQiOjE2MzI4NDkwMTIsImV4cCI6MTYzMjkzNTQxMn0.s2i7H4PP-ldS1fUqLWIyg8zBwx45Sm9CCO2cZvZ0wxY"


describe("API REST /api/classSchedule", async (done) => {
  it("is GET all of class schedule  ", done => {
    chai.request(server)
      .get("/api/classSchedule/")
      .set('Authorization',token)
      .end((err, res) => {
        const data = res.body.data;
        console.log(data);
        res.should.have.status(200);
        data.should.be.a("array");
        data[0].should.have.property("_id");
        data[0].should.have.property("days");
        data[0].days[0].should.have.property('hours')
        data[0].days[0].hours[0].should.have.property('_id').to.be.a('string')
        data[0].days[0].hours[0].should.have.property('className').to.be.a('string')
        data[0].days[0].hours[0].should.have.property('isTaken').to.be.a('boolean')
        data[0].days[0].hours[0].should.have.property('hour').to.be.a('string')
        done();
      });

  });

  // unit test
  it("is NOT GET all of class schedule  ", done => {
    chai.request(server)
      .get("/api/classSchedule/")
      .set('Authorization','Bearer cfhsdfjdvnbkjzdflc')
      .end((err, res) => {
        console.log(res.text)
        res.body.should.be.a('object')
        res.body.message.should.be.eq("invalid or expired token")
        res.should.have.status(400);
        // res.text.should.be.eq('{"success":"false","message": "invalid or expired token","error":"jwt expired"}')

        done();
      });

  });

  //  the authRole not working
  it("Post new class schedule   ", done => {
    const classSchedule = {
      days: [
        {
          hours: [
            { hour: '8-10', isTaken: true, className: 'testing2' },
            { hour: '10-12', isTaken: true, className: 'testing2' }

          ]
        }
      ]
    }
    chai.request(server)
      .post("/api/classSchedule/")
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2UiOjIzLCJqb2QiOiLXqtek16fXmdeTIiwicmVzcG9uc2libGUiOiLXkNeX16jXkNeZ16oiLCJjb3Vyc2VzIjpbXSwibWVzc2FnZXMiOlsiNjE1MWMzMGU3NTYwZjI3ODg4Y2U0OTM2IiwiNjE1MWQ1ZjdhNzM0NjM0ZThjobA2Y2M0Il0sIl9pZCI6IjYxM2Y5NGEwYmM0NDY3NTQ4YzcyMTM0ZSIsInJvbGUiOiJTdGFmZiIsInByb2ZpbGVJbWciOiJpbWFnZXNcXDE2MzI3NjU4MDMxOTRfZ2lybGF2YXRhci5qcGciLCJJZE51bWJlciI6IiIsImV2ZW50cyI6WyI2MTUzMzBhMTliOWMxMTM5ZTg4MzVmYzgiXSwic3R1ZGVudHMiOltdLCJmaXJzdE5hbWUiOiLXoNeV15kiLCJsYXN0TmFtZSI6Iten15XXp9eUIiwiZW1haWwiOiJ0YWxpZ2VyZ3JlQGdtYWlsLmNvbSIsInBob25lIjoiMDU0NjI2NTU3NSIsInBhc3N3b3JkIjoiJDJiJDEyJDJyd21QdS5iUEcvdXl0QS4xbFZFei5WVEZNc2F3UnN6RTdaNVRJbXVYWTBoUnlUZTU5VHFpIiwiY3JlYXRlZEF0IjoiMjAyMS0wOS0xM1QxODoxMjo0OC41MjJaIiwidXBkYXRlZEF0IjoiMjAyMS0wOS0yOFQxNToxMToyOS4yOTBaIiwiX192IjozLCJpYXQiOjE2MzI4NTMyMjAsImV4cCI6MTYzMjkzOTYyMH0.2qBFkNahqbpY_gvnBwLuAVDxf0ca2qIVoRq6DWK3VPE')
      .send(classSchedule)
      .end((err, res) => {
        console.log(res.text)
        res.should.have.status(200);

        done();
      });
  });

  it("is not Post class schedule ", done => {
    const classSchedule = {
      days: [
        {
          hours: [
            { hour:'13-14', isTaken: "bla", className:false}
          ]
        }
      ]
    }
    chai.request(server)
      .post("/api/classSchedule/")
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2UiOjIzLCJqb2QiOiLXqtek16fXmdeTIiwicmVzcG9uc2libGUiOiLXkNeX16jXkNeZ16oiLCJjb3Vyc2VzIjpbXSwibWVzc2FnZXMiOlsiNjE1MWMzMGU3NTYwZjI3ODg4Y2U0OTM2IiwiNjE1MWQ1ZjdhNzM0NjM0ZThjODA2Y2M0Il0sIl9pZCI6IjYxM2Y5NGEwYmM0NDY3NTQ4YzcyMTM0ZSIsInJvbGUiOiJTdGFmZiIsInByb2ZpbGVJbWciOiJpbWFnZXNcXDE2MzI3NjU4MDMxOTRfZ2lybGF2YXRhci5qcGciLCJJZE51bWJlciI6IiIsImV2ZW50cyI6WyI2MTUzMzBhMTliOWMxMTM5ZTg4MzVmYzgiXSwic3R1ZGVudHMiOltdLCJmaXJzdE5hbWUiOiLXoNeV15kiLCJsYXN0TmFtZSI6Iten15XXp9eUIiwiZW1haWwiOiJ0YWxpZ2VyZ3JlQGdtYWlsLmNvbSIsInBob25lIjoiMDU0NjI2NTU3NSIsInBhc3N3b3JkIjoiJDJiJDEyJDJyd21QdS5iUEcvdXl0QS4xbFZFei5WVEZNc2F3UnN6RTdaNVRJbXVYWTBoUnlUZTU5VHFpIiwiY3JlYXRlZEF0IjoiMjAyMS0wOS0xM1QxODoxMjo0OC41MjJaIiwidXBkYXRlZEF0IjoiMjAyMS0wOS0yOFQxNToxMToyOS4yOTBaIiwiX192IjozLCJpYXQiOjE2MzI4NTMyMjAsImV4cCI6MTYzMjkzOTYyMH0.2qBFkNahqbpY_gvnBwLuAVDxf0ca2qIVoRq6DWK3VPE')
      .send(classSchedule)
      .end((err, res) => {
        console.log(res.text)
        res.should.have.status(400);
        res.text.should.be.deep.eq('{"success":"false", "message":"post failed", "error":"schedule validation failed: days.0.hours.0.hour: Path `hour` is required."}')
        done();
      });
  });


  /// the authRole not working
    it('it should UPDATE a classSchedule given the id', (done) => {
       chai.request(server)
        .put('/api/classSchedule')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2UiOjIzLCJqb2QiOiLXqtek16fXmdeTIiwicmVzcG9uc2libGUiOiLXkNeX16jXkNeZ16oiLCJjb3Vyc2VzIjpbXSwibWVzc2FnZXMiOlsiNjE1MWMzMGU3NTYwZjI3ODg4Y2U0OTM2IiwiNjE1MWQ1ZjdhNzM0NjM0ZThjobA2Y2M0Il0sIl9pZCI6IjYxM2Y5NGEwYmM0NDY3NTQ4YzcyMTM0ZSIsInJvbGUiOiJTdGFmZiIsInByb2ZpbGVJbWciOiJpbWFnZXNcXDE2MzI3NjU4MDMxOTRfZ2lybGF2YXRhci5qcGciLCJJZE51bWJlciI6IiIsImV2ZW50cyI6WyI2MTUzMzBhMTliOWMxMTM5ZTg4MzVmYzgiXSwic3R1ZGVudHMiOltdLCJmaXJzdE5hbWUiOiLXoNeV15kiLCJsYXN0TmFtZSI6Iten15XXp9eUIiwiZW1haWwiOiJ0YWxpZ2VyZ3JlQGdtYWlsLmNvbSIsInBob25lIjoiMDU0NjI2NTU3NSIsInBhc3N3b3JkIjoiJDJiJDEyJDJyd21QdS5iUEcvdXl0QS4xbFZFei5WVEZNc2F3UnN6RTdaNVRJbXVYWTBoUnlUZTU5VHFpIiwiY3JlYXRlZEF0IjoiMjAyMS0wOS0xM1QxODoxMjo0OC41MjJaIiwidXBkYXRlZEF0IjoiMjAyMS0wOS0yOFQxNToxMToyOS4yOTBaIiwiX192IjozLCJpYXQiOjE2MzI4NzA1MDMsImV4cCI6MTYzMjk1NjkwM30.EMZVTkNvHCWM7BQZVrh5sW0JY-xuAda7XHPdYt65jno')
        .send({
          _id: '6147aa0d5adea82a506a1dd4',
          days: [
            {
              _id: '6147aa0d5adea82a506a1dd5',
              hours: [
                { _id: '6147aa0d5adea82a506a1dd6', hour: '8-10', isTaken: true, className: 'testing' }
              ]
            }]
        })
        .end((err, res) => {
          console.log(res.text)
          res.should.have.status(200);

          done();
        })
      })

//weird
  it('Delete classSchedule', (done) => {
    const id = '6151dd46846be8195ce88b0f'
    chai.request(server)
      .delete("/api/classSchedule/")
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2UiOjIzLCJqb2QiOiLXqtek16fXmdeTIiwicmVzcG9uc2libGUiOiLXkNeX16jXkNeZ16oiLCJjb3Vyc2VzIjpbXSwibWVzc2FnZXMiOlsiNjE1MWMzMGU3NTYwZjI3ODg4Y2U0OTM2IiwiNjE1MWQ1ZjdhNzM0NjM0ZThjobA2Y2M0Il0sIl9pZCI6IjYxM2Y5NGEwYmM0NDY3NTQ4YzcyMTM0ZSIsInJvbGUiOiJTdGFmZiIsInByb2ZpbGVJbWciOiJpbWFnZXNcXDE2MzI3NjU4MDMxOTRfZ2lybGF2YXRhci5qcGciLCJJZE51bWJlciI6IiIsImV2ZW50cyI6WyI2MTUzMzBhMTliOWMxMTM5ZTg4MzVmYzgiXSwic3R1ZGVudHMiOltdLCJmaXJzdE5hbWUiOiLXoNeV15kiLCJsYXN0TmFtZSI6Iten15XXp9eUIiwiZW1haWwiOiJ0YWxpZ2VyZ3JlQGdtYWlsLmNvbSIsInBob25lIjoiMDU0NjI2NTU3NSIsInBhc3N3b3JkIjoiJDJiJDEyJDJyd21QdS5iUEcvdXl0QS4xbFZFei5WVEZNc2F3UnN6RTdaNVRJbXVYWTBoUnlUZTU5VHFpIiwiY3JlYXRlZEF0IjoiMjAyMS0wOS0xM1QxODoxMjo0OC41MjJaIiwidXBkYXRlZEF0IjoiMjAyMS0wOS0yOFQxNToxMToyOS4yOTBaIiwiX192IjozLCJpYXQiOjE2MzI4NzA1MDMsImV4cCI6MTYzMjk1NjkwM30.EMZVTkNvHCWM7BQZVrh5sW0JY-xuAda7XHPdYt65jno')
      .send(id)
      .end((err, res) => {
          res.should.have.status(200);

        done();
      });

    done()

  });

})
