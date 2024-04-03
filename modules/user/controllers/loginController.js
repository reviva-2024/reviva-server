const asyncHandler = require("express-async-handler");
const { getUserByData } = require("../userService");
const bcrypt = require("bcrypt");

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
    }else{
      
    }
  } catch (error) {
    res.status(400).json({
      message: "User Logged In  Failed",
      success: false,
      error: error.message,
    });
  }
});

module.exports = { userLoginController };
