const express = require("express");

const router = express.Router();

const {
  isManager,
  isManagerOrClerk,
} = require("../middleware/check-permission");

const {
  getAllPositions,
  createPosition,
  updatePositionById,
  updatePositionId,
  deletePositionById,
} = require("../controllers/position-controller");

router.get("/", isManagerOrClerk, getAllPositions);
router.post("/", isManager, createPosition);
router.put("/:positionID", isManagerOrClerk, updatePositionById);
router.put("/:positionID/changeID", isManager, updatePositionId);
router.delete("/:positionID", isManager, deletePositionById);

module.exports = router;
