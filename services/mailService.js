const nodemailer = require("nodemailer");

exports.sendMail = async (formData) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"AjayaEdTech Contact" <${process.env.GMAIL_USER}>`,
        to: "info@ajayaaedtech.com",
        subject: "New Inquiry from Website",
        html: `
  <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; border: 1px solid #004EA5; border-radius: 10px; overflow: hidden;">
    <div style="background-color: #004EA5; padding: 20px; text-align: center;">
      <img src="https://www.ajayaaedtech.com/_next/image?url=%2Fb.png&w=128&q=75" alt="AjayaEdTech" style="height: 60px; margin-bottom: 10px;" />
      <h2 style="color: white; margin: 0;">New Website Inquiry</h2>
    </div>
    <div style="padding: 20px; background-color: #F5F8FF;">
      <p style="font-size: 16px; color: #01319E;"><strong>Name:</strong> ${formData.name}</p>
      <p style="font-size: 16px; color: #01319E;"><strong>Email:</strong> ${formData.email}</p>
      <p style="font-size: 16px; color: #01319E;"><strong>Message:</strong></p>
      <p style="font-size: 15px; color: #333; background-color: #ffffff; padding: 12px; border-left: 4px solid #5598B5; border-radius: 6px;">
        ${formData.message}
      </p>
    </div>
    <div style="background-color: #01319E; color: white; padding: 15px; text-align: center;">
      <p style="margin: 0;">AjayaEdTech | <a href="https://ajayaaedtech.com" style="color: #FFD700;">Visit Website</a></p>
    </div>
  </div>
  `,
    };


    await transporter.sendMail(mailOptions);
};
