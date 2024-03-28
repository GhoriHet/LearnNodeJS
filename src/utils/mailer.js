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
            // from: {
            //     name: "DEMO",
            //     address: 'ghorihet71@gmail.com'
            // },
            from: 'ghorihet71@gmail.com', // sender address
            to: "ghorihet71@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
            attachments: [
                {
                    filename: 'sky.jpg',
                    path: path.join(__dirname, 'sky.jpg'),
                    contentType: 'image/jpg'
                },
                {
                    filename: 'example.pdf',
                    path: path.join(__dirname, '/pdfs/example.pdf'),
                    contentType: 'application/pdf'
                }
            ]
        });

        transporter.sendMail(info, function (error, data) {
            if (error) {
                console.log(error)
            } else {
                console.log("Email sent: " + data.response)
                res.json(data.response)
            }
        })

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = sendMail