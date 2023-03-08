const express = require("express");

const router = express.Router();

const {
  isManager,
  isManagerOrCustomer,
  isManagerOrClerk,
  isManagerOrQE,
} = require("../middleware/check-permission");

const {
  getAllSkuItems,
  getSkuItemsBySkuId,
  getSkuItemByRFID,
  createSkuItem,
  updateSkuItemByRFID,
  deleteSkuItemByRFID,
  getAllTestResultsForSkuItem,
  getTestResultForSkuItem,
  createTestResult,
  updateTestResult,
  deleteTestResult,
} = require("../controllers/sku-items-controller");

router.get("/", isManager, getAllSkuItems);
router.get("/sku/:id", isManagerOrCustomer, getSkuItemsBySkuId);
router.get("/:rfid", isManager, getSkuItemByRFID);
router.post("/", isManagerOrClerk, createSkuItem);
router.put("/:rfid", isManager, updateSkuItemByRFID);
router.delete("/:rfid", isManager, deleteSkuItemByRFID);

// TEST RESULTS
router.get("/:rfid/testResults", isManagerOrQE, getAllTestResultsForSkuItem);
router.get("/:rfid/testResults/:id", isManagerOrQE, getTestResultForSkuItem);
router.post("/testResult", isManagerOrQE, createTestResult);
router.put("/:rfid/testResult/:id", isManagerOrQE, updateTestResult);
router.delete("/:rfid/testResult/:id", isManagerOrQE, deleteTestResult);

module.exports = router;
