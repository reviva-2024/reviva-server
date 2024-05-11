const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  question: String,
  options: [
    { 1: String, mark: Number },
    { 2: String, mark: Number },
    { 3: String, mark: Number },
    { 4: String, mark: Number },
  ]
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
