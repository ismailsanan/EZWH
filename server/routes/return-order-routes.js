const express = require("express");

const router = express.Router();

const {
  isManager
} = require("../middleware/check-permission");

const {
  getAllReturnOrders,
  getReturnOrderById,
  createReturnOrder,
  deleteReturnOrder,
} = require("../controllers/return-order-controller");

router.get("/", isManager, getAllReturnOrders);
router.get("/:id", isManager, getReturnOrderById);
router.post("/", isManager, createReturnOrder);
router.delete("/:id", isManager, deleteReturnOrder);

module.exports = router;

