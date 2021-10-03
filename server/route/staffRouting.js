const express = require("express");
const router = express.Router();
const ADMIN = process.env.ADMIN;
const staffController = require("../controller/staffController");
const { authRole } = require("../controller/authentication/auth");
const {checkPassword,changePassword} = require('../controller/authorization/changePassword')
const upload = require("../middleware/upload");

router.get("/", staffController.getAllStaff);
router.get("/getStaffById/:id", staffController.getStaffById);
router.delete("/", authRole(ADMIN), staffController.deleteStaffById);
router.put("/update/:id", authRole(ADMIN), upload.single('profileImg'), staffController.updateStaffById);
router.put('/changePassword',checkPassword,changePassword);
module.exports = router;
