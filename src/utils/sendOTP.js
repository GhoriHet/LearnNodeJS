// const twilio = require('twilio');
// const accountSid = 'AC4f124bed71967cdc367b6d55d847e878';
// const authToken = '948a295f7ae16105154a9eedfab60756';
// const client = twilio(accountSid, authToken);

const accountSid = "AC9c633f119a12213d9550683e6cbb5736";
const authToken = "27623a5da22cb0161a3f358bd80a5d7e";
const client = require("twilio")(accountSid, authToken);

const sendOTP = async (req, res, next) => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log(otp);

    client.messages
        .create({
            body: 'Your OTP is: ' + otp,
            to: '+91 9978467317', // Text your number
            from: '+17609708123', // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));
}

module.exports = sendOTP