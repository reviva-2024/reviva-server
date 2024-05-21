const mongoose = require("mongoose");

const banglaQuizSchema = new mongoose.Schema({
  question: String,
  markingCriteria: String,
  options: [
    { label: String, mark: Number, option: String },
    { label: String, mark: Number, option: String },
    { label: String, mark: Number, option: String },
    { label: String, mark: Number, option: String },
  ],
});

const BanglaQuiz = mongoose.model("BanglaQuiz", banglaQuizSchema);

module.exports = BanglaQuiz;
