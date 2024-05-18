const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  question: String,
  markingCriteria: String,
  options: [
    { label: String, mark: Number, option: String },
    { label: String, mark: Number, option: String },
    { label: String, mark: Number, option: String },
    { label: String, mark: Number, option: String },
  ],
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
