const nodemailer = require("nodemailer");
const path = require('path')

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "ghorihet71@gmail.com",
        pass: "ddjf sqml otki zqes",
    }
});

const sendMail = async (req, res) => {
    try {
        const info = await transporter.sendMail({
            from: 'ghorihet71@gmail.com', // sender address
            to: "ghorihet71@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        transporter.sendMail(info, function (error, data) {
            if (error) {
                console.log(error)
            } else {
                console.log("Email sent: " + data.response)
                res.json(info.response)
            }
        })

        // if (!info) {
        //     return res.status(500).send('Error sending email')
        // }
        // console.log("Message sent: %s", info.messageId);
        // res.json({
        //     message: 'Email sent' + info.messageId,
        // })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = sendMail