const User = require("../models/users");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

//signup
const signUpUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(401).json({ massage: "use already exist" });

    const user = new User({ username, password });
    await user.save();
    return res.status(200).json({ message: "user saved sccuessfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "invalid username" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "invalid username or password" });

    const token = jwt.sign({ id: user._id, username: user.username }, SECRET, {
      expiresIn: "15m",
    });
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const logoutUser = (req, res) => {
  // Just a convenience message for client
  return res.status(200).json({
    message:
      "Logged out successfully. Please delete your token from client-side.",
  });
};

module.exports = { signUpUser, login, logoutUser };
