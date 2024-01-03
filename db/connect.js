// setup connect to mongoose to use the database in the server
const mongoose = require('mongoose')


const connectDB = (url) => {
    return mongoose.connect(url)}
        // remove depreciation warnings
        // {
        //     useNewUrlParser: true, // Use new URL parser
        //     useUnifiedTopology: true, // Use new server discovery and monitoring engine
        // }

module.exports = connectDB
