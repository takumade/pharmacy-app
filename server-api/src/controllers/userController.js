const User = require("../models/userModel");

const userRegister = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    let user = User.create({
      username,
      email,
      phoneNumber: phone,
      password,
    });

    delete user.password;

    res.send({
      success: true,
      message: "User Created",
      data: user,
    });
  } catch (err) {
    res.send({
      success: false,
      message: "Could not create user",
      data: err,
    });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Check if password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please verify your email before logging in",
        });
    }

    // Generate auth token
    const token = user.generateAuthToken();

    res.status(200).json({ success: true, data: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  userRegister,
  userLogin,
};
