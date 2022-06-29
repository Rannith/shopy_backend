const express = require('express');
const mongoose = require('mongoose');
const router = require("./routes/user-routes").default;

const app = express();

app.use(express.json());
app.use("/users", router);

mongoose.connect("mongodb://localhost:27017/shopy")
    .then(() => console.log("Connected to Database"))
    .then(() => {
        app.listen(5000);
    })
    .catch(err => console.log(err))