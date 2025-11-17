const User = require("../../../models/user/user.model");

module.exports = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || query.trim() === "") {
      return res.status(200).json({ users: [] });
    }

    const regex = new RegExp(query, "i"); // case-insensitive search

    const users = await User.find({
      $or: [{ name: regex }, { email: regex }, { phone: regex }]
    })
      .select("name email phone role status profilePic")
      .limit(20);

    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Search failed" });
  }
};
