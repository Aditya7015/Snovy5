import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ------------------------------------------------------------------ */
/* Universal Email Sender */
/* ------------------------------------------------------------------ */
export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });

    console.log("📧 Email sent:", subject);
  } catch (error) {
    console.error("❌ Email error:", error);
  }
};
