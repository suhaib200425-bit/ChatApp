const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect("mongodb+srv://suhaib:suhaib2004@cluster0.govnydk.mongodb.net")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err.message));
}

module.exports = connectDB;