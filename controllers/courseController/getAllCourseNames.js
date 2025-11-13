const Course = require("../../models/course/course.model");

module.exports = async (req, res) => {
  try {
    // Fetching limited fields for lightweight listing cards or dropdowns
    const courses = await Course.find({}, "courseId name slug price overview");

    res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      count: courses.length,
      courses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: err.message,
    });
  }
};
