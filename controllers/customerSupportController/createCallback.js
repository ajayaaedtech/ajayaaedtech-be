const CustomerSupport = require("../../models/callback/customerSupport.model");

module.exports = async (req, res) => {
  try {
    const { name, phone, email, courseType, message } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: "Name, phone, and email are required."
      });
    }

    const newRequest = await CustomerSupport.create({
      name,
      phone,
      email,
      courseType,
      message
    });

    res.status(201).json({
      success: true,
      message: "Callback request submitted successfully.",
      requestId: newRequest._id
    });

  } catch (err) {
    console.error("Callback Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error while creating callback request."
    });
  }
};
