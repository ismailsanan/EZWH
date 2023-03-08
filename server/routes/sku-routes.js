const express = require("express");

const router = express.Router();

const {
  isManager,
  isManagerOrCustomerOrClerk,
} = require("../middleware/check-permission");

const {
  getAllSkus,
  getSkuById,
  createSku,
  updateSkuById,
  updateSkuByIdAndPosition,
  deleteSkuById,
} = require("../controllers/sku-controller");

router.get("/", isManagerOrCustomerOrClerk, getAllSkus);
router.get("/:id", isManager, getSkuById);
router.post("/", isManager, createSku);
router.put("/:id", isManager, updateSkuById);
router.put("/:id/position", isManager, updateSkuByIdAndPosition);
router.delete("/:id", isManager, deleteSkuById);

module.exports = router;
