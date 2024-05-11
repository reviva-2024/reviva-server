const express = require("express");
const { addQuiz, getQuiz } = require("../controllers/quizController");
const router = express.Router();

router.post("/addQuiz", addQuiz);
router.get("/getQuizes", getQuiz);

module.exports = router;
