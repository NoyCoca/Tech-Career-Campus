const express = require("express");
const router = express.Router();
const ADMIN = process.env.ADMIN;
const scheduleCtrl = require("../controller/classScheduleController");
const { authRole } = require("../controller/authentication/auth");

router.post("/", scheduleCtrl.getAllClasses);
router.put("/update", authRole(ADMIN), scheduleCtrl.updateClasses);
router.post("/update", authRole(ADMIN), scheduleCtrl.updateClasses);
router.delete("/update", authRole(ADMIN), scheduleCtrl.updateClasses);
// router.put("/updateClassesName",authRole(ADMIN), scheduleCtrl.updateClassesName);
// router.put("/getClassById",authRole(ADMIN), scheduleCtrl.getClassById);

module.exports = router;
