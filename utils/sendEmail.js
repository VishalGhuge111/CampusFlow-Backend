import axios from "axios";

const sendEmail = async (to, subject, text) => {
  try {
    console.log("Sending email via Brevo API...");
    
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "CampusFlow",
          email: "skyplus049@gmail.com",
        },
        to: [
          {
            email: to,
          },
        ],
        subject,
        textContent: text,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Email sent successfully:", response.data.messageId);
    return response.data;
  } catch (error) {
    console.error(
      "SEND EMAIL ERROR:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default sendEmail;
