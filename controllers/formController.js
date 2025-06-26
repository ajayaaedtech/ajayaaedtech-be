// controllers/formController.js
const { sendMail } = require("../services/mailService");

exports.handleFormSubmission = async (req, res) => {
  try {
    const formData = req.body;
    await sendMail(formData);
    res.status(200).json({ message: "Form submitted and email sent!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};
