const jwt = require("jsonwebtoken");

async function verifyAuthToken(req, res, next) {
  const token = req.cookies.authToken; // Access the cookie
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const secretKey = "Pass@34##";
    const decoded = jwt.verify(token, secretKey); // Verify the token
    req.user = decoded; // Attach decoded user info to the request
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}
