import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: `"CampusFlow" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text
    });

    console.log("EMAIL SENT:", info.messageId);
  } catch (err) {
    console.error("EMAIL ERROR:", err);
    throw err;
  }
};

export default sendEmail;
