module.exports = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access only."
      });
    }
    next();
  } catch (err) {
    return res.status(403).json({ message: "Unauthorized" });
  }
};
