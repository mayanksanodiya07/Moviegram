const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const user = require("../models/user");

async function handleLogin(req, res) {
    const { email, password } = req.body;
    try {
      const existingUser = await user.findOne({ email });
  
      if (!existingUser) {
        return res.status(404).json({ message: "User does not exist." });
      }

      const isPasswordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordMatch) {
        return res.status(401).json({ message: "Incorrect password." });
      }
  
      await user.findByIdAndUpdate(existingUser._id, {
        lastUpdate: Date.now(),
      });
  
      const secretkey = "Pass@34##";
      const token = jwt.sign({ userId: existingUser._id }, secretkey);
  
      // Set the token as an HTTP-only cookie
      res.cookie("authToken", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 60 * 60 * 1000,
      });
      res.status(200).json({
        message: "Logged in successfully",
        user: existingUser,
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "An error occurred during login." });
    }
  }

  
module.exports = {
    handleLogin,
  };