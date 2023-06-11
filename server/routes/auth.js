const express = require("express");
const router = express.Router();
// const TDDController = require("../controllers/tdd.controller");
const authController = require("../controllers/authController").getInst();


router.post("/login", authController.login);

router.get("/logout", authController.authMiddleware, authController.logout);

module.exports = router;