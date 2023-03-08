const db = require("../model/dbHelper");

const { checkDateFormat, fromStrToNumber } = require("../util");

const {
  ISSUED,
  CUSTOMER,
  COMPLETED,
} = require("../constants");

// GET

const getAllInternalOrders = async (req, res) => {
  
  try {
    const internalOrders = await db.getInternalOrders();
    let response = [];
    for (let i = 0; i < internalOrders.length; i++) {
      let internalOrderSku = await db.getInternalOrderSku();
      internalOrderSku = internalOrderSku.filter(io => io.internalOrderId === internalOrders[i].id)
      let products = [];
      let visitedSkuId = [];
      for (let i = 0; i < internalOrderSku.length; i++) {
        if (visitedSkuId.includes(internalOrderSku[i].skuId)) {
          continue;
        }
        const sku = await db.getSkuById(internalOrderSku[i].skuId);

        let RFID = internalOrders[i].state === COMPLETED ? internalOrderSku[i].rfid : null;
        products.push({
          SKUId: sku.id,
          description: sku.description,
          price: sku.price,
          qty: sku.availableQuantity,
          RFID: RFID,
        });

        visitedSkuId.push(sku.id);
      
      }
      response.push({
        id: internalOrders[i].id,
        issueDate: internalOrders[i].issueDate,
        state: internalOrders[i].state,
        products: products,
        customerId: internalOrders[i].customerId,
      });
      console.log(response)
  }
  
    res.status(200).json(response);
  } catch (err) {
    res.sendStatus(500);
  }
};

const getIssuedInternalOrders = async (req, res) => {
  try {
    const response = await getInternalOrderByState(ISSUED);
    res.status(200).json(response);
  } catch (err) {
    res.sendStatus(500);
  }
};

const getAcceptedInternalOrders = async (req, res) => {
  try {
    const response = await getInternalOrderByState();
    res.status(200).json(response);
  } catch (err) {
    res.sendStatus(500);
  }
};

const getInternalOrderByState = async (state = null) => {
  let internalOrders; 
  if(state === ISSUED){
    internalOrders = await db.getInteralOrdersIssued();
    
    
  }else{
    internalOrders = await db.getInteralOrdersAccepted();
  }
  
  let response = [];
  for (let i = 0; i <  internalOrders.length; i++) {
    let internalOrderSku = await db.getInternalOrderSku();
    internalOrderSku = internalOrderSku.filter(io => io.internalOrderId === internalOrders[i].id)

    let products = [];
    let visitedSkuId = [];
    for (let i = 0; i <  internalOrderSku.length; i++) {
      if (visitedSkuId.includes(internalOrderSku[i].skuId)) {
        continue;
      }
      const sku = await db.getSkuById(internalOrderSku[i].skuId);

      products.push({
        SKUId: sku.id,
        description: sku.description,
        price: sku.price,
        qty: sku.availableQuantity,
      });

      visitedSkuId.push(sku.id);
    }

    response.push({
      id: internalOrders[i].id,
      issueDate: internalOrders[i].issueDate,
      state: internalOrders[i].state,
      products,
      customerId: internalOrders[i].customerId,
    });
  }

  return response;
};

const getInternalOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || !fromStrToNumber(id)) {
      res.sendStatus(422);
    } else {
      const internalOrder = await db.getInternalOrderById(id);
      if (!internalOrder) {
        res.sendStatus(404);
      } else {
        let internalOrderSku = await db.getInternalOrderSku();
        internalOrderSku = internalOrderSku.filter(io => io.internalOrderId === internalOrder.id)

        let products = [];
        let visitedSkuId = [];
        for (let i = 0; i < internalOrderSku.length; i++) {
          if (visitedSkuId.includes(internalOrderSku[i].skuId)) {
            continue;
          }
          const sku = await db.getSkuById(internalOrderSku[i].skuId);
          let RFID = internalOrder.state === COMPLETED ? internalOrderSku[i].rfid : null;
          products.push({
            SKUId: sku.id,
            description: sku.description,
            price: sku.price,
            qty: sku.availableQuantity,
            RFID: RFID
          
          });

          visitedSkuId.push(sku.id);
        }
    

        res.status(200).json({
          id: internalOrder.id,
          issueDate: internalOrder.issueDate,
          state: internalOrder.state,
          products,
          customerId: internalOrder.customerId,
        });
      }
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

// POST

const createInternalOrder = async (req, res) => {
  try {
    const { issueDate, products, customerId } = req.body;
    if (
      !checkDateFormat(issueDate) ||
      !products ||
      products.length === 0 ||
      !customerId
    ) {
      res.sendStatus(422);
    } else {
      const user = await db.getUserById(customerId);
      if (!user.type.toLowerCase() === CUSTOMER.toLowerCase()) {
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

      const internalOrderToInsert = {
        issueDate,
        customerId,
        state,
      };

      const createdInternalOrder = await db.createInternalOrder(
        internalOrderToInsert
      );
  
      for (let i = 0; i < products.length; i++) {
        const { SKUId } = products[i];
        const rfid = "";
        const internalOrderSkuToInsert = {
          internalOrderId: createdInternalOrder[0],
          skuId: SKUId,
          rfid,
        };


        await db.createInternalOrderSku(internalOrderSkuToInsert);
      }

      res.sendStatus(201);
    }
  } catch (err) {
    res.sendStatus(503);
  }
};

// PUT

const updateInternalOrder = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error();
    }
    const {newState, products} = req.body;
    if(newState === COMPLETED && (!products || products.length === 0)){
      res.sendStatus(422)
    }else{
      const internalOrder = await db.getInternalOrderById(id);
    if (!internalOrder) {
      res.sendStatus(404);
    }else{
      await db.updateInternalOrderState(internalOrder.id,newState.toUpperCase())
      if(newState === COMPLETED){
       
        let reduced = {};
        for (let i = 0 ; i<products.length ; i++) {
          const { SkuID, RFID } = products[i];
          if(reduced[SkuID]){
            let now = reduced[SkuID];
            now.push(RFID)
            reduced[SkuID]= now
          }else{
            reduced[SkuID] = [RFID]
          }
        }
        for (skuId in reduced) {
          let internalOrderSkuRel =
            await db.getInternalOrderSkuByInternalOrderIdAndSkuId(
              internalOrder.id,
              skuId
            );

          if (!internalOrderSkuRel || internalOrderSkuRel.length === 0) {
            // empty skuItems
            const sku = await db.getSkuById(skuId);
        
            if (!sku) {
              throw new Error();
            } else {
              const rfids = reduced[skuId];
            
              for (let i=0;i<rfids.length ; i++) {
                const toInsert = {
                  internalOrderId: internalOrder.id,
                  skuId :  skuId,
                  rfid: rfids[i],
                }
                await db.createInternalOrderSku(toInsert);
              }
            }
          } else {
            
            let filtered = internalOrderSkuRel.filter(
              (r) => r.rfid.length === 0
            );
         
            if (filtered.length === 0) {
              const rfids = reduced[skuId];
              for (let i=0;i<rfids.length ; i++) {
                await db.createInternalOrderSku({
                  internalOrderId: internalOrder.id,
                  skuId,
                  rfid: rfids[i],
                });
              }
            } else {
              const rfids = reduced[skuId];
             
              let i = 0;
            
              for (; i < rfids.length && i < filtered.length; i++) {
              
                await db.updateInternalOrderSku({
                  id: filtered[i].id,
                  internalOrderId: internalOrder.id,
                  skuId: filtered[i].skuId,
                  rfid: rfids[i],
                });
              }

              if (i < rfids.length) {
                for (let j = i; j < rfids.length; j++) {
                  await db.createInternalOrderSku({
                    internalOrderId: internalOrder.id,
                    skuId,
                    rfid: rfids[j],
                  });
                }
              }
            }
          }
        }
      
      }
    }
    }
    res.sendStatus(200);
    
  } catch (err) {
    res.sendStatus(503);
  }
};

// DELETE
const deleteInternalOrder = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error();
    }
    const internal = await db.getInternalOrderById(id);
    if (!internal) {
      res.sendStatus(404);
    } else {
      await db.deleteInternalOrderSku(id);
      await db.deleteInternalOrderById(id);
      res.sendStatus(204);
    }
  } catch (err) {
    res.sendStatus(503);
  }
};

module.exports = {
  getAllInternalOrders,
  getIssuedInternalOrders,
  getAcceptedInternalOrders,
  getInternalOrderById,
  createInternalOrder,
  updateInternalOrder,
  deleteInternalOrder,
};
