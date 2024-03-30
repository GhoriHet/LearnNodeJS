const accountSid = "AC9c633f119a12213d9550683e6cbb5736";
const authToken = "8aaee90304367b494bc9c40736df8379";
const client = require("twilio")(accountSid, authToken);

const sendOTP = async (req, res, next) => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log(otp);

    await client.messages
        .create({
            body: 'Your OTP is: ' + otp,
            to: '+91 9978467317', // Text your number
            from: '+17609708123', // From a valid Twilio number
        })
        .then((message) => {
            req.session.otp = otp
            next()
        })
        .catch((error) => console.error('Error sending OTP:', error))
}

const verifyOTP = async (req, res) => {
    if (req.body.otp === req.session.otp) {
        res.status(200).json({
            message: 'OTP verified successfully!!'
        })
    } else {
        res.status(400).json({
            message: 'Wrong  OTP entered!'
        })
    }
}

module.exports = { sendOTP, verifyOTP }