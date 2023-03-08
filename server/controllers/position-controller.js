const db = require("../model/dbHelper");

// GET

const getAllPositions = async (req, res) => {
  try {
    const positions = await db.getPositions();
    const response = [];
    positions.map(async (position) => {
      const sku = await db.getSkuById(position.skuId);
      response.push({
        positionID: position.positionId,
        aisleID: position.aisleId,
        row: position.row,
        col: position.col,
        maxWeight: position.maxWeight,
        maxVolume: position.maxVolume,
        occupiedWeight: sku.weight,
        occupiedVolume: sku.volume,
      });
    });
    res.status(200).json(response);
  } catch (err) {
    res.sendStatus(500);
  }
};

// POST

const createPosition = async (req, res) => {
  const { positionID, aisleID, row, col, maxWeight, maxVolume } = req.body;
  if (
    !positionID ||
    !aisleID ||
    !row ||
    !col ||
    !maxWeight ||
    !maxVolume ||
    row.length !== 4 ||
    col.length !== 4 ||
    aisleID !== 4 ||
    positionID !== aisleID + row + col
  ) {
    res.sendStatus(422);
  } else {
    try {
      const skuToInsert = {
        description: "",
        weight: 0,
        volume: 0,
        notes: "",
        price: 0,
        availableQuantity: 0,
      };
      await db.createSku(skuToInsert);
      const positionToInsert = {
        positionId: positionID,
        aisleId: aisleID,
        row,
        col,
        maxWeight,
        maxVolume,
      };
      await db.createPosition(positionToInsert);
      res.sendStatus(201);
    } catch (err) {
      res.sendStatus(503);
    }
  }
};

// PUT
const updatePositionById = async (req, res) => {
  const positionID = req.params.positionID;
  const {
    newAisleID,
    newRow,
    newCol,
    newMaxWeight,
    newMaxVolume,
    newOccupiedWeight,
    newOccupiedVolume,
  } = req.body;
  const validBody =
    newAisleID &&
    newRow &&
    newCol &&
    newMaxVolume &&
    newMaxWeight &&
    newOccupiedVolume &&
    newOccupiedWeight;
  if (!positionID || !validBody) {
    res.sendStatus(422);
  } else {
    try {
      const position = await db.getPositionByPositionId(positionID);
      if (!position) {
        res.sendStatus(404);
      } else {
        const newPositionId = newAisleID + row + col;
        const sku = await db.getSkuById(position.skuId);
        const skuToUpdate = {
          id: sku.id,
          description: sku.description,
          weight: newOccupiedWeight,
          volume: newOccupiedVolume,
          notes: sku.notes,
          price: sku.price,
          availableQuantity: sku.availableQuantity,
        };
        await db.updateSku(skuToUpdate);

        const positionToUpdate = {
          id: position.id,
          positionId: newPositionId,
          aisleId: newAisleID,
          row: newRow,
          col: newCol,
          maxWeight: newMaxWeight,
          maxVolume: newMaxVolume,
          skuId: sku.id,
        };
        await db.updatePosition(positionToUpdate);
        res.sendStatus(200);
      }
    } catch (err) {
      res.sendStatus(503);
    }
  }
};

const updatePositionId = async (req, res) => {
  const positionId = req.params.positionID;
  if (!positionId || positionId.length !== 12) {
    res.sendStatus(422);
  } else {
    try {
      const position = await db.getPositionByPositionId(positionId);
      if (!position) {
        res.sendStatus(404);
      } else {
        const newAisleID = positionId.substring(0, 4);
        const newRow = positionId.substring(4, 8);
        const newCol = positionId.substring(8, 12);
        const positionToUpdate = {
          id: position.id,
          positionId: positionId,
          aisleId: newAisleID,
          row: newRow,
          col: newCol,
          maxWeight: newMaxWeight,
          maxVolume: newMaxVolume,
          skuId: position.skuId,
        };
        await db.updatePosition(positionToUpdate);
        res.sendStatus(200);
      }
    } catch (err) {
      res.sendStatus(503);
    }
  }
};

// DELETE
const deletePositionById = async (req, res) => {
  const positionId = req.params.positionID;
  if (!positionId) {
    res.sendStatus(422);
  } else {
    try {
      await db.deletePositionById(positionId);
      res.sendStatus(204);
    } catch (err) {
      res.sendStatus(503);
    }
  }
};

module.exports = {
  getAllPositions,
  createPosition,
  updatePositionById,
  updatePositionId,
  deletePositionById,
};
