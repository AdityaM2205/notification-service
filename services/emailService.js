import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const sendEmail = async ({ userId, message }) => {
  // In real implementation, fetch user email from DB
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'user@example.com', // Replace with actual email
    subject: 'New Notification',
    text: message
  };

  await transporter.sendMail(mailOptions);
};
