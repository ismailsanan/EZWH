const db = require("../model/dbHelper");

const { checkDateFormat, fromStrToNumber } = require("../util");

const {
  SUPPLIER,
  ISSUED,
  ORDER_STATES,
  DELIVERED,
  DELIVERY,
  COMPLETEDRETURN,
} = require("../constants");

// GET

const getAllRestockOrders = async (req, res) => {
  try {
    const restockOrders = await db.getRestockOrders();
    let response = [];
    for (let i = 0; i < restockOrders.length; i++) {
      let restockOrderSku = await db.getRestockOrderSku();
      restockOrderSku = restockOrderSku.filter(
        (rs) => rs.restockOrderId === restockOrders[i].id
      );

      let products = [];
      let visitedSkuId = [];
      for (let i = 0; i < restockOrderSku.length; i++) {
        if (visitedSkuId.includes(restockOrderSku[i].skuId)) {
          continue;
        }
        const sku = await db.getSkuById(restockOrderSku[i].skuId);

        products.push({
          SKUId: sku.id,
          description: sku.description,
          price: sku.price,
          qty: sku.availableQuantity,
        });

        visitedSkuId.push(sku.id);
      }

      let skuItems = [];
      if (
        restockOrders[i].state !== ISSUED &&
        restockOrders[i].state !== DELIVERY
      ) {
        for (let i = 0; i < restockOrderSku.length; i++) {
          skuItems.push({
            SKUId: restockOrderSku[i].skuId,
            rfid: restockOrderSku[i].rfid,
          });
        }
      }

      let transportNote =
        restockOrders[i].state !== ISSUED
          ? restockOrders[i].transportNote
          : null;

      response.push({
        id: restockOrders[i].id,
        issueDate: restockOrders[i].issueDate,
        state: restockOrders[i].state,
        products: products,
        supplierId: restockOrders[i].supplierId,
        transportNote: transportNote,
        skuItems: skuItems,
      });
    }
    res.status(200).json(response);
  } catch (err) {
    res.sendStatus(500);
  }
};

const getIssuedRestockOrders = async (req, res) => {
  try {
    let restockOrders = await db.getRestockOrdersIssued();
    restockOrders = restockOrders.filter((ro) => ro.state === ISSUED);
    let response = [];
    for (let i = 0; i < restockOrders.length; i++) {
      let restockOrderSku = await db.getRestockOrderSku();
      restockOrderSku = restockOrderSku.filter(
        (rs) => rs.restockOrderId === restockOrders[i].id
      );

      let products = [];
      let visitedSkuId = [];
      for (let i = 0; i < restockOrderSku.length; i++) {
        if (visitedSkuId.includes(restockOrderSku[i].skuId)) {
          continue;
        }
        const sku = await db.getSkuById(restockOrderSku[i].skuId);
        products.push({
          SKUId: sku.id,
          description: sku.description,
          price: sku.price,
          qty: sku.availableQuantity,
        });

        visitedSkuId.push(sku.id);
      }

      response.push({
        id: restockOrders[i].id,
        issueDate: restockOrders[i].issueDate,
        state: restockOrders[i].state,
        products,
        supplierId: restockOrders[i].supplierId,
        skuItems: [],
      });
    }
    res.status(200).json(response);
  } catch (err) {
    res.sendStatus(500);
  }
};

const getRestockOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || !fromStrToNumber(id)) {
      res.sendStatus(422);
    } else {
      const restockOrder = await db.getRestockOrderById(id);
      if (!restockOrder) {
        res.sendStatus(404);
      } else {
        let restockOrderSku = await db.getRestockOrderSku();
        restockOrderSku = restockOrderSku.filter(
          (rs) => rs.restockOrderId === restockOrder.id
        );

        let products = [];
        let visitedSkuId = [];
        for (let i = 0; i < restockOrderSku.length; i++) {
          if (visitedSkuId.includes(restockOrderSku[i].skuId)) {
            continue;
          }
          const sku = await db.getSkuById(restockOrderSku[i].skuId);
          products.push({
            SKUId: sku.id,
            description: sku.description,
            price: sku.price,
            qty: sku.availableQuantity,
          });

          visitedSkuId.push(sku.id);
        }

        let skuItems = [];

        for (let i = 0; i < restockOrderSku.length; i++) {
          skuItems.push({
            SKUId: restockOrderSku[i].skuId,
            rfid: restockOrderSku[i].rfid,
          });
        }

        res.status(200).json({
          id: restockOrder.id,
          issueDate: restockOrder.issueDate,
          state: restockOrder.state,
          products,
          supplierId: restockOrder.supplierId,
          transportNote: restockOrder.transportNote,
          skuItems,
        });
      }
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

const getSkuItemsOfRestockOrder = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || !fromStrToNumber(id)) {
      res.sendStatus(422);
    } else {
      const restockOrder = await db.getRestockOrderById(id);
      if (!restockOrder) {
        res.sendStatus(404);
      } else {
        if (restockOrder.state != COMPLETEDRETURN) {
          res.sendStatus(422);
        } else {
          let restockOrderSku = await db.getRestockOrderSku();
          restockOrderSku = restockOrderSku.filter(
            (rs) => rs.restockOrderId === restockOrder.id
          );

          let skuItems = [];

          for (let i = 0; i < restockOrderSku.length; i++) {
            skuItems.push({
              SKUId: restockOrderSku[i].skuId,
              rfid: restockOrderSku[i].rfid,
            });
          }

          let response = [];

          for (let i = 0; i < skuItems.length; i++) {
            const result = await db.getTestResultsByRFID(skuItems[i].rfid);
            if (!result || result.length === 0) {
              response.push({
                SKUId: skuItems[i].SKUId,
                rfid: skuItems[i].rfid,
              });
            }
          }

          res.status(200).json(response);
        }
      }
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

// POST

const createRestockOrder = async (req, res) => {
  try {
    const { issueDate, products, supplierId } = req.body;
    if (
      !checkDateFormat(issueDate) ||
      !products ||
      products.length === 0 ||
      !supplierId
    ) {
      res.sendStatus(422);
    } else {
      const user = await db.getUserById(supplierId);
      if (!user.type === SUPPLIER) {
        throw new Error();
      }

      for (let i = 0; i < products.length; i++) {
        const { SKUId, description, price, qty } = products[i];
        const sku = await db.getSkuById(SKUId);

        if (
          !sku ||
          sku.description !== description ||
          sku.price !== price ||
          sku.availableQuantity !== qty
        ) {
          throw new Error();
        }
      }

      const state = ISSUED;
      const transportNote = "";
      const restockOrderToInsert = {
        issueDate,
        supplierId,
        state,
        transportNote,
      };

      const createdRestockOrder = await db.createRestockOrder(
        restockOrderToInsert
      );

      for (let i = 0; i < products.length; i++) {
        const { SKUId } = products[i];
        const rfid = "";
        const restockOrderSkuToInsert = {
          restockOrderId: createdRestockOrder[0],
          skuId: SKUId,
          rfid,
        };

        await db.createRestockOrderSku(restockOrderSkuToInsert);
      }
      res.sendStatus(200);
    }
  } catch (err) {
    res.sendStatus(503);
  }
};

// PUT
const updateRestockOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error();
    }
    const restock = await db.getRestockOrderById(id);
    if (!restock) {
      res.sendStatus(404);
    }

    const { newState } = req.body;
    if (!newState || !ORDER_STATES.includes(newState)) {
      res.sendStatus(422);
    } else {
      await db.updateRestockOrderState(restock.id, newState);
      res.sendStatus(200);
    }
  } catch (err) {
    res.sendStatus(503);
  }
};

const updateSkuItemsInRestockOrder = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error();
    }
    const restock = await db.getRestockOrderById(id);
    if (!restock) {
      res.sendStatus(404);
    } else {
      const { skuItems } = req.body;

      if (!skuItems || skuItems.length === 0 || restock.state !== DELIVERED) {
        res.sendStatus(422);
      } else {
        let reduced = {};

        for (let i=0 ; i<skuItems.length ; i++) {
          let skuItem = skuItems[i]
          
          const { SKUId, rfid } = skuItem;
      
          
          if(reduced[SKUId]){
            let now = reduced[SKUId];
            now.push(rfid)
            reduced[SKUId]= now
          }else{
            reduced[SKUId] = [rfid]
          }
          
        }
        
        for (skuId in reduced) {
          let restockOrderSkuRel =
            await db.getRestockOrderSkuByRestockOrderIdAndSkuId(
              restock.id,
              skuId
            );

          if (!restockOrderSkuRel || restockOrderSkuRel.length === 0) {
            // empty skuItems
            const sku = await db.getSkuById(skuId);
            if (!sku) {
              throw new Error();
            } else {
              const rfids = reduced[skuId];
              for (let i = 0; i < rfids.length; i++) {
                await db.createRestockOrderSku({
                  restockOrderId: restock.id,
                  skuId,
                  rfid: rfids[i],
                });
              }
            }
          } else {
            let filtered = restockOrderSkuRel.filter(
              (r) => r.rfid.length === 0
            );
            if (filtered.length === 0) {
              const rfids = reduced[skuId];
              for (let i = 0; i < rfids.length; i++) {
                await db.createRestockOrderSku({
                  restockOrderId: restock.id,
                  skuId,
                  rfid: rfids[i],
                });
              }
            } else {
              const rfids = reduced[skuId];

              let i = 0;
              for (; i < rfids.length && i < filtered.length; i++) {
                await db.updateRestockOrderSku({
                  id: filtered[i].id,
                  restockOrderId: restock.id,
                  skuId: filtered[i].skuId,
                  rfid: rfids[i],
                });
              }

              if (i < rfids.length) {
                for (let j = i; j < rfids.length; j++) {
                  await db.createRestockOrderSku({
                    restockOrderId: restock.id,
                    skuId,
                    rfid: rfids[j],
                  });
                }
              }
            }
          }
        }
      }

      res.sendStatus(200);
    }
  } catch (err) {
    res.sendStatus(503);
  }
};

const updateTransportNoteInRestockOrder = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error();
    }
    const restock = await db.getRestockOrderById(id);
    if (!restock) {
      res.sendStatus(404);
    }

    const { transportNote } = req.body;
    if (!transportNote || !checkDateFormat(transportNote.deliveryDate)) {
      throw new Error();
    }

    const date = transportNote.deliveryDate;

    await db.updateRestockOrderTransportNote(restock.id, date);

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(503);
  }
};

// DELETE
const deleteRestockOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error();
    }
    const restock = await db.getRestockOrderById(id);
    if (!restock) {
      res.sendStatus(404);
    } else {
      await db.deleteRestockOrderSku(id);
      await db.deleteRestockOrderById(id);
      res.sendStatus(204);
    }
  } catch (err) {
    res.sendStatus(503);
  }
};

module.exports = {
  getAllRestockOrders,
  getIssuedRestockOrders,
  getRestockOrderById,
  getSkuItemsOfRestockOrder,
  createRestockOrder,
  updateRestockOrderById,
  updateSkuItemsInRestockOrder,
  updateTransportNoteInRestockOrder,
  deleteRestockOrderById,
};
