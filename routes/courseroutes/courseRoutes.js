const express = require("express");
const router = express.Router();
const {
  createCourse,
  updateCourse,
  getAllCourseNames,
  assignTrialCourse,
  getCourseDetails,getMyCourses
} = require("../../controllers/courseController");

router.post("/create", createCourse);
router.put("/update/:courseId", updateCourse);
router.get("/names" ,getAllCourseNames);
router.post("/assign-trial", assignTrialCourse);
router.get("/details/:courseId", getCourseDetails);
router.post("/my-courses", getMyCourses);


module.exports = router;
