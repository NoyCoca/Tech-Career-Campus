const express = require("express");
const router = express.Router();
const staffController = require("../controller/staffController")
const {authRole} = require('../controller/authentication/auth');

router.get('/', staffController.getAllStaff);
router.get('/getStaffById', staffController.getStaffById);
router.delete('/',authRole("Staff"), staffController.deleteStaffById);
router.put('/:id',authRole("Staff"), staffController.updateStaffById);
router.get('/student/',authRole("Staff"),staffController.getStudentsByStaff)

module.exports = router;