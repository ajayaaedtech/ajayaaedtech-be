const User = require("../../models/user/user.model");

module.exports = async (req, res) => {
  try {
    const { userId } = req.params;
    const { phone, email } = req.body;

    const updated = await User.findByIdAndUpdate(
      userId,
      {
        ...(phone && { phone }),
        ...(email && { email: email.toLowerCase().trim() })
      },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ success: false, message: "User not found" });

    res.json({
      success: true,
      message: "User data updated successfully",
      user: updated
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
