const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  question: String,
  options: [
    { a: String, mark: Number },
    { b: String, mark: Number },
    { c: String, mark: Number },
    { d: String, mark: Number }
  ]
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
