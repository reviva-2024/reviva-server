const expressAsyncHandler = require("express-async-handler");
const Quiz = require("../models/quizModel");

const addQuiz = expressAsyncHandler(async (req, res) => {
  try {
    const data = req.body;

    // Create an array of option objects

    // Create a new quiz document
    const newQuiz = new Quiz(data);

    // Save the new quiz document to the database
    const savedQuiz = await newQuiz.save();

    res
      .status(201)
      .send({ message: "Question added successfully", quiz: savedQuiz });
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).send({ message: "Failed to add question" });
  }
});

const getQuiz = expressAsyncHandler(async (req, res) => {
  try {
    const quiz = await Quiz.find();
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

module.exports = { addQuiz, getQuiz };
