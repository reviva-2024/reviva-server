const { verify } = require("jsonwebtoken");
require("dotenv").config();

const verifyUser = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization header is missing" });
  }
  // Extract the token from the authorization header
  const accessToken = authorization.split(" ")[1];

  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" });

  try {
    const decodedToken = verify(accessToken, process.env.JWT_SECRET);
    if (decodedToken) {
      const { email, userId } = decodedToken;
      req.authenticated = true;
      req.email = email; // Add email to the request object
      req.userId = userId; // Add userId to the request object

      return next();
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { verifyUser };