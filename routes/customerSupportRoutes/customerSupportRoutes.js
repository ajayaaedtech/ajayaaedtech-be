const express = require("express");
const router = express.Router();

const createCallback = require("../../controllers/customerSupportController/createCallback");

router.post("/request", createCallback);

module.exports = router;
