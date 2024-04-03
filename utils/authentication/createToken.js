const { sign } = require("jsonwebtoken");
require("dotenv").config();

const createTokens = (user,rememberMe) => {
  const { email, _id } = user;
  const accessToken = sign(
    { email: email, userId: _id },
    process.env.JWT_SECRET,
    { expiresIn: rememberMe?"7d":"5h" }
  );

  return accessToken;
};

module.exports = { createTokens };
