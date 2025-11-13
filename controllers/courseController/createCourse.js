const Course = require("../../models/course/course.model");

module.exports = async (req, res) => {
  try {
    const { courseId, name, slug } = req.body;

    if (!courseId || !name || !slug)
      return res.status(400).json({ message: "courseId, name, and slug required" });

    const existing = await Course.findOne({ courseId });
    if (existing)
      return res.status(400).json({ message: "Course already exists" });

    const course = await Course.create(req.body);
    res.status(201).json({ message: "Course created successfully", course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
