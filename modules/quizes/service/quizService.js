const Quiz = require("../models/quizModel");

const addQuiz = async (quizData) => {
  try {
    const newQuiz = new Quiz(quizData);
    await newQuiz.save();
    return newQuiz;
  } catch (error) {
    throw new Error("Error Adding Quiz: " + error.message);
  }
};
const getQuiz = async (data) => {
  try {
    let quiz;
    if (data) {
      quiz = await Quiz.findOne(data);
    } else {
      quiz = await Quiz.find();
    }
    if (!quiz) {
      throw new Error("Quiz Not Found");
    }
    return quiz;
  } catch (error) {
    console.log(error, "From Get Quiz");
    throw error;
  }
};
module.exports = { addQuiz, getQuiz };
