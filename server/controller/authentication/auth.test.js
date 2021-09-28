const expect = require('chai').expect
const {authUser , authRole} = require('../controller/authentication/auth')
describe('the auth user function',()=>{
   it('should get user on the response body', ()=>{
       const result = authUser({email:'chen@gmail.com',password:'12345678'})
       expect(result).to.have.property('email','password')
   })
})