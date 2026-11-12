const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
})

// mongoose is connecting server with monodb databse.
const noteModel = mongoose.model("note", noteSchema)

module.exports = noteModel