// routes/formRoutes.js
const express = require("express");
const router = express.Router();
const { handleFormSubmission } = require("../controllers/formController");

router.post("/submit", handleFormSubmission);

module.exports = router;
