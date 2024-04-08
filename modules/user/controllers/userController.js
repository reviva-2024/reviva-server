const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const {
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
  if (!email) {
    return res.status(400).json({
      message:
        "Required information is missing. Please provide all necessary details to proceed",
      success: false,
    });
  }
  try {
    const otp = await sendOtpToEmail(email);
    res.status(200).json({
      message: "Otp Successfully Sended To Email",
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
  const { email } = req;
  const { otp, oldPassword, newPassword } = req.body;
  if (!otp || !oldPassword || !newPassword) {
    return res.status(400).json({
      message:
        "Required information is missing. Please provide all necessary details to proceed",
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
    if (!profilePicturePath) {
      return res.status(400).json({
        message:
          "Required information is missing. Please provide all necessary details to proceed",
        success: false,
      });
    }
    const cloudinaryResponse = await uploadOnCloudinary(profilePicturePath);
    const profilePicture = cloudinaryResponse.secure_url;
    const response = await updateUserProfilePicture({ email, profilePicture });
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
  if (!email) {
    return res.status(400).json({
      message:
        "Required information is missing. Please provide all necessary details to proceed",
      success: false,
    });
  }
  try {
    const user = await getUserByData({ email });
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
    const sendOtp = await sendOtpToEmail(email);
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
        "Required information is missing. Please provide all necessary details to proceed",
      success: false,
    });
  }
  const user = await getUserByData({ email });
  const optMatched = await verifyOtp({ email, otp });
  if (!optMatched) {
    return res
      .status(401)
      .json({ message: "Otp Didn't Matched Try Again", success: false });
  }
  if (optMatched) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await updateUser({ email }, { password: hashedPassword });
    await deleteOpt({ email });
    return res.status(200).json({
      message: "Otp Verified And User Updated SuccessFully",
      success: true,
    });
  }
});

module.exports = {
  sendOtpEmail,
  verifyOtpAndUpdate,
  updateUserAvatar,
  sendForgotEmail,
  verifyOtpAndForgotPassword,
};
