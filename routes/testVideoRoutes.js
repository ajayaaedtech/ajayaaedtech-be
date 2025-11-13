// testvideocontroller/routes/testVideoRoutes.js
const router = require("express").Router();
const { issueToken, streamVideo } = require("../controllers/testVideoController");
const verifyToken = require("../middleware/verifyToken");

router.post("/token", issueToken); // returns short-lived token for demo
router.get("/stream/", verifyToken, streamVideo);

module.exports = router;
