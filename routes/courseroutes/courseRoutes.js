const express = require("express");
const router = express.Router();
const {
  createCourse,
  updateCourse,
  getAllCourseNames,
  assignTrialCourse,
  getCourseDetails,getMyCourses
} = require("../../controllers/courseController");
const verifyToken = require("../../middleware/verifyToken");
const deassignCourse = require("../../controllers/courseController/deassignCourse");
router.post("/create", createCourse);
router.put("/update/:courseId", updateCourse);
router.get("/names" ,getAllCourseNames);
router.post("/assign-trial", assignTrialCourse);
router.get("/details/:courseId", getCourseDetails);
router.post("/my-courses",verifyToken, getMyCourses);
router.post("/deassign-course",verifyToken, deassignCourse);
module.exports = router;
