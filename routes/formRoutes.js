// routes/formRoutes.js
const express = require("express");
const router = express.Router();
const { handleFormSubmission } = require("../controllers/formController");
/**
 * @swagger
 * /api/form/submit:
 *   post:
 *     summary: Submit the contact form and send email
 *     tags: [Form]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       500:
 *         description: Internal server error
 */

router.post("/submit", handleFormSubmission);

module.exports = router;
