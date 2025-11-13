const axios = require("axios");
const Course = require("../models/course/course.model");

module.exports = async (req, res) => {
    try {
        const { courseId, unitId, chapterId } = req.params;

        // 1. Find course
        const course = await Course.findOne({ courseId });

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        // 2. Find unit
        const unit = course.units.find(u => u.unitId === unitId);

        if (!unit) {
            return res.status(404).json({ success: false, message: "Unit not found" });
        }

        // 3. Find chapter
        const chapter = unit.chapters.find(ch => ch.chapterId === chapterId);

        if (!chapter) {
            return res.status(404).json({ success: false, message: "Chapter not found" });
        }

        // 4. Get the real video URL
        const videoUrl = chapter.videoUrl;

        if (!videoUrl) {
            return res.status(404).json({ success: false, message: "Video URL missing" });
        }

        // 5. Stream the video
        const response = await axios({
            url: videoUrl,
            method: "GET",
            responseType: "stream",
        });

        // res.setHeader("Content-Type", "video/mp4");
        res.setHeader("Content-Type", "video/mp4");
        res.setHeader("Cache-Control", "no-store");
        res.removeHeader("Content-Length");
        res.removeHeader("Content-Disposition");
        res.setHeader("Accept-Ranges", "none");

        response.data.pipe(res);

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};
