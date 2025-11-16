const User = require("../../../models/user/user.model");

module.exports = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = {};
    const allowedFields = ["name", "email", "phone", "role", "status", "profilePic"];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // email lowercase
    if (updates.email) {
      updates.email = updates.email.toLowerCase().trim();
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true }
    ).select("-password -enrollments");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "User updated successfully",
      user: updatedUser
    });

  } catch (err) {
    console.error("Edit User Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while updating user"
    });
  }
};
