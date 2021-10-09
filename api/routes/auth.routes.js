var express = require("express");
var router = express.Router();

const { login, signup, verifyRefreshToken } = require("../controllers");

router.post("/signup", signup);

router.post("/login", login);

router.post("/verify-refresh-token", verifyRefreshToken);

module.exports = router;
