const User = require("../models/User");
const jwt = require("jsonwebtoken");
 
// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};
 
// REGISTER
exports.register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = generateToken(user);
 
    res.status(201).json({
      success: true,
      token
    });
  } catch (error) {
    next(error);
  }
};
 
// LOGIN
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
 
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }
 
    const token = generateToken(user);
 
    res.json({
      success: true,
      token
    });
  } catch (error) {
    next(error);
  }
};
 
// Get User Details
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
 
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
 
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};
 