const mongoose = require('mongoose');
require('dotenv').config()

const connectDB = async () => {
    try {
       await mongoose.connect(process.env.MONGODB_URL + process.env.MONGODB_DATABASE)
       .then(() => console.log('Database connected successfully!'))
       .catch((error) => console.log(error.message))
    } catch (error) {
        console.log('error', error.message);
    }
}

module.exports = connectDB