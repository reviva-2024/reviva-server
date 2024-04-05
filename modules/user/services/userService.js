const Otp = require("../models/otpModel");
const User = require("../models/userModel");

const createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};

const createOtp = async (otpData) => {
  try {
    const newOtp = new Otp(otpData);
    await newOtp.save();
    return newOtp;
  } catch (error) {
    throw new Error("Error creating Otp: " + error.message);
  }
};
const deleteOpt = async (userData) => {
  try {
    const newOtp = await Otp.deleteMany(userData);
    return newOtp;
  } catch (error) {
    throw new Error("Error creating Otp: " + error.message);
  }
};
const findUserOtp = async (userData) => {
  try {
    const userOtp = await Otp.findOne(userData);
    if (!userOtp) {
      throw new Error("UserOtp not found");
    }
    return userOtp;
  } catch (error) {
    throw new Error("Error fetching user: " + error.message);
  }
};

const getUserByData = async (data) => {
  try {
    const user = await User.findOne(data);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("Error fetching user: " + error.message);
  }
};

const updateUser = async (email, userData) => {
  try {
    const user = await User.findOneAndUpdate( email, userData);
    if (!user) {
      throw new Error("Error While Updating User");
    }
    return user;
  } catch (error) {
    throw new Error("Error While Updating User: " + error.message);
  }
};

module.exports = {
  createUser,
  getUserByData,
  createOtp,
  findUserOtp,
  deleteOpt,
  updateUser,
};
