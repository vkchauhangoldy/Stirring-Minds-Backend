const mongoose = require("mongoose")

const url = "mongodb+srv://vkgoldy:vkgoldy@stirring.lfnzeij.mongodb.net/Stirring-Minds?retryWrites=true&w=majority"

mongoose.connect(url, { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to Databse successfully...!");
    }).catch(() => {
        console.log("Falied to connect");
    })