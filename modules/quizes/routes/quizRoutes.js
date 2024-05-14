const express = require("express");
const { addNewQuiz, getAllQuiz } = require("../controllers/quizController");
const router = express.Router();

router.post("/addQuiz", addNewQuiz);
router.get("/getQuizes", getAllQuiz);

module.exports = router;
