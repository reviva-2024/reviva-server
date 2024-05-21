const expressAsyncHandler = require("express-async-handler");
const {
  addQuiz,
  getQuiz,
  addBanglaQuiz,
  getBanglaQuiz,
} = require("../service/quizService");

const addNewQuiz = expressAsyncHandler(async (req, res) => {
  try {
    const data = req.body;
    // Create a new quiz document
    const newQuiz = await addQuiz(data);
    res
      .status(201)
      .send({ message: "Question added successfully", quiz: newQuiz });
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).send({ message: "Failed to add question" });
  }
});
const addNewBanglaQuiz = expressAsyncHandler(async (req, res) => {
  try {
    const data = req.body;
    // Create a new quiz document
    const newQuiz = await addBanglaQuiz(data);
    res
      .status(201)
      .send({ message: "Question added successfully", quiz: newQuiz });
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).send({ message: "Failed to add question" });
  }
});

const getAllQuiz = expressAsyncHandler(async (req, res) => {
  try {
    const quiz = await getQuiz();
    res.status(200).json({
      message: "Quizes Fetched Successfully",
      success: true,
      data: quiz,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error While Getting The Quizes", success: false, err });
  }
});

const getAllBanglaQuiz = expressAsyncHandler(async (req, res) => {
  try {
    const quiz = await getBanglaQuiz();
    res.status(200).json({
      message: "Quizes Fetched Successfully",
      success: true,
      data: quiz,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error While Getting The Quizes", success: false, err });
  }
});

module.exports = { addNewQuiz, addNewBanglaQuiz, getAllQuiz, getAllBanglaQuiz };
