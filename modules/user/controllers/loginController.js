const asyncHandler = require("express-async-handler");
const { getUserByData } = require("../services/userService");
const bcrypt = require("bcrypt");
const { getAdminByData } = require("../services/adminService");
const { createTokens } = require("../utils/authentication/createToken");

const userLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message:
          "Oops! It looks like you forgot to provide some required information. Please provide all necessary Information to proceed.",
        success: false,
      });
    }
    const user = await getUserByData({ email });
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      res.status(401).json({
        message: "Password Doesn't Matched Try Again",
        success: false,
      });
    } else {
      let accessToken;
      if (rememberMe) {
        accessToken = createTokens(user, rememberMe);
      } else {
        accessToken = createTokens(user);
      }

      // Set the access-token in the authorization header
      res.setHeader("Authorization", `Bearer ${accessToken}`);
      return res.status(200).json({
        token: accessToken,
        success: true,
        data: user,
        message: "User logged In successfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "User Logged In  Failed",
      success: false,
      error: error.message,
    });
  }
});

const adminLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message:
          "Oops! It looks like you forgot to provide some required information. Please provide all necessary Information to proceed.",
        success: false,
      });
    }

    const user = await getAdminByData({ email });
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      res.status(401).json({
        message: "Password Doesn't Matched Try Again",
        success: false,
      });
    } else {
      let accessToken;
      if (rememberMe) {
        accessToken = createTokens(user, rememberMe);
      } else {
        accessToken = createTokens(user);
      }

      // Set the access-token in the authorization header
      res.setHeader("Authorization", `Bearer ${accessToken}`);
      return res.status(200).json({
        token: accessToken,
        success: true,
        data: user,
        message: "Admin logged In successfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Admin Logged In  Failed",
      success: false,
      error: error.message,
    });
  }
});

module.exports = { userLogin, adminLogin };
