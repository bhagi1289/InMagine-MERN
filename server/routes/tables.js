const express = require("express");
const router = express.Router();
// const TDDController = require("../controllers/tdd.controller");
const tableController = require("../controllers/table").getInst();
const authController = require("../controllers/authController").getInst();

router.get("/allocate", authController.authMiddleware, tableController.allocateTable);
router.get("/:tableId", authController.authMiddleware, tableController.get);
router.put("/:tableId", authController.authMiddleware, tableController.update);
router.delete("/:tableId", authController.authMiddleware, tableController.deleteRecord);
router.post("/", authController.authMiddleware, tableController.create);
router.get("/", authController.authMiddleware, tableController.getAllTables);

module.exports = router;