const User = require("../../../models/user/user.model");


module.exports = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!["student", "instructor", "admin", "organization"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    const updated = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ success: false, message: "User not found" });

    res.json({
      success: true,
      message: "Role updated successfully",
      user: updated
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
