const express = require("express");

const router = express.Router();

const {
  isManager,
  isManagerOrClerk,
  isManagerOrSupplier,
  isSupplier,
} = require("../middleware/check-permission");

const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/item-controller");

router.get("/", isManagerOrSupplier, getAllItems);
router.get("/:id", isManager, getItemById);
router.post("/", isSupplier, createItem);
router.put("/:id", isSupplier, updateItem);
router.delete("/:id", isSupplier, deleteItem);

module.exports = router;
