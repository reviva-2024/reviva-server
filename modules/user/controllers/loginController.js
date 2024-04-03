const asyncHandler = require("express-async-handler");
const { getUserByData } = require("../services/userService");
const bcrypt = require("bcrypt");
const { createTokens } = require("../../../utils/authentication/createToken");
const { getAdminByData } = require("../services/adminService");

const userLoginController = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByData({ username });
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      res.status(401).json({
        message: "Password Doesn't Matched Try Again",
        success: false,
      });
    } else {
      const accessToken = createTokens(user);

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

const adminLoginController = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await getAdminByData({ username });
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      res.status(401).json({
        message: "Password Doesn't Matched Try Again",
        success: false,
      });
    } else {
      const accessToken = createTokens(user);

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

module.exports = { userLoginController, adminLoginController };
