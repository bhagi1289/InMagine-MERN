const express = require("express");
const router = express.Router();
// const TDDController = require("../controllers/tdd.controller");
const configController = require("../controllers/configController").getInst();
const authController = require("../controllers/authController").getInst();


router.put("/update", authController.authMiddleware, configController.update);
router.get("/", authController.authMiddleware, configController.get);


module.exports = router;