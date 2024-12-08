const bcrypt = require("bcrypt");

const user = require("../models/user");

async function handleSignup(req, res) {
  const { email, password } = req.body;

  const existingUser = await user.findOne({ email });

  if (existingUser) {
    console.log("User already exists!")
    res.status(400).send("User already exists!");
  } else {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await user.insertMany([{ email, password: hashedPassword }]);
    res.status(200).send("Success signup!");
  }
}

module.exports = {
  handleSignup,
};
