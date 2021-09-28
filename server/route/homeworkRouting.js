const express = require("express");
const router = express.Router();
const ADMIN = process.env.ADMIN;
const homeworkController = require("../controller/homeworkController");
const { authRole } = require("../controller/authentication/auth");

router.get("/", homeworkController.getAllHomework);
router.put("/:id", authRole(ADMIN), homeworkController.updateHomeworkById);
router.post("/", authRole(ADMIN), homeworkController.creatNewHomework);
router.delete("/", authRole(ADMIN), homeworkController.deleteHomeworkById);
module.exports = router;
