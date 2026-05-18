require('dotenv').config();
const nodemailer = require('nodemailer');

async function test() {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"NJ Real Estate" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // send to themselves to test
      subject: 'Test Email',
      html: '<b>Testing 123</b>',
    });

    console.log('Email sent:', info.messageId);
  } catch (err) {
    console.error('Error:', err);
  }
}
test();
