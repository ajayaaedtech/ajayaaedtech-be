const Course = require("../../../models/course/course.model");


// GET ALL COURSES
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).json({
      message: "Courses fetched successfully",
      courses,
    });
  } catch (error) {
    console.error("Fetch Courses Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// create 
exports.createCourse = async (req, res) => {
  try {
    const { courseId, name, slug, duration, overview, price, language, tags, order, units } = req.body;

    const exists = await Course.findOne({ courseId });
    if (exists) {
      return res.status(400).json({ message: "Course ID already exists." });
    }

    const course = new Course({
      courseId,
      name,
      slug,
      duration,
      overview,
      price,
      language,
      tags,
      order,
      units,
    });

    await course.save();

    res.status(201).json({
      message: "Course created successfully.",
      course,
    });
  } catch (error) {
    console.error("Create Course Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// 🌿 2. UPDATE ONLY COURSE INFO (NOT UNITS/CHAPTERS)
exports.updateCourseInfo = async (req, res) => {
  try {
    const { courseId } = req.params;

    const allowedFields = [
      "name",
      "slug",
      "duration",
      "overview",
      "price",
      "language",
      "tags",
      "order",
    ];

    let updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    updateData.updatedAt = new Date();

    const updated = await Course.findOneAndUpdate(
      { courseId },
      { $set: updateData },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.status(200).json({
      message: "Course updated successfully.",
      course: updated,
    });
  } catch (error) {
    console.error("Update Course Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
// 🌿 3. DELETE COURSE
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const deleted = await Course.findOneAndDelete({ courseId });

    if (!deleted) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.status(200).json({
      message: "Course deleted successfully.",
      course: deleted,
    });
  } catch (error) {
    console.error("Delete Course Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// 🌿 4. DELETE UNIT FROM COURSE

exports.deleteUnit = async (req, res) => {
  try {
    const { courseId, unitId } = req.params;

    const course = await Course.findOne({ courseId });
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    course.units = course.units.filter((u) => u.unitId !== unitId);
    await course.save();

    res.status(200).json({
      message: "Unit deleted successfully.",
      course,
    });
  } catch (error) {
    console.error("Delete Unit Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// 🌿 5. DELETE CHAPTER FROM UNIT

exports.deleteChapter = async (req, res) => {
  try {
    const { courseId, unitId, chapterId } = req.params;

    const course = await Course.findOne({ courseId });
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    const unit = course.units.find((u) => u.unitId === unitId);
    if (!unit) {
      return res.status(404).json({ message: "Unit not found." });
    }

    unit.chapters = unit.chapters.filter((c) => c.chapterId !== chapterId);

    await course.save();

    res.status(200).json({
      message: "Chapter deleted successfully.",
      course,
    });
  } catch (error) {
    console.error("Delete Chapter Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// add units
exports.addUnit = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { unitId, title, order, chapters } = req.body;

    const course = await Course.findOne({ courseId });
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.units.push({
      unitId,
      title,
      order,
      chapters: chapters || [],
    });

    await course.save();

    res.status(201).json({
      message: "Unit added successfully",
      course,
    });
  } catch (error) {
    console.log("Add Unit Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🌿 2. UPDATE UNIT
exports.updateUnit = async (req, res) => {
  try {
    const { courseId, unitId } = req.params;

    const course = await Course.findOne({ courseId });
    if (!course) return res.status(404).json({ message: "Course not found" });

    const unit = course.units.find((u) => u.unitId === unitId);
    if (!unit) return res.status(404).json({ message: "Unit not found" });

    const { title, order } = req.body;

    if (title !== undefined) unit.title = title;
    if (order !== undefined) unit.order = order;

    await course.save();

    res.status(200).json({
      message: "Unit updated successfully",
      course,
    });
  } catch (error) {
    console.log("Update Unit Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// 🌿 3. ADD CHAPTER to a Unit
exports.addChapter = async (req, res) => {
  try {
    const { courseId, unitId } = req.params;
    const { chapterId, title, videoUrl, order, duration, isFree } = req.body;

    const course = await Course.findOne({ courseId });
    if (!course) return res.status(404).json({ message: "Course not found" });

    const unit = course.units.find((u) => u.unitId === unitId);
    if (!unit) return res.status(404).json({ message: "Unit not found" });

    unit.chapters.push({
      chapterId,
      title,
      videoUrl,
      order,
      duration,
      isFree,
    });

    await course.save();

    res.status(201).json({
      message: "Chapter added successfully",
      course,
    });
  } catch (error) {
    console.log("Add Chapter Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🌿 4. UPDATE CHAPTER
exports.updateChapter = async (req, res) => {
  try {
    const { courseId, unitId, chapterId } = req.params;

    const course = await Course.findOne({ courseId });
    if (!course) return res.status(404).json({ message: "Course not found" });

    const unit = course.units.find((u) => u.unitId === unitId);
    if (!unit) return res.status(404).json({ message: "Unit not found" });

    const chapter = unit.chapters.find((c) => c.chapterId === chapterId);
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    const { title, videoUrl, order, duration, isFree } = req.body;

    if (title !== undefined) chapter.title = title;
    if (videoUrl !== undefined) chapter.videoUrl = videoUrl;
    if (order !== undefined) chapter.order = order;
    if (duration !== undefined) chapter.duration = duration;
    if (isFree !== undefined) chapter.isFree = isFree;

    await course.save();

    res.status(200).json({
      message: "Chapter updated successfully",
      course,
    });
  } catch (error) {
    console.log("Update Chapter Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// calculate user and course
const User = require("../../../models/user/user.model");


exports.getAdminStats = async (req, res) => {
  try {
    // Total Users
    const totalUsers = await User.countDocuments();

    // Total Courses
    const totalCourses = await Course.countDocuments();

    // Total Enrollments (sum of all enrollments array lengths)
    const totalEnrollments = await User.aggregate([
      { $project: { enrollCount: { $size: "$enrollments" } } },
      { $group: { _id: null, total: { $sum: "$enrollCount" } } }
    ]);

    const totalEnrolledCourses =
      totalEnrollments.length > 0 ? totalEnrollments[0].total : 0;

    return res.status(200).json({
      success: true,
      message: "Admin Stats Retrieved Successfully",
      data: {
        totalUsers,
        totalCourses,
        totalEnrolledCourses
      },
    });
  } catch (error) {
    console.error("Admin Stats Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error While Fetching Admin Stats",
    });
  }
};
