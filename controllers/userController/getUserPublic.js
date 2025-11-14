const User = require("../../models/user/user.model");

module.exports = async (req, res) => {
  try {
    const { email, phone } = req.body;

    if (!email && !phone) {
      return res.status(400).json({
        success: false,
        message: "Please provide email or phone number."
      });
    }

    // Build query dynamically
    let query = {};
    if (email) query.email = email.toLowerCase().trim();
    if (phone) query.phone = phone.trim();

    // Fetch user but exclude _id and password
    const user = await User.findOne(query)
      .select(" name email phone profilePic  status  createdAt");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    res.status(200).json({
      success: true,
      message: "User details fetched successfully.",
      user
    });

  } catch (err) {
    console.error("getUserPublic error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching user details."
    });
  }
};
