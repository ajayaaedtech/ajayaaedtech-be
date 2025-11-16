const User = require("../../../models/user/user.model");

module.exports = async (req, res) => {
  try {
    const { userId } = req.params;

    const deleted = await User.findByIdAndDelete(userId);

    if (!deleted)
      return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
