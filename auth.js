const User = require("./models/user");
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  // Ensure req.cookies exists and extract the token
  const token = req.cookies ? req.cookies.token : null;
  console.log(token);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "User is not authenticated",
    });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = isAuthenticated;
