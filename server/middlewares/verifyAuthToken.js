const jwt = require("jsonwebtoken");

async function verifyAuthToken(req, res, next) {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication required", loggedIn: false });
    }

    const secretKey = "Pass@34##";

    const decoded = jwt.verify(token, secretKey);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token", loggedIn: false  });
  }
}

module.exports = verifyAuthToken;
