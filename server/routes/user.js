const express = require("express");
const {
  handleNewUserToDb,
  handleLoginUser,
  handleProfile,
  handleLogoutUser,
  handleGetCartProducts,
  handlePostCartProducts,
} = require("../controllers/user");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", handleNewUserToDb);
router.post("/login", handleLoginUser);
router.get("/profile", authMiddleware, handleProfile);
router.get("/logout", handleLogoutUser);
router.get("/cart/:userEmail", authMiddleware, handleGetCartProducts);
router.post("/cart/add", authMiddleware, handlePostCartProducts);

module.exports = router;
