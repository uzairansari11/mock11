require('dotenv').config()
const mongoose = require('mongoose');
const connection = async () => {


    try {
        await mongoose.connect(process.env.mongoUrl)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { connection }