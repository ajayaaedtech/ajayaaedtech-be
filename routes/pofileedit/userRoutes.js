const express = require("express");
const router = express.Router();

const updateProfile = require("../../controllers/userController/updateProfile");
const getUserPublic = require("../../controllers/userController/getUserPublic");

router.patch("/update-profile", updateProfile);  
// New route
router.post("/public-user", getUserPublic);

module.exports = router;
