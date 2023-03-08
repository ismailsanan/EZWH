const db = require("../model/dbHelper");
const {fromStrToNumber} = require('../util')
// GET

const getAllSkus = async (req, res) => {
  try {
    const allSkus = await db.getSkus();
    res.status(200).json(allSkus);
  } catch (err) {
    res.sendStatus(500);
  }
};

const getSkuById = async (req, res) => {
  const id = fromStrToNumber(req.params.id);
  if (!id) {
    res.sendStatus(422);
  } else {
    try {
      const sku = await db.getSkuById(id);
      if (!sku) {
        res.sendStatus(404);
      } else {
        const { description, weight, volume, notes, availableQuantity, price } =
          sku;
        const skuId = id;
        const positionRes = await db.getPositionBySkuId(skuId);
        const position = positionRes ? positionRes.positionId : "";
        const testDescriptorsRes = await db.getTestDescriptorsBySkuId(skuId);

        const testDescriptors = testDescriptorsRes.map((t) => t.id);

        const response = {
          id,
          description,
          weight,
          volume,
          notes,
          position,
          availableQuantity,
          price,
          testDescriptors,
        };
        res.status(200).json(response);
      }
    } catch (err) {
      res.sendStatus(500);
    }
  }
};

// POST
const createSku = async (req, res) => {
  let { description, weight, volume, notes, price, availableQuantity } =
    req.body;

  weight = fromStrToNumber(weight);
  volume = fromStrToNumber(volume);
  price = fromStrToNumber(price);
  availableQuantity = fromStrToNumber(availableQuantity);

  if (!weight || !volume || !price || !availableQuantity) {
    res.sendStatus(422);
  } else {
    try {
      const skuToInsert = {
        description,
        weight,
        volume,
        notes,
        price,
        availableQuantity,
      };

      await db.createSku(skuToInsert);
      res.sendStatus(201);
    } catch (err) {
      res.sendStatus(503);
    }
  }
};

// PUT
const updateSkuById = async (req, res) => {
  const id = fromStrToNumber(req.params.id);
  if (!id) {
    res.sendStatus(422);
  } else {
    try {
      const sku = await db.getSkuById(id);
      if (!sku) {
        res.sendStatus(404);
      } else {
        let {
          newDescription,
          newWeight,
          newVolume,
          newNotes,
          newPrice,
          newAvailableQuantity,
          newTestDescriptors,
        } = req.body;

        if (!newTestDescriptors) {
          newTestDescriptors = [];
        }

        newWeight = fromStrToNumber(newWeight);
        newVolume = fromStrToNumber(newVolume);
        newPrice = fromStrToNumber(newPrice);
        newAvailableQuantity = fromStrToNumber(newAvailableQuantity);

        if (!newWeight || !newVolume || !newPrice || !newAvailableQuantity) {
          res.sendStatus(422);
        } else {
          const position = await db.getPositionBySkuId(sku.id);

          if (
            position &&
            (newWeight > position.maxWeight || newVolume > position.maxVolume)
          ) {
            res.sendStatus(422);
          }

          const skuToUpdate = {
            id,
            description: newDescription,
            weight: newWeight,
            volume: newVolume,
            notes: newNotes,
            price: newPrice,
            availableQuantity: newAvailableQuantity,
          };
          await db.updateSku(skuToUpdate);

          if (position) {
            position.maxWeight = newWeight;
            position.maxVolume = newVolume;
            await updatePosition(position);
          }

          /*
              if (compareArrays(newTestDescriptors, sku.testDescriptors)) {
                //TODO ? insert N testDescriptors ???
              }*/

          res.sendStatus(200);
        }
      }
    } catch (err) {
      res.sendStatus(500);
    }
  }
};

const updateSkuByIdAndPosition = async (req, res) => {
  const skuId = fromStrToNumber(req.params.id);
  const positionId = req.body;
  if (!skuId || !positionId) {
    res.sendStatus(422);
  } else {
    try {
      const sku = await db.getSkuById(skuId);
      if (!sku) {
        res.sendStatus(404);
      } else {
        const position = await db.getPositionByPositionId(positionId);
        if (!position) {
          res.sendStatus(404);
        } else {
          if (
            position.skuId ||
            sku.weight > position.maxWeight ||
            sku.volume > position.maxVolume
          ) {
            res.sendStatus(422);
          } else {
            position.maxWeight = sku.weight;
            position.maxVolume = sku.volume;
            await updatePosition(position);
            res.sendStatus(200);
          }
        }
      }
    } catch (err) {
      res.sendStatus(503);
    }
  }
};

// DELETE
const deleteSkuById = async (req, res) => {
  const skuId = fromStrToNumber(req.params.id);
  if (!skuId) {
    res.sendStatus(422);
  } else {
    try {
      const sku = await db.getSkuById(skuId);
      if (!sku) {
        res.sendStatus(404);
      } else {
        await db.deleteSkuId(skuId);
        res.sendStatus(204);
      }
    } catch (err) {
      res.sendStatus(503);
    }
  }
};

module.exports = {
  getAllSkus,
  getSkuById,
  createSku,
  updateSkuById,
  updateSkuByIdAndPosition,
  deleteSkuById,
};
