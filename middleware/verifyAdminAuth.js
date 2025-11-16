const jwt = require("jsonwebtoken");
const Admin = require("../models/admin/admin.model");

module.exports = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer "))
      return res.status(401).json({ message: "Token missing" });

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id);

    if (!admin)
      return res.status(401).json({ message: "Admin not found" });

    // 🔥 Only allow if token matches DB stored token
    if (admin.activeToken !== token) {
      return res.status(401).json({
        message: "This session expired. Another login detected."
      });
    }

    req.admin = admin;
    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
