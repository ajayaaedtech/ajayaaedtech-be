const User = require("../../models/user/user.model");

module.exports = async (req, res) => {
  try {
    const { email, newName } = req.body;

    if (!email)
      return res.status(400).json({
        success: false,
        message: "Email is required."
      });

    if (!newName)
      return res.status(400).json({
        success: false,
        message: "newName is required."
      });

    // Sanitize email
    const cleanEmail = email.toLowerCase().trim();

    // Update user name
    const updatedUser = await User.findOneAndUpdate(
      { email: cleanEmail },
      { $set: { name: newName.trim() } },
      { new: true, runValidators: true }
    ).select("name email status");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "No user found with this email."
      });
    }

    res.status(200).json({
      success: true,
      message: "Name updated successfully.",
      user: updatedUser
    });

  } catch (err) {
    console.error("updateProfile error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error while updating profile."
    });
  }
};
