const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const userDataModel = require("../models/userData");
const app = express();

const handleNewUserToDb = async(req, res) => {
    const { username, email, contact, password, confirmpassword} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const createNewUser = await userDataModel.create({
        username,
        email,
        contact,
        password: hash,
        confirmpassword
    });
};

const handleProfile = async (req, res) => {
   const token = req.cookies.token;

   if(!token) {
    return res.status(401).json({ error: "Unauthorized, No Token Found"});
   }

   try {
    const decoded = jwt.verify(token, "secret");
    const user = await userDataModel.findOne({email: decoded.email}).select('-password');

    if(!user){
        return res.status(404).json({error: "User not Found"});
    }
    res.json(user);
   } catch (error) {
    res.status(400).json({error: "Invalid Token"});
   }
};

const handleLoginUser = async(req, res) => {
    const user = await userDataModel.findOne({email: req.body.email});
    console.log('my user', user)


    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if(result) {
            let myToken = jwt.sign({ email: user.email }, "secret");
            // console.log(result);
            res.cookie('token', myToken);
            return res.json({status: 'login successful', user: user});
        } else {
            res.status(404).json();
        }
    });
};

const handleLogoutUser = async(req, res) => {
    res.clearCookie("token", {httpOnly: true, sameSite: "none", secure: true});

    res.json({ status : "Logout Successfully"});
}

module.exports = {
    handleNewUserToDb,
    handleLoginUser, 
    handleProfile,
    handleLogoutUser
};