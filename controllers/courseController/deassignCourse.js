const User = require("../../models/user/user.model");
const Course = require("../../models/course/course.model");

module.exports = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "userId and courseId are required."
      });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    // Find the actual course (to get ObjectId)
    const course = await Course.findOne({ courseId });
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found."
      });
    }

    const courseObjectId = course._id.toString();

    // Check if user has the course
    const hasCourse = user.enrollments.some(
      (e) => e.courseId.toString() === courseObjectId
    );

    if (!hasCourse) {
      return res.status(400).json({
        success: false,
        message: "Course is not assigned to this user."
      });
    }

    // Remove from enrollments
    user.enrollments = user.enrollments.filter(
      (e) => e.courseId.toString() !== courseObjectId
    );

    await user.save();

    return res.json({
      success: true,
      message: "Course de-assigned successfully.",
      remainingCourses: user.enrollments
    });

  } catch (err) {
    console.error("Deassign Course Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error while removing course."
    });
  }
};
