const express = require("express");
const {
  addNewQuiz,
  getAllQuiz,
  addNewBanglaQuiz,
  getAllBanglaQuiz,
} = require("../controllers/quizController");
const router = express.Router();

router.post("/addQuiz", addNewQuiz);
router.post("/addBanglaQuiz", addNewBanglaQuiz);
router.get("/getQuizes", getAllQuiz);
router.get("/getBanglaQuizes", getAllBanglaQuiz);

module.exports = router;
