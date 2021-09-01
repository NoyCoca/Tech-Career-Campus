const express = require("express");
const router = express.Router();
const messagesController = require("../controller/forumController");

router.post("/staff", messagesController.messagesByStaff);
router.post("/student", messagesController.messagesByStudent);
router.get("/", messagesController.getAllMessages);
router.put("/:id", messagesController.updateMessage);
router.delete("/:id", messagesController.deleteMessage);

module.exports = router;