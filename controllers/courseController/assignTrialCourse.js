const Course = require("../../models/course/course.model");
const User = require("../../models/user/user.model");

module.exports = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId)
      return res.status(400).json({ message: "userId and courseId are required" });

    const user = await User.findById(userId);
    const course = await Course.findOne({ courseId });

    if (!user || !course)
      return res.status(404).json({ message: "User or course not found" });

    const already = user.enrollments.find(
      (e) => e.courseId.toString() === course._id.toString()
    );
    if (already)
      return res.status(400).json({ message: "User already has this course" });

    user.enrollments.push({ courseId: course._id, status: "active", progress: 0 });
    await user.save();

    res.json({ message: "Course assigned as trial successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
