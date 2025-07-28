const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const sendSignupMail = async (to, name) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
      <h2 style="color: #4CAF50;">Welcome to Zifypay, ${name}!</h2>
      <p>Thank you for signing up. We're excited to have you on board.</p>
      <p>Start exploring our platform and enjoy our services!</p>
      <hr>
      <p style="font-size: 12px; color: #888;">If you did not sign up, please ignore this email.</p>
    </div>
  `;
  await transporter.sendMail({
    from: `Zifypay <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Welcome to Zifypay!',
    html,
  });
};

const sendSignupMailForBussiness = async (to, name ) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
      <h2 style="color: #4CAF50;">Welcome to Zifypay, ${name}!</h2>
      <p>Thank you for signing up. We're excited to have you on board. Please Resgister your north account </p>
       <p>To get started, and activate your bussiness</p>
      <p> please click the link below to set up your payment account:</p>
      <p><a href="${"https://zifypay.com/dashboard/payments"}/setup-payment-account" style="color : #2196F3; text-decoration: none;">Set Up Payment Account</a></p>
      <p>Once your account is set up, you can start managing your business and accepting payments seamlessly.</p>
      <p>Start exploring our platform and enjoy our services!</p>
      <hr>
      <p style="font-size: 12px; color: #888;">If you did not sign up, please ignore this email.</p>
    </div>
  `;
  await transporter.sendMail({
    from: `Zifypay <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Welcome to Zifypay!',
    html,
  });
};
const sendLoginMail = async (to, name) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
      <h2 style="color: #2196F3;">Login Alert</h2>
      <p>Hello ${name},</p>
      <p>Your account was just logged in successfully. If this was you, no action is required.</p>
      <p>If you did not perform this login, please reset your password immediately.</p>
      <hr>
      <p style="font-size: 12px; color: #888;">This is an automated message from Zifypay.</p>
    </div>
  `;
  await transporter.sendMail({
    from: `Zifypay <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Login Successful - Zifypay',
    html,
  });
};

const sendAppointmentMail = async (to, customerName, businessName, serviceName, staffName, date, time, location) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 550px; margin: auto; background: #f8f8f8; padding: 32px 24px; border-radius: 10px; border:1px solid #e0e0e0;">
      <h2 style="color: #4CAF50; margin-bottom: 12px;">Your Appointment is Confirmed!</h2>
      <p style="font-size: 16px; color: #222;">Hello <b>${customerName}</b>,</p>
      <p style="font-size: 15px; color: #333;">Thank you for booking an appointment with <b>${businessName}</b>.</p>
      <div style="background: #fff; border-radius: 7px; border: 1px solid #e0e0e0; margin: 18px 0 20px 0; padding: 18px 16px;">
        <table style="width: 100%; font-size: 15px; color: #222;">
          <tr><td><b>Service</b></td><td>${serviceName}</td></tr>
          <tr><td><b>Staff</b></td><td>${staffName}</td></tr>
          <tr><td><b>Date</b></td><td>${date}</td></tr>
          <tr><td><b>Time</b></td><td>${time}</td></tr>
          <tr><td><b>Location</b></td><td>${location}</td></tr>
        </table>
      </div>
      <p style="color:#555;">If you have any questions or need to reschedule, please contact us directly.</p>
      <hr style="margin: 24px 0;">
      <p style="font-size: 12px; color: #888;">This is an automated message from Zifypay. Please do not reply directly to this email.</p>
    </div>
  `;
  await transporter.sendMail({
    from: `Zifypay <${process.env.EMAIL_USER}>`,
    to,
    subject: `Appointment Confirmed with ${businessName}`,
    html,
  });
};

const sendAppointmentReminderMail24h = async (to, customerName, businessName, serviceName, staffName, date, time, location) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 550px; margin: auto; background: #f8f8f8; padding: 32px 24px; border-radius: 10px; border:1px solid #e0e0e0;">
      <h2 style="color: #FFA500; margin-bottom: 12px;">Appointment Reminder: 24 Hours Left!</h2>
      <p style="font-size: 16px; color: #222;">Hello <b>${customerName}</b>,</p>
      <p style="font-size: 15px; color: #333;">This is a friendly reminder that you have an appointment with <b>${businessName}</b> in 24 hours.</p>
      <div style="background: #fff; border-radius: 7px; border: 1px solid #e0e0e0; margin: 18px 0 20px 0; padding: 18px 16px;">
        <table style="width: 100%; font-size: 15px; color: #222;">
          <tr><td><b>Service</b></td><td>${serviceName}</td></tr>
          <tr><td><b>Staff</b></td><td>${staffName}</td></tr>
          <tr><td><b>Date</b></td><td>${date}</td></tr>
          <tr><td><b>Time</b></td><td>${time}</td></tr>
          <tr><td><b>Location</b></td><td>${location}</td></tr>
        </table>
      </div>
      <p style="color:#555;">If you need to reschedule or have questions, please contact us as soon as possible.</p>
      <hr style="margin: 24px 0;">
      <p style="font-size: 12px; color: #888;">This is an automated reminder from Zifypay. Please do not reply directly to this email.</p>
    </div>
  `;
  await transporter.sendMail({
    from: `Zifypay <${process.env.EMAIL_USER}>`,
    to,
    subject: `Reminder: Your Appointment with ${businessName} is Tomorrow`,
    html,
  });
};

const sendAppointmentReminderMail1h = async (to, customerName, businessName, serviceName, staffName, date, time, location) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 550px; margin: auto; background: #f8f8f8; padding: 32px 24px; border-radius: 10px; border:1px solid #e0e0e0;">
      <h2 style="color: #FF4500; margin-bottom: 12px;">Final Reminder: Appointment Soon!</h2>
      <p style="font-size: 16px; color: #222;">Hello <b>${customerName}</b>,</p>
      <p style="font-size: 15px; color: #333;">Your appointment with <b>${businessName}</b> is coming up in about 1 hour.</p>
      <div style="background: #fff; border-radius: 7px; border: 1px solid #e0e0e0; margin: 18px 0 20px 0; padding: 18px 16px;">
        <table style="width: 100%; font-size: 15px; color: #222;">
          <tr><td><b>Service</b></td><td>${serviceName}</td></tr>
          <tr><td><b>Staff</b></td><td>${staffName}</td></tr>
          <tr><td><b>Date</b></td><td>${date}</td></tr>
          <tr><td><b>Time</b></td><td>${time}</td></tr>
          <tr><td><b>Location</b></td><td>${location}</td></tr>
        </table>
      </div>
      <p style="color:#555;">We look forward to seeing you soon!</p>
      <hr style="margin: 24px 0;">
      <p style="font-size: 12px; color: #888;">This is an automated reminder from Zifypay. Please do not reply directly to this email.</p>
    </div>
  `;
  await transporter.sendMail({
    from: `Zifypay <${process.env.EMAIL_USER}>`,
    to,
    subject: `Final Reminder: Your Appointment with ${businessName} is Soon`,
    html,
  });
};

const sendPasswordResetOTP = async (to, name, otp) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
      <h2 style="color: #FF9800;">Password Reset Request</h2>
      <p>Hello ${name || ''},</p>
      <p>We received a request to reset your password. Use the OTP below to proceed:</p>
      <div style="font-size: 24px; font-weight: bold; letter-spacing: 4px; margin: 20px 0; color: #2196F3;">${otp}</div>
      <p>This OTP is valid for 10 minutes. If you did not request a password reset, you can safely ignore this email.</p>
      <hr>
      <p style="font-size: 12px; color: #888;">This is an automated message from Zifypay.</p>
    </div>
  `;
  await transporter.sendMail({
    from: `Zifypay <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Password Reset OTP - Zifypay',
    html,
  });
};

module.exports = {
  sendSignupMail,
  sendLoginMail,
  sendAppointmentMail,
  sendAppointmentReminderMail24h,
  sendAppointmentReminderMail1h,
  sendSignupMailForBussiness,
  sendPasswordResetOTP
};
