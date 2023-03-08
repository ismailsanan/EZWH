const db = require("../model/dbHelper");

const { checkDateFormat, fromStrToNumber } = require("../util");

// GET

const getAllReturnOrders = async (req, res) => {
  try{
    const returnOrders = await db.getReturnOrders();
    
    let response = []
    for(let i = 0; i < returnOrders.length; i++){
      let returnOrderSku = await db.getReturnOrderSku();
      returnOrderSku = returnOrderSku.filter(rs => rs.returnOrderId === returnOrders[i].id);

      let products = []
      for(let i = 0; i < returnOrderSku.length; i++){
        const sku = await db.getSkuById(returnOrderSku[i].skuId);
          products.push({
            SKUId: sku.id,
            description: sku.description,
            price: sku.description,
            RFID: returnOrderSku[i].rfid
          })
      }

      response.push({
        id: returnOrders[i].id,
        returnDate: returnOrders[i].returnDate,
        products,
        restockOrderId: returnOrders[i].restockOrderId
      })
    }
    res.status(200).json(response)
  }catch(err){
    res.sendStatus(500)
  }
};

const getReturnOrderById = async (req, res) => {
  try{
    const id = fromStrToNumber(req.params.id);
    if(!id){
      res.sendStatus(422)
    }else{
      const returnOrder = await db.getReturnOrderById(id);
      if(!returnOrder){
        res.sendStatus(404)
      }else{
        let returnOrderSku = await db.getReturnOrderSku();
        returnOrderSku = returnOrderSku.filter(rs => rs.returnOrderId === id);
        
        let products = []
        
        for(let i = 0; i < returnOrderSku.length; i++){
          const sku = await db.getSkuById(returnOrderSku[i].skuId);
          products.push({
            SKUId: sku.id,
            description: sku.description,
            price: sku.description,
            RFID: returnOrderSku[i].rfid
          })
        }

        res.status(200).json({
          returnDate: returnOrder[0].returnDate,
          products,
          restockOrderId: returnOrder[0].restockOrderId
        })
      }
    }
  }catch(err){
    res.sendStatus(500)
  }
};

// POST

const createReturnOrder = async (req, res) => {
  try{
    const {returnDate, products, restockOrderId} = req.body;
    if(!checkDateFormat(returnDate) || !products || products.length === 0 || !fromStrToNumber(restockOrderId)){
      res.sendStatus(422)
    }else{
      const restockOrder = await db.getRestockOrderById(restockOrderId);
      if(!restockOrder){
        res.sendStatus(404)
      }else{
        const returnOrderToInsert = await db.createReturnOrder({
          returnDate,
          restockOrderId
        })

        for(let i = 0; i < products.length; i++){
          
          await db.createReturnOrderSku({
            returnOrderId: returnOrderToInsert[0],
            skuId: products[i].SKUId,
            rfid: products[i].RFID
          })
        }
       res.sendStatus(201)
      }
    }
  }catch(err){
    res.sendStatus(503)
  }
};

// DELETE
const deleteReturnOrder = async (req, res) => {
  try{
    const id = req.params.id;
    if(!fromStrToNumber(id)){
      res.sendStatus(422)
    }else{
      await db.deleteReturnOrderSkuByReturnOrderId(id)
      await db.deleteReturnOrderById(id)
      res.sendStatus(201)
    }
  }catch(err){
    res.sendStatus(503)
  }
};


module.exports = {
  getAllReturnOrders,
  getReturnOrderById,
  createReturnOrder,
  deleteReturnOrder,
}