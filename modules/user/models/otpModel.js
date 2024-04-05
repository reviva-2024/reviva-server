const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiredAt: {
    type: Date,
    required: true,
    default: Date.now + 180000,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Otp = mongoose.model("Otp", otpSchema);

module.exports = Otp;
