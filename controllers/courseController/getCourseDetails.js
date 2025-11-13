const Course = require("../../models/course/course.model");
const axios = require("axios");

module.exports = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Load course
    const course = await Course.findOne({ courseId }).lean();
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // Prepare frontend response (no direct videoUrl)
    const response = {
      success: true,
      courseId: course.courseId,
      name: course.name,
      overview: course.overview,
      duration: course.duration,
      price: course.price,

      units: course.units.map((unit) => ({
        unitId: unit.unitId,
        title: unit.title,
        chapters: unit.chapters.map((ch) => ({
          chapterId: ch.chapterId,
          title: ch.title,
          duration: ch.duration,
          isFree: ch.isFree,
          // we give frontend ONLY a safe streaming route
          videoUrl: ch.isFree
            ? `/api/stream/${course.courseId}/${ch.chapterId}`
            : null 
        }))
      }))
    };

    return res.status(200).json(response);

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
