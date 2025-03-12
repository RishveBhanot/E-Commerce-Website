const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userDataModel = require("../models/userData");
const mongoose = require("mongoose");
const app = express();

const handleNewUserToDb = async (req, res) => {
  const { username, email, contact, password, confirmpassword } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const createNewUser = await userDataModel.create({
    username,
    email,
    contact,
    password: hashedPassword,
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
    const user = await userDataModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not Found" });
    }
    res.status(200).json({
      _id: user._id,
      email: user.email,
      username: user.username,
      contact: user.contact,
    });
  } catch (error) {
    res.status(400).json({ error: "Invalid Token" });
  }
};

const handleLoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userDataModel.findOne({ email });
    console.log("my user", user);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1hr" });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Strict",
    });
    res.status(200).json({ message: "Login Successfully", userId: user._id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error", details: error.details });
  }
};

const handleLogoutUser = async (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "none", secure: true });

  res.json({ status: "Logout Successfully" });
};

//Retrieves the cart of the logged-in user based on their email.
//It uses .populate("cart.productId") to fetch the details of products stored in the cart.

const handlePostCartProducts = async (req, res) => {
  const { userId } = req.user;
  console.log("myname", userId);
  const { product } = req.body;
  console.log("Received data:", { userId, product });

  //  Validate input
  if (!userId || !product) {
    console.log("Invalid product data received:", product);
    return res.status(400).json({ message: "Invalid product data" });
  }

  try {
    const user = await userDataModel.findById(userId);
    if (!user) {
      console.log("User not found:", userId);
      return res.status(404).json({ message: "User Not Found" });
    }

    const existingItem = user.cart.find(
      (item) => item.productId.toString() === product.productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
      console.log(" Updated quantity:", existingItem);
    } else {
      user.cart.push({
        productId: product.productId,
        quantity: 1,
        image: product.image,
        title: product.title,
        price: product.price,
        category: product.category,
        description: product.description,
      });
      console.log("Added new product:", product.productId);
    }

    await user.save();
    console.log("Updated user cart:", user.cart);

    return res.status(200).json(user.cart);
  } catch (error) {
    console.error("Error in handlePostCartProducts:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

/*Adds a product to the logged-in user's cart.
If the product already exists in the cart, it updates the quantity.
Otherwise, it adds a new entry for that product.*/

const handleGetCartProducts = async (req, res) => {
  try {
    const user = await userDataModel
      .findById(req.user.userId)
      .populate("cart.productId");
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    console.log("Cart fetched for user:", user.cart);
    res.status(200).json(user.cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  handleNewUserToDb,
  handleLoginUser,
  handleProfile,
  handleLogoutUser,
  handlePostCartProducts,
  handleGetCartProducts,
};
