require('dotenv').config();
const readline = require("readline");
const client = require("twilio")(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter phone number to call (with country code): ", function (number) {
  client.calls
    .create({
      twiml: '<Response><Say>Hello! This is a free call using Twilio and Node.js.</Say></Response>',
      to: number,
      from: process.env.TWILIO_NUMBER,
    })
    .then(call => {
      console.log("✅ Call initiated: " + call.sid);
      rl.close();
    })
    .catch(err => {
      console.error("❌ Error: " + err.message);
      rl.close();
    });
});
