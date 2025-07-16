const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.TWILIO_PHONE_NUMBER;



const client = twilio(accountSid, authToken);

async function sendBookingSMS(to, message) {
  try {
    await client.messages.create({
      body: message,
      from: fromPhone,
      to
    });
    console.log(`SMS sent to ${to}`);
  } catch (error) {
    console.error('SMS sending error:', error);
  }
}

module.exports = { sendBookingSMS };