const mongoose = require("mongoose");

const userModels = new mongoose.Schema({
    username : String,
    email : String,
    password : String,
});

const user = mongoose.model("user" , userModels);

module.exports = user;