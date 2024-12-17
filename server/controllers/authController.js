const jwt = require("jsonwebtoken");
const user = require("../models/user");

async function verifyToken(req, res) {
  const { userId } = req.body;
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided", loggedIn: false });
    }

    const secretKey = "Pass@34##";
    const decoded = jwt.verify(token, secretKey);
    console.log("Decoded token:", decoded);

    if (decoded.userId !== userId) {
      return res
        .status(403)
        .json({ message: "Invalid token or user", loggedIn: false });
    }
    const existingUser = await user.findById(decoded.userId);
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not found", loggedIn: false });
    }

    res.status(200).json({ message: "User authenticated", loggedIn: true });
  } catch (error) {
    console.error("Error during token verification:", error);
    res
      .status(403)
      .json({ message: "Invalid or expired token", loggedIn: false });
  }
}

module.exports = verifyToken;
