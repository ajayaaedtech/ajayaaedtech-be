const User = require("../../../models/user/user.model");


module.exports = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    if (!["active", "blocked", "pending"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const updated = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ success: false, message: "User not found" });

    res.json({
      success: true,
      message: "Status updated successfully",
      user: updated
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


module.exports = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    if (!["active", "blocked", "pending"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const updated = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ success: false, message: "User not found" });

    res.json({
      success: true,
      message: "Status updated successfully",
      user: updated
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
