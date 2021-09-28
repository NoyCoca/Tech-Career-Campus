const express = require("express");
const router = express.Router();
const ADMIN = process.env.ADMIN;
const staffController = require("../controller/staffController");
const { authRole } = require("../controller/authentication/auth");

router.get("/", staffController.getAllStaff);
router.get("/getStaffById/:id", staffController.getStaffById);
router.delete("/", authRole(ADMIN), staffController.deleteStaffById);
router.put("/:id", authRole(ADMIN), staffController.updateStaffById);

module.exports = router;
