const User = require("../../../models/user/user.model");

module.exports = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const skip = (page - 1) * limit;

    // Fetch users BUT exclude _id and enrollments
    const users = await User.find({})
      .select("name email phone role status profilePic createdAt") // 🔥 remove -_id
      .skip(skip)
      .limit(limit)
      .lean();


    const totalUsers = await User.countDocuments();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      page,
      limit,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      users
    });

  } catch (err) {
    console.error("Pagination Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching users"
    });
  }
};
