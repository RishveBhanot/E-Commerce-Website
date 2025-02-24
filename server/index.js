const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const userDataModel = require("./models/userData");
const { handleNewUserToDb, handleLoginUser } = require("./controllers/user");
const PORT = 3001;

const app = express();

app.use(express.json());
app.use(cors());

app.use('/signup', handleNewUserToDb);

app.use('/login',handleLoginUser)

mongoose.connect("mongodb://127.0.0.1:27017/products").then(()=> console.log('mongodb connected'));
app.listen(PORT,() => console.log(`Server has started at ${PORT}`) );