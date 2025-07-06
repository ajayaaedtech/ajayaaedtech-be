// services/mailService.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

exports.sendMail = async (formData) => {
  const mailOptions = {
    from: `"AjayaEdTech Contact" <${process.env.GMAIL_USER}>`,
    to: "info@ajayaaedtech.com",
    subject: "New Inquiry from Website",
    html: `
      <div style="max-width:600px;margin:auto;border:1px solid #e1e8ed;border-radius:12px;overflow:hidden;font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background:linear-gradient(135deg, #004EA5 0%, #01319E 100%);padding:30px 20px;text-align:center;">
          <div style="background:white;border-radius:12px;display:inline-block;padding:12px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
            <img src="https://www.ajayaaedtech.com/_next/image?url=%2Fb.png&w=128&q=75" alt="AjayaEdTech" style="height:60px;" />
          </div>
          <h2 style="color:white;margin:20px 0 10px;font-weight:600;font-size:24px;">New Website Inquiry</h2>
          <p style="color:rgba(255,255,255,0.8);margin:0;font-size:14px;">You've received a new contact form submission</p>
        </div>

        <!-- Card Body -->
        <div style="padding:30px;background-color:#f9fbfd;">
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(250px, 1fr));gap:16px;margin-bottom:20px;">
            <div style="background:#fff;padding:20px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.04);border-left:4px solid #004EA5;">
              <p style="margin:0 0 8px 0;color:#64748b;font-size:14px;font-weight:600;">Name</p>
              <p style="margin:0;color:#1e293b;font-size:16px;font-weight:500;">${formData.name}</p>
            </div>

            <div style="background:#fff;padding:20px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.04);border-left:4px solid #004EA5;">
              <p style="margin:0 0 8px 0;color:#64748b;font-size:14px;font-weight:600;">Email</p>
              <p style="margin:0;color:#1e293b;font-size:16px;font-weight:500;">${formData.email}</p>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(250px, 1fr));gap:16px;margin-bottom:20px;">
            <div style="background:#fff;padding:20px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.04);border-left:4px solid #004EA5;">
              <p style="margin:0 0 8px 0;color:#64748b;font-size:14px;font-weight:600;">Phone</p>
              <p style="margin:0;color:#1e293b;font-size:16px;font-weight:500;">${formData.phone || 'N/A'}</p>
            </div>

            <div style="background:#fff;padding:20px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.04);border-left:4px solid #004EA5;">
              <p style="margin:0 0 8px 0;color:#64748b;font-size:14px;font-weight:600;">Message</p>
              <p style="margin:0;color:#1e293b;font-size:16px;font-weight:500;">${formData.message || 'N/A'}</p>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color:#01319E;color:white;text-align:center;padding:20px;">
          <p style="margin:0;font-size:14px;">
            <a href="https://ajayaaedtech.com" style="color:#FFD700;text-decoration:none;font-weight:500;">Visit Our Website</a>
            <span style="margin:0 10px;color:rgba(255,255,255,0.3);">|</span>
            <a href="mailto:info@ajayaaedtech.com" style="color:#FFD700;text-decoration:none;font-weight:500;">Contact Support</a>
          </p>
          <p style="margin:15px 0 0 0;font-size:12px;color:rgba(255,255,255,0.6);">© ${new Date().getFullYear()} AjayaEdTech. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

exports.sendStudentRegistrationEmail = async (studentData) => {
  // Email to admin
  const adminMailOptions = {
    from: `"AjayaEdTech Registration" <${process.env.GMAIL_USER}>`,
    to: "info@ajayaaedtech.com",
    subject: "New Student Registration",
    html: generateStudentRegistrationEmail(studentData, false)
  };

  // Email to student
  const studentMailOptions = {
    from: `"AjayaEdTech Registration" <${process.env.GMAIL_USER}>`,
    to: studentData.email,
    subject: "Registration Confirmation",
    html: generateStudentRegistrationEmail(studentData, true)
  };

  await transporter.sendMail(adminMailOptions);
  await transporter.sendMail(studentMailOptions);
};

function generateStudentRegistrationEmail(studentData, isStudentCopy) {
  const title = isStudentCopy 
    ? "Thank you for registering with AjayaEdTech!" 
    : "New Student Registration Received";
  
  const intro = isStudentCopy
    ? `Dear ${studentData.name},<br><br>Thank you for registering with AjayaEdTech. We're excited to have you on board! Below are your registration details:`
    : "A new student has registered with AjayaEdTech. Here are the details:";

  return `
    <div style="max-width:600px;margin:auto;border:1px solid #e1e8ed;border-radius:12px;overflow:hidden;font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
      <!-- Header -->
      <div style="background:linear-gradient(135deg, #004EA5 0%, #01319E 100%);padding:30px 20px;text-align:center;">
        <div style="background:white;border-radius:12px;display:inline-block;padding:12px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
          <img src="https://www.ajayaaedtech.com/_next/image?url=%2Fb.png&w=128&q=75" alt="AjayaEdTech" style="height:60px;" />
        </div>
        <h2 style="color:white;margin:20px 0 10px;font-weight:600;font-size:24px;">${title}</h2>
        <p style="color:rgba(255,255,255,0.8);margin:0;font-size:14px;">${isStudentCopy ? 'Your registration is confirmed' : 'New student registration'}</p>
      </div>

      <!-- Card Body -->
      <div style="padding:30px;background-color:#f9fbfd;">
        <p style="margin:0 0 20px 0;color:#1e293b;font-size:16px;line-height:1.6;">${intro}</p>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(250px, 1fr));gap:16px;margin-bottom:20px;">
          <div style="background:#fff;padding:20px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.04);border-left:4px solid #004EA5;">
            <p style="margin:0 0 8px 0;color:#64748b;font-size:14px;font-weight:600;">Full Name</p>
            <p style="margin:0;color:#1e293b;font-size:16px;font-weight:500;">${studentData.name}</p>
          </div>

          <div style="background:#fff;padding:20px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.04);border-left:4px solid #004EA5;">
            <p style="margin:0 0 8px 0;color:#64748b;font-size:14px;font-weight:600;">Email Address</p>
            <p style="margin:0;color:#1e293b;font-size:16px;font-weight:500;">${studentData.email}</p>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(250px, 1fr));gap:16px;margin-bottom:20px;">
          <div style="background:#fff;padding:20px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.04);border-left:4px solid #004EA5;">
            <p style="margin:0 0 8px 0;color:#64748b;font-size:14px;font-weight:600;">Phone Number</p>
            <p style="margin:0;color:#1e293b;font-size:16px;font-weight:500;">${studentData.phone}</p>
          </div>

          <div style="background:#fff;padding:20px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.04);border-left:4px solid #004EA5;">
            <p style="margin:0 0 8px 0;color:#64748b;font-size:14px;font-weight:600;">Date of Birth</p>
            <p style="margin:0;color:#1e293b;font-size:16px;font-weight:500;">${studentData.dob}</p>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(250px, 1fr));gap:16px;margin-bottom:20px;">
          <div style="background:#fff;padding:20px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.04);border-left:4px solid #004EA5;">
            <p style="margin:0 0 8px 0;color:#64748b;font-size:14px;font-weight:600;">College/Institution</p>
            <p style="margin:0;color:#1e293b;font-size:16px;font-weight:500;">${studentData.college}</p>
          </div>

          <div style="background:#fff;padding:20px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.04);border-left:4px solid #004EA5;">
            <p style="margin:0 0 8px 0;color:#64748b;font-size:14px;font-weight:600;">Course</p>
            <p style="margin:0;color:#1e293b;font-size:16px;font-weight:500;">${studentData.course}</p>
          </div>
        </div>

        <div style="margin-bottom:20px;">
          <div style="background:#fff;padding:20px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.04);border-left:4px solid #5598B5;">
            <p style="margin:0 0 12px 0;color:#64748b;font-size:14px;font-weight:600;">Address</p>
            <p style="margin:0;color:#1e293b;font-size:16px;line-height:1.6;white-space:pre-line;">${studentData.address}</p>
          </div>
        </div>

        ${isStudentCopy ? `
        <div style="background:#f0f9ff;padding:20px;border-radius:10px;border-left:4px solid #5598B5;margin-bottom:20px;">
          <p style="margin:0 0 12px 0;color:#004EA5;font-size:16px;font-weight:600;">Next Steps</p>
          <p style="margin:0;color:#1e293b;font-size:15px;line-height:1.5;">
            Our team will review your registration and contact you within 2-3 business days with further instructions.
            If you have any questions, please don't hesitate to contact us at <a href="mailto:info@ajayaaedtech.com" style="color:#004EA5;">info@ajayaaedtech.com</a>.
          </p>
        </div>
        ` : ''}
      </div>

      <!-- Footer -->
      <div style="background-color:#01319E;color:white;text-align:center;padding:20px;">
        <p style="margin:0;font-size:14px;">
          <a href="https://ajayaaedtech.com" style="color:#FFD700;text-decoration:none;font-weight:500;">Visit Our Website</a>
          <span style="margin:0 10px;color:rgba(255,255,255,0.3);">|</span>
          <a href="mailto:info@ajayaaedtech.com" style="color:#FFD700;text-decoration:none;font-weight:500;">Contact Support</a>
        </p>
        <p style="margin:15px 0 0 0;font-size:12px;color:rgba(255,255,255,0.6);">© ${new Date().getFullYear()} AjayaEdTech. All rights reserved.</p>
      </div>
    </div>
  `;
}