const express = require("express");

const router = express.Router();

const {
  isManager,
  isManagerOrSupplier,
  isManagerOrClerkOrQE,
  isManagerOrClerk,
} = require("../middleware/check-permission");

const {
  getAllRestockOrders,
  getRestockOrderById,
  getSkuItemsOfRestockOrder,
  createRestockOrder,
  updateRestockOrderById,
  updateSkuItemsInRestockOrder,
  updateTransportNoteInRestockOrder,
  deleteRestockOrderById,
} = require("../controllers/restock-controller");

router.get("/", isManagerOrClerkOrQE, getAllRestockOrders);
router.get("/:id", isManager, getRestockOrderById);
router.get("/:id/returnItems", isManager, getSkuItemsOfRestockOrder);
router.post("/", isManagerOrSupplier, createRestockOrder);
router.put("/:id", isManagerOrClerk, updateRestockOrderById);
router.put("/:id/skuItems", isManagerOrClerk, updateSkuItemsInRestockOrder);
router.put("/:id/transportNote",isManagerOrSupplier,updateTransportNoteInRestockOrder);

router.delete("/:id", isManager, deleteRestockOrderById);

module.exports = router;