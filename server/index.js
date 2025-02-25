require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const userRoute = require('./routes/user')
const PORT = 3001;

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', userRoute);


mongoose.connect(process.env.MONGO_URI).then(()=> console.log('mongodb connected'));
app.listen(PORT,() => console.log(`Server has started at ${PORT}`) );