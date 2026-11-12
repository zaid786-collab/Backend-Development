// HOW TO CONNECT OUR SERVER TO MONGODB DATABSE : 
const mongoose = require("mongoose");

async function connectDB() {

    await mongoose.connect("mongodb+srv://zaidkhan24082006_db_user:SGCy2eNMNK8wahk9@cluster0.kmfvibg.mongodb.net/notes_app?");

    console.log("Connected to DB");
}

module.exports = connectDB
