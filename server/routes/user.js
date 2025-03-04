const express = require("express");
const { handleNewUserToDb, handleLoginUser, handleProfile, handleLogoutUser } = require("../controllers/user");
const router = express.Router();

router.post('/signup', handleNewUserToDb);
router.post('/login', handleLoginUser);
router.get('/loggedIn', handleProfile);
router.get('/logout', handleLogoutUser)


module.exports = router;