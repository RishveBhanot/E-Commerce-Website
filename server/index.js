require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoute = require('./routes/user');
const PORT = 7001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


app.use('/api', userRoute);



mongoose.connect(process.env.MONGO_URI).then(()=> console.log('MongoDB Connected'));
app.listen(PORT,() => console.log(`Server has started at ${PORT}`) );