// import { v2 as cloudinary } from 'cloudinary';
const cloudinary = require('cloudinary');
const fs = require('fs')

cloudinary.config({
    cloud_name: 'dd0o7ffpa',
    api_key: '245214444436295',
    api_secret: 'jqTrGgnGkx8blUjX263WG6G6PsY'
});

const uploadFile = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath,
            { public_id: "users" });

            fs.unlinkSync(filePath)

        return result
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    uploadFile
}