const express = require("express");
const router = express.Router();
const {
  registerQuestion,
  allQuestions,
  singleQuestion,
} = require("../controller/QuestionController");

//authentication middleware
const authMiddleware = require("../MiddleWare/AuthMiddleware");

//Post question
router.post("/question", authMiddleware, registerQuestion);

//get all questions
router.get("/allquestions", authMiddleware, allQuestions);

//get single question
router.get("/question/:questionid", authMiddleware, singleQuestion);

module.exports = router;
