const express = require("express");

const router = express.Router();

const {
  isManager,
  isManagerOrCustomer,
  isManagerOrDE,
  isManagerOrDEOrInternalCustomer,
} = require("../middleware/check-permission");

const {
  getAllInternalOrders,
  getInternalOrderById,
  createInternalOrder,
  updateInternalOrder,
  deleteInternalOrder,
} = require("../controllers/internal-order-controller");

router.get("/", isManager, getAllInternalOrders);
router.get("/:id", isManagerOrDE, getInternalOrderById);
router.post("/", isManagerOrCustomer, createInternalOrder);
router.put("/:id", isManagerOrDEOrInternalCustomer, updateInternalOrder);
router.delete("/:id", isManagerOrDEOrInternalCustomer, deleteInternalOrder);

module.exports = router;