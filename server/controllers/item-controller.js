const db = require("../model/dbHelper");

// GET
const getAllItems = async (req, res) => {
  try {
    const items = await db.getItems();
    const response = [];
    items.map((item) => {
      const { id, description, price, skuId, supplierId } = item;
      response.push({
        id,
        description,
        price,
        SKUId: skuId,
        supplierId,
      });
    });
    res.status(200).json(response);
  } catch (err) {
    res.sendStatus(500);
  }
};

const getItemById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.sendStatus(422);
  } else {
    try {
      const item = await db.getItemById(id);
      if (!item || item.length === 0) {
        res.sendStatus(404);
      } else {
        const { id, description, price, skuId, supplierId } = item[0];
        const response = {
          id,
          description,
          price,
          SKUId: skuId,
          supplierId,
        };
        res.status(200).json(response);
      }
    } catch (err) {
      res.sendStatus(500);
    }
  }
};

// POST

const createItem = async (req, res) => {
  const { id, description, price, SKUId, supplierId } = req.body;
  if (!id || !description || !price || !SKUId || !supplierId) {
    res.sendStatus(422);
  } else {
    try {
      const sku = await db.getSkuById(SKUId);
      if (!sku || sku.length === 0) {
        res.sendStatus(404);
      } else {
        const skuId = sku.id;
        const items = await db.getItemBySupplierId(supplierId);
        let flag = false;
        if (items && items.length > 0) {
          for (let i = 0; i < items.length && !flag; i++) {
            if (items[i].skuId === skuId || items[i].id === id) {
              flag = true;
            }
          }
          if (flag) {

            res.sendStatus(422);
          }
        }
        itemToInsert = {
          id,
          description,
          price,
          skuId: skuId,
          supplierId,
        };
        await db.createItem(itemToInsert);
        res.sendStatus(201);
      }
    } catch (err) {
      res.sendStatus(503);
    }
  }
};

// PUT
const updateItem = async (req, res) => {
  const id = req.params.id;
  const { newDescription, newPrice } = req.body;
  if (!id || !newDescription || !newPrice) {
    res.sendStatus(422);
  } else {
    try {
      const item = await db.getItemById(id);
      if (!item || item.length === 0) {
        res.sendStatus(404);
      } else {
        const { id, supplierId, skuId } = item[0];
        const itemToUpdate = {
          id,
          supplierId,
          skuId,
          description: newDescription,
          price: newPrice,
        };
        await db.updateItem(itemToUpdate);
        res.sendStatus(200);
      }
    } catch (err) {
      res.sendStatus(503);
    }
  }
};

// DELETE
const deleteItem = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.sendStatus(422);
  } else {
    try {
      await db.deleteItemById(id);
      res.sendStatus(204);
    } catch (err) {
      res.sendStatus(503);
    }
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
