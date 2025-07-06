// routes/formRoutes.js
const express = require("express");
const router = express.Router();
const { handleFormSubmission, handleStudentRegistration } = require("../controllers/formController");
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
// 



/**
 * @swagger
 * /api/form/register:
 *   post:
 *     summary: Register a new student and send confirmation email
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
 *               phone:
 *                 type: string
 *               college:
 *                 type: string
 *               course:
 *                 type: string
 *               dob:
 *                 type: string
 *                 format: date
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registration successful and email sent
 *       500:
 *         description: Internal server error
 */
router.post("/register", handleStudentRegistration);

module.exports = router;
