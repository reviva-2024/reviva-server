const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const {
  getUserByData,
  updateUser,
  sendOtpToEmail,
  updateUserProfilePicture,
  verifyOtp,
  deleteOtp,
} = require("../services/userService");
const { uploadOnCloudinary } = require("../../../Config/cloudinary");
const expressAsyncHandler = require("express-async-handler");

const sendOtpEmail = asyncHandler(async (req, res) => {
  const { email } = req;
  if (!email) {
    return res.status(400).json({
      message:
        "Oops! It looks like you forgot to provide some required information. Please provide all necessary Information to proceed.",
      success: false,
    });
  }
  try {
    const userOtp = await deleteOtp({ email });
    if (userOtp) {
      await sendOtpToEmail(email);
    }
    res.status(200).json({
      message: "Otp Successfully Sended To Email",
      success: true,
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
  const { email } = req;
  const { otp, oldPassword, newPassword } = req.body;
  if (!otp || !oldPassword || !newPassword) {
    return res.status(400).json({
      message:
        "Oops! It looks like you forgot to provide some required information. Please provide all necessary Information to proceed.",
      success: false,
    });
  }
  const user = await getUserByData({ email });
  const passwordMatched = await bcrypt.compare(oldPassword, user.password);
  if (!passwordMatched) {
    return res
      .status(401)
      .json({ message: "Your Old Password Didn't Matched Try Again" });
  }
  const optMatched = await verifyOtp({ email, otp });
  if (!optMatched) {
    return res
      .status(401)
      .json({ message: "Otp Didn't Matched Try Again", success: false });
  }
  if (optMatched) {
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await updateUser({ email }, { password: hashedNewPassword });
    await deleteOtp({ email });
    return res.status(200).json({
      message: "Otp Verified And User Updated SuccessFully",
      success: true,
    });
  }
});

const updateUserInfo = expressAsyncHandler(async (req, res) => {
  try {
    const { phone, username } = req.body;
    const { email } = req;
    const result = await updateUser({ email }, { phone, username });

    return res.status(200).json({
      message: "UserInfo Updated Successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Something Went Wrong",
      success: false,
    });
  }
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const { email } = req;

  try {
    const profilePicturePath = req.files.profilePicture[0].path;
    if (!profilePicturePath) {
      return res.status(400).json({
        message:
          "Oops! It looks like you forgot to provide some required information. Please provide all necessary Information to proceed.",
        success: false,
      });
    }
    const cloudinaryResponse = await uploadOnCloudinary(profilePicturePath);
    const profilePicture = cloudinaryResponse.secure_url;
    const response = await updateUserProfilePicture({ email, profilePicture });
    console.log("response", response);
    res.status(200).json({
      message: "Profile Picture Updated SuccessFully",
      success: true,
      data: response,
    });
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
  if (!email) {
    return res.status(400).json({
      message:
        "Oops! It looks like you forgot to provide some required information. Please provide all necessary Information to proceed.",
      success: false,
    });
  }
  try {
    await getUserByData({ email });
  } catch (error) {
    if (error) {
      return res.status(401).json({
        message: "Invalid Email Address! User Not Found",
        success: false,
        error,
      });
    }
  }
  try {
    const deleteOtp2 = await deleteOtp({ email });
    if (deleteOtp2) {
      await sendOtpToEmail(email);
    }
    return res.status(200).json({
      message: "Otp Successfully Sended To Email",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});

const verifyOtpAndForgotPassword = asyncHandler(async (req, res) => {
  const { otp, email, password } = req.body;
  if (!email || !otp || !password) {
    return res.status(400).json({
      message:
        "Oops! It looks like you forgot to provide some required information. Please provide all necessary Information to proceed.",
      success: false,
    });
  }
  const optMatched = await verifyOtp({ email, otp });
  if (!optMatched) {
    return res
      .status(401)
      .json({ message: "Otp Didn't Matched Try Again", success: false });
  }
  if (optMatched) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await updateUser({ email }, { password: hashedPassword });
    await deleteOtp({ email });
    return res.status(200).json({
      message: "Otp Verified And User Updated SuccessFully",
      success: true,
    });
  }
});

const updateQuizMark = expressAsyncHandler(async (req, res) => {
  try {
    const { quizMark } = req.body;
    const { email } = req;
    const result = await updateUser(
      { email },
      {
        quizMark,
        isQuizAttended: true,
      },
    );
    res.status(200).json({
      message: "User Quiz Mark Updated Successfully",
      success: true,
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Updating User Quiz Mark",
      success: false,
      error,
    });
  }
});

module.exports = {
  sendOtpEmail,
  updateQuizMark,
  verifyOtpAndUpdate,
  updateUserAvatar,
  sendForgotEmail,
  updateUserInfo,
  verifyOtpAndForgotPassword,
};
