const mongoose = require("mongoose")

const ListSchema = new mongoose.Schema({
    name: String,
    completed: Boolean,    
})

// model needs 2 args: name, schema
module.exports = mongoose.model("List", ListSchema)