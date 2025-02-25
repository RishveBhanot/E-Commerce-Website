const express = require("express");
const { handleNewUserToDb, handleLoginUser } = require("../controllers/user");
const router = express.Router();

router.post('/signup', handleNewUserToDb);
router.post('/login', handleLoginUser);

module.exports = router;