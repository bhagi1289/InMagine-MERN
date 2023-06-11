const express = require("express");
const router = express.Router();
// const TDDController = require("../controllers/tdd.controller");
const queueController = require("../controllers/queue").getInst();
const authController = require("../controllers/authController").getInst();


router.put("/:queueId", authController.authMiddleware, queueController.update);
router.delete("/:queueId",authController.authMiddleware, queueController.deleteQueue);
router.get("/", authController.authMiddleware,  queueController.get);
router.post("/", authController.authMiddleware, queueController.create);

module.exports = router;