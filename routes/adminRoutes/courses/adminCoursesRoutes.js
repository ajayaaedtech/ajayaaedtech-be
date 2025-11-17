const express = require("express");
const router = express.Router();
const {
    createCourse,
    updateCourseInfo,
    deleteCourse,
    deleteUnit,
    deleteChapter, getAllCourses, addUnit, updateUnit, updateChapter, addChapter , getAdminStats
} = require("../../../controllers/adminController/course/cousecontroller");
// Get All Courses
router.get("/all", getAllCourses);
router.get("/count", getAdminStats);
// Create
router.post("/course/create", createCourse);
// Update
router.put("/course/update/:courseId", updateCourseInfo);
// Delete Course
router.delete("/course/delete/:courseId", deleteCourse);
// Delete Unit
router.delete("/course/:courseId/unit/:unitId", deleteUnit);
// Delete Chapter
router.delete("/course/:courseId/unit/:unitId/chapter/:chapterId", deleteChapter);
// 
router.post("/:courseId/unit/add", addUnit);
router.put("/:courseId/unit/:unitId/update", updateUnit);
router.post("/:courseId/unit/:unitId/chapter/add", addChapter);
router.put("/:courseId/unit/:unitId/chapter/:chapterId/update", updateChapter);
module.exports = router;