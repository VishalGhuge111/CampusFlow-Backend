import nodemailer from "nodemailer";

let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    console.log("Creating SMTP transporter...");

    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
};

const sendEmail = async (to, subject, text) => {
  try {
    const mailer = getTransporter();

    await mailer.verify();
    console.log("SMTP Ready");

    const info = await mailer.sendMail({
      from: "CampusFlow <skyplus049@gmail.com>",
      to,
      subject,
      text,
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("SEND EMAIL ERROR:", error);
    throw error;
  }
};

export default sendEmail;
