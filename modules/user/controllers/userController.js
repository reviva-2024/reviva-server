const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const {
  findUserOtp,
  deleteOpt,
  getUserByData,
  updateUser,
  sendOtpToEmail,
  updateUserProfilePicture,
  verifyOtp,
} = require("../services/userService");
const {
  uploadOnCloudinary,
} = require("../../../utils/authentication/cloudinary");

const sendOtpEmail = asyncHandler(async (req, res) => {
  const { email } = req;
  try {
    const otp = await sendOtpToEmail(email);
    res.status(200).json({
      message: "Otp Send Successfully to Email",
      success: true,
      data: otp,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error While Sending Otp To Email",
      success: false,
      error,
    });
  }
});

const verifyOtpAndUpdate = asyncHandler(async (req, res) => {
  const { otp, oldPassword, newPassword } = req.body;
  const { email } = req;
  const user = await getUserByData({ email });
  const passwordMatched = await bcrypt.compare(oldPassword, user.password);
  if (!passwordMatched) {
    return res
      .status(401)
      .json({ message: "Your Old Password Didn't Matched Try Again" });
  }
  const optMatched = await verifyOtp({ email, otp });
  console.log(optMatched);
  if (!optMatched) {
    return res
      .status(401)
      .json({ message: "Otp Didn't Matched Try Again", success: false });
  }
  if (optMatched) {
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await updateUser({ email }, { password: hashedNewPassword });
    await deleteOpt({ email });
    return res.status(200).json({
      message: "Otp Verified And User Updated SuccessFully",
      success: true,
    });
  }
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const { email } = req;
  try {
    const profilePicturePath = req.files.profilePicture[0].path;
    console.log(profilePicturePath, "path");
    const cloudinaryResponse = await uploadOnCloudinary(profilePicturePath);
    console.log(cloudinaryResponse, "cloudinary response");
    const profilePicture = cloudinaryResponse.secure_url;
    const response = await updateUserProfilePicture({ email, profilePicture });
    console.log(response, "update user res");
    res
      .status(200)
      .json({ message: "Profile Picture Updated SuccessFully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error While Updating Profile Picture",
      success: false,
    });
  }
});

const sendForgotEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await getUserByData({ email });
  if (!user) {
    return res.status(401).json({
      message: "Invalid Email Address User Not Found",
      success: false,
    });
  }
  try {
    const sendOtp = await sendOtpToEmail(email);
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  sendOtpEmail,
  verifyOtpAndUpdate,
  updateUserAvatar,
  sendForgotEmail,
};
