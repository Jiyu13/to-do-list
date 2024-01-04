const mongoose = require("mongoose")

const ListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide a list name.'],
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false
    },    
})

// model needs 2 args: name, schema
module.exports = mongoose.model("List", ListSchema)