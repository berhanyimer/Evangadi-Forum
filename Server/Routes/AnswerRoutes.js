const express = require("express");
const router = express.Router();
const {
  submitAnswer,
  allAnswer,
} = require("../controller/AnswerController.js");

//authentication middleware
const authMiddleware = require("../MiddleWare/AuthMiddleware.js");

//Post answer for a question
router.post("/answer", authMiddleware, submitAnswer);

//get answers for a question
router.get("/answer/:questionid", authMiddleware, allAnswer);

module.exports = router;
