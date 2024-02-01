const mongoose = require("mongoose");

mongoose
        .connect("mongodb://127.0.0.1:27017/Mongo3")
        .then(() => console.log("db running bro..."))
        .catch((err) => console.log(err));