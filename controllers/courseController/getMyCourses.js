const User = require("../../models/user/user.model");

module.exports = async (req, res) => {
  try {
    const { type, value } = req.body; // type = "email" | "userId" | "phone"

    if (!type || !value) {
      return res.status(400).json({
        success: false,
        message: "Please provide both 'type' and 'value' (email, userId, or phone).",
      });
    }

    // Build dynamic search query
    let query = {};
    if (type === "userId") {
      query._id = value;
    } else if (type === "email") {
      query.email = value.toLowerCase().trim();
    } else if (type === "phone") {
      query.phone = value.trim();
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid type. Must be one of: userId, email, phone.",
      });
    }

    // Fetch user and populate course details
    const user = await User.findOne(query)
      .populate({
        path: "enrollments.courseId",
        select: "courseId name slug price overview duration",
      })
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with given details.",
      });
    }

    // Format enrolled course data
    const courses = user.enrollments.map((enroll) => {
      const course = enroll.courseId;
      return {
        courseId: course?.courseId,
        name: course?.name,
        slug: course?.slug,
        price: course?.price,
        overview: course?.overview,
        duration: course?.duration,
        progress: enroll.progress,
        status: enroll.status,
        enrolledAt: enroll.enrolledAt,
      };
    });

    res.status(200).json({
      success: true,
      message: "Courses fetched successfully.",
      searchBy: type,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      totalCourses: courses.length,
      courses,
    });
  } catch (err) {
    console.error("getMyCoursesSmart Error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};
