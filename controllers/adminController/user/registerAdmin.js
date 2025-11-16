const Admin = require("../../../models/admin/admin.model");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const exists = await Admin.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Admin already exists" });

    const hashed = await bcrypt.hash(password, 12);

    const admin = await Admin.create({
      name,
      email,
      password: hashed,
    });

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin: {
        name: admin.name,
        email: admin.email,
        role: admin.role,
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
