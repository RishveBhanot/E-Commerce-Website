const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userDataModel = require("../models/userData");
const mongoose = require('mongoose');
const app = express();

const handleNewUserToDb = async (req, res) => {
  const { username, email, contact, password, confirmpassword } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const createNewUser = await userDataModel.create({
    username,
    email,
    contact,
    password: hash,
    confirmpassword,
  });
};

const handleProfile = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized, No Token Found" });
  }

  try {
    const decoded = jwt.verify(token, "secret");
    const user = await userDataModel
      .findOne({ email: decoded.email })
      .select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not Found" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "Invalid Token" });
  }
};

const handleLoginUser = async (req, res) => {
  const user = await userDataModel.findOne({ email: req.body.email });
  console.log("my user", user);

  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (result) {
      let myToken = jwt.sign({ email: user.email }, "secret");
      // console.log(result);
      res.cookie("token", myToken);
      return res.json({ status: "login successful", user: user });
    } else {
      res.status(404).json();
    }
  });
};

const handleLogoutUser = async (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "none", secure: true });

  res.json({ status: "Logout Successfully" });
};

//Retrieves the cart of the logged-in user based on their email.
//It uses .populate("cart.productId") to fetch the details of products stored in the cart.

const handleGetCartProducts = async (req, res) => {
  try {
    const user = await userDataModel
      .findOne({ email: req.user.email })
      .populate("cart.productId");
    console.log("MY DATA", req.user);
    if (!user) return res.status(404).json({ message: "User Not Found" });
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart data" });
  }
};

/*Adds a product to the logged-in user's cart.
If the product already exists in the cart, it updates the quantity.
Otherwise, it adds a new entry for that product.*/

const handlePostCartProducts = async (req, res) => {
  try {
    console.log("✅ Authenticated User:", req.user);
    console.log("📥 Received request body:", req.body);
    const { email } = req.user;    

    let { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "❌ Missing productId or quantity" });
    }

    // Convert productId to string
    productId = productId.toString();
    console.log("🔹 ProductId as string:", productId);

    // Fetch user
    const user = await userDataModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "❌ User Not Found" });
    }

    const existingItem = user.cart.find(item => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += 1;
      console.log("🛒 Updated quantity:", existingItem.quantity);
    } else {
      user.cart.push({ productId, quantity });
      console.log("🆕 Added new product to cart");
    }

    await user.save();
    console.log("✅ Cart updated successfully:", user.cart);
    res.json(user.cart);
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};



module.exports = {
  handleNewUserToDb,
  handleLoginUser,
  handleProfile,
  handleLogoutUser,
  handleGetCartProducts,
  handlePostCartProducts,
};
