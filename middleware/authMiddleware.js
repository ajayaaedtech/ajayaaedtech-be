const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Token missing.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // make userId available in controllers
    next();

  } catch (err) {
    console.error("Auth Middleware:", err.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};
