const StudentModel = require("../../models/studentModel");
const bcrypt = require("bcrypt");
const StaffModel = require("../../models/staffModel");
const { isEmptyId ,nullVariable} = require('../../utils/Errors')
const { SendEmails} = require('../../utils/SendEmails')


const checkPassword = async (req, res, next) => {
   
    isEmptyId(req.body.id)
    try {
        let person;
        if (req.body.title === 'Student') {
            person = StudentModel
        }
        else if (req.body.title === 'Staff') {
            person = StaffModel
        }
        else {
            throw new Error('you need to give me a title Staff or Student')
        }
        nullVariable(person);
        person.findById(req.body.id, async (err, result) => {
            if (err) throw err;
            const isPasswordCorrect = await bcrypt.compare(req.body.currentPassword, result.password);
            console.log(isPasswordCorrect)
            if (isPasswordCorrect) {
                next()
            }
            else {
                res
                    .status(401)
                    .json({
                        success: false,
                        message: "wrong password",
                        errors: { password: "wrong password" } ,
                    });
            }
        })
    } catch (err) {
        res
            .status(500)
            .json({
                success: false,
                message: "wrong",
                error: err.message
            });
    }



};

const changePassword = (req, res) => {
    isEmptyId(req.body.id)
    let person;
    if (req.body.title === 'Student') {
        person = StudentModel
        console.log(req.body.title)
    }
    else if (req.body.title === 'Staff') {
        person = StaffModel
        console.log(req.body.title)
    }
    else {
        throw new Error('you need to give me a title Staff or Student')
    }
    try {
        nullVariable(person);
        SendEmails(req,res);
        bcrypt.genSalt(12, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(req.body.newPassword, salt, async (err, hash) => {
                if (err) throw err;
                req.body.newPassword = hash
                console.log("func")
                person.findByIdAndUpdate(req.body.id, { $set: { password : req.body.newPassword } }, (err, result) => {
                    if (err) throw err
                    res
                        .status(201)
                        .json({
                            success: true,
                            message: "update was success",
                            result: result
                        })
                       
                })
            })
        })
    }
    catch (err) {
        res
            .status(500)
            .json({
                success: true,
                message: "update was success",
                error: err.message
            })
    }
};
module.exports = { checkPassword, changePassword }