const assert = require('chai').assert;
const expect = require('chai').expect;
const {nullError,isEmptyId,nullVariable} = require('../server/utils/Errors');
const server = require("../server/server");
let chai = require("chai");
let chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const TOKEN_TEST = process.env.TOKEN_TEST
const {request , response} = require("express")
console.log(TOKEN_TEST)
describe("the nullError() Gets 2 objects and and return a result if ter is information and return error if the result equal to null to /api/homework", () => {
  it("When it gets an empty object it should return an error", (done) => {
    const id = "6131cf7231323fbda852fc2b";
    chai
      .request(server)
      .get("/api/homework/" + id)
      .set(
        "Authorization",
        `Bearer ${TOKEN_TEST}`
      )
      .end((err, res) => {
        const data = res.body.data;
        // console.log(res)
        // const nullErrorV = nullError(res.body.data , res);
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.error.should.be.a("the result equal to null or undefined Please check that you are sending the required details in the correct format")
        done();
      });
  });
})



describe('the nullError() Gets 2 objects and and return a result if ter is information and return error if the result equal to null',()=>{
    it('nullError() return obj', ()=>{
        const res = {
            check:()=>{
                return{
                    status:400,
                    json:()=>{return {success:true , message:"success", error:null}}
                }
            },
            
        }
        console.log(response)
        const data = {}   
        const result  = nullError(data,response);
        console.log(result)
        res.should.have.status(400)
        // res.should.have.json({error:null});
    });
 
    it('nullError() get 2 arguments type of obj', ()=>{
     const res = {
         status:()=>{},
         json:()=>{}
     }
     const req = {}   
     const result  = nullError(req,res);
     expect(res, req).to.be.an('object')
  })
 
  it('nullError() get 2 arguments another value that is not an object', ()=>{
     const res = ""
     const req = ""   
     const result  = nullError(req,res);
     expect(result , null)
  })
 
  it('nullError() Without arguments', ()=>{
     const result  = nullError();
     expect(result , null)
  })
 
 });