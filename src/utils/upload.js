const multer = require("multer");
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        const pathShow = path.extname(file.originalname);

        if (pathShow === '.png' || pathShow === '.jpg' || pathShow === '.jpeg') {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix)
        } else {
            cb("Only png, jpg and jpeg file allowed.")
        }
    }
})

const upload = multer({ storage: storage });

module.exports = upload