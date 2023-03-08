const express = require("express");

const router = express.Router();

const { isManager, isManagerOrQE } = require("../middleware/check-permission");

const {
  getAllTestDescriptors,
  getTestDescriptorById,
  createTestDescriptor,
  updateTestDescriptorById,
  deleteTestDescriptorById,
} = require("../controllers/test-descriptors-controller");

router.get("/", isManagerOrQE, getAllTestDescriptors);
router.get("/:id", isManager, getTestDescriptorById);
router.post("/", isManager, createTestDescriptor);
router.put("/:id", isManager, updateTestDescriptorById);
router.delete("/:id", isManager, deleteTestDescriptorById);

module.exports = router;
