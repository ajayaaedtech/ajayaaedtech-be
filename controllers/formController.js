// controllers/formController.js
const { sendMail, sendStudentRegistrationEmail } = require("../services/mailService");

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

exports.handleStudentRegistration = async (req, res) => {
  try {
    const studentData = req.body;
    
    // Validate required fields
    if (!studentData.name || !studentData.email || !studentData.phone || !studentData.course) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await sendStudentRegistrationEmail(studentData);
    
    res.status(200).json({ 
      message: "Registration successful! Confirmation email has been sent.",
      data: studentData
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Registration failed. Please try again later." });
  }
};