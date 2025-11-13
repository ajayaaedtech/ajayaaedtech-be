const Course = require("../../models/course/course.model");

module.exports = async (req, res) => {
  try {
    const { courseId } = req.params;
    const updates = req.body;

    const course = await Course.findOneAndUpdate({ courseId }, updates, {
      new: true,
      runValidators: true,
    });

    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json({ message: "Course updated successfully", course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
