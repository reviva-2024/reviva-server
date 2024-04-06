const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const {
  findUserOtp,
  deleteOpt,
  getUserByData,
  updateUser,
  sendOtpToEmail,
  updateUserProfilePicture,
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
  const userOtp = await findUserOtp({ email });
  // Compare hashed OTP
  const optMatched = await bcrypt.compare(otp, userOtp.otp);
  if (!optMatched) {
    return res
      .status(401)
      .json({ message: "Otp Didn't Matched Try Again", success: false });
  }
  if (optMatched) {
    const otpExpiry = userOtp?.expiredAt > Date.now();
    if (!otpExpiry) {
      await deleteOpt({ email });
      return res
        .status(401)
        .json({ message: "Otp Has Been Expired", success: false });
    } else {
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await updateUser({ email }, { password: hashedNewPassword });
      await deleteOpt({ email });
      return res.status(200).json({
        message: "Otp Verified And User Updated SuccessFully",
        success: true,
      });
    }
  }
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const { email } = req;
  try {
    const profilePicturePath = req.files.profilePicture[0].path;
    console.log(profilePicturePath,"path");
    const cloudinaryResponse = await uploadOnCloudinary(profilePicturePath);
    console.log(cloudinaryResponse,"cloudinary response");
    const profilePicture = cloudinaryResponse.secure_url;
    const response = await updateUserProfilePicture({ email, profilePicture });
    console.log(response,"update user res");
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

module.exports = { sendOtpEmail, verifyOtpAndUpdate, updateUserAvatar };
