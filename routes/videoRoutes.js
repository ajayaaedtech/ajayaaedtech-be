const router = require("express").Router();
const streamVideo = require("../controllers/videoController");

router.get("/stream/:courseId/:unitId/:chapterId", streamVideo);

module.exports = router;
