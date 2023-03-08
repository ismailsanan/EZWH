const db = require("../dbConfig");

/**************************************** SKU ITEM  **********************************************/

const getSkus = async () => {
  const response = [];
  const skus = await db("sku");
  for (let i = 0; i < skus.length; i++) {
    const { id, description, weight, volume, notes, availableQuantity, price } =
      skus[i];
    const skuId = id;
    const positionRes = await getPositionBySkuId(skuId);
    const position = positionRes ? positionRes.positionId : "";
    const testDescriptorsRes = await getTestDescriptorsBySkuId(skuId);

    const testDescriptors = testDescriptorsRes.map((t) => t.id);

    response.push({
      id,
      description,
      weight,
      volume,
      notes,
      position,
      availableQuantity,
      price,
      testDescriptors,
    });
  }
  return response;
};

const getSkuById = async (id) => {
  const sku = await db("sku").where({ id }).first();
  return sku;
};

const createSku = async (sku) => {
  const { description, weight, volume, notes, price, availableQuantity } = sku;
  await db("sku").insert({
    description,
    weight,
    volume,
    notes,
    price,
    availableQuantity,
  });
  return "OK";
};

const updateSku = async (sku) => {
  const { id, description, weight, volume, notes, price, availableQuantity } =
    sku;
  await db("sku")
    .update({ description, weight, volume, notes, price, availableQuantity })
    .where({ id });
  return "OK";
};

const deleteSkuId = async (id) => {
  await db("sku").del().where({ id });
  return "OK";
};

/**************************************** SKU ITEM  **********************************************/

const getSkuItems = async () => {
  const skuItems = await db("skuItem");
  return skuItems;
};

const getSkuItemsBySkuIdAndIsAvailable = async (skuId) => {
  const available = 1;
  const skuItems = await db("skuItem").where({ skuId, available });
  return skuItems;
};

const getSkuItemByRFID = async (rfid) => {
  const skuItem = await db("skuItem").where({ rfid }).first();
  return skuItem;
};

const createSkuItem = async (skuItemToInsert) => {
  const { RFID, SKUID, DateOfStock } = skuItemToInsert;
  const rfid = RFID;
  const skuId = SKUID;
  const dateOfStock = DateOfStock;
  const available = 0;
  await db("skuItem").insert({ rfid, skuId, dateOfStock, available });
  return "OK";
};

const updateSkuItem = async (skuItem) => {
  const { id, description, weight, volume, notes, price, availableQuantity } =
    skuItem;
  await db("skuItem").update({}).where({ id });
  return "OK";
};

const deleteSkuItemByRFID = async (rfid) => {
  await db("skuItem").del().where({ rfid });
  return "OK";
};

/**************************************** POSITION **********************************************/

const getPositions = async () => {
  const positions = await db("position");
  return positions;
};

const getPositionBySkuId = async (skuId) => {
  const position = await db("position").where({ skuId }).first();
  return position;
};

const updatePosition = async (position) => {
  const { id, positionId, aisleId, row, col, maxWeight, maxVolume, skuId } =
    position;
  await db("position")
    .update({ positionId, aisleId, row, col, maxWeight, maxVolume, skuId })
    .where({ id });
  return "OK";
};

const getPositionByPositionId = async (positionId) => {
  const position = await db("position").where({ positionId }).first();
  return position;
};

const createPosition = async (position) => {
  const { positionId, aisleId, row, col, maxWeight, maxVolume } = position;
  await db("position").insert({
    positionId,
    aisleId,
    row,
    col,
    maxWeight,
    maxVolume,
  });
  return "OK";
};

const deletePositionById = async (positionId) => {
  await db("poistion").del().where({ positionId });
  return "OK";
};

/**************************************** TEST DESCRIPTORS **********************************************/

const getTestDescriptorsBySkuId = async (skuId) => {
  const testDescriptors = await db("testDescriptor").where({ skuId });
  return testDescriptors;
};

const getTestDescriptors = async () => {
  const testDescriptors = await db("testDescriptor");
  return testDescriptors;
};

const getTestDescriptorById = async (id) => {
  const testDescriptor = await db("testDescriptor").where({ id }).first();
  return testDescriptor;
};

const createTestDescriptor = async (testDescriptor) => {
  const { name, procedureDescription, skuId } = testDescriptor;
  await db("testDescriptor").insert({ name, procedureDescription, skuId });
  return "OK";
};

const updateTestDescriptor = async (testDescriptor) => {
  const { id, name, procedureDescription, skuId } = testDescriptor;
  await db("testDescriptor")
    .update({ name, procedureDescription, skuId })
    .where({ id });
  return "OK";
};

const deleteTestDescriptorById = async (id) => {
  await db("testDescriptor").del().where({ id });
  return "OK";
};

/**************************************** TEST RESULT **********************************************/

const getTestResultsByRFID = async (rfid) => {
  const testResults = await db("testResult").where({ rfid });
  return testResults;
};

const getTestResultsByRFIDAndId = async (rfid, id) => {
  const testResults = await db("testResult").where({ rfid, id });
  return testResults;
};

const getTestResultById = async (id) => {
  const testResult = await db("testResult").where({ id });
  return testResult;
};

const createTestResult = async (testResult) => {
  const { idTestDescriptor, date, result, rfid } = testResult;
  await db("testResult").insert({ idTestDescriptor, date, result, rfid });
  return "OK";
};

const updateTestResult = async (testResult) => {
  const { id, idTestDescriptor, date, result, rfid } = testResult;
  await db("testResult")
    .update({ idTestDescriptor, date, result, rfid })
    .where({ id });
  return "OK";
};

const deleteTestResultByRFIDAndID = async (rfid, id) => {
  await db("testResult").del().where({ rfid, id });
  return "OK";
};

/**************************************** USER **********************************************/

const getUserInfo = async (id) => {
  const user = await db("user").where({ id }).first();
  return user;
};

const getUsers = async () => {
  const users = await db("user");
  return users;
};

const createUser = async (user) => {
  const { username, name, surname, password, type } = user;
  await db("user").insert({ username, name, surname, password, type });
  return "OK";
};

const getUserByUsername = async (username) => {
  const user = await db("user").where({ username });
  return user;
};

const getUserById = async (id) => {
  const user = await db("user").where({ id }).first();
  return user;
};

const updateUser = async (user) => {
  const { id, username, name, surname, password, type } = user;
  await db("user")
    .update({ username, name, surname, password, type })
    .where({ id });
  return "OK";
};

const deleteUser = async (id) => {
  await db("user").del().where({ id });
  return "OK";
};

/**************************************** RESTOCK ORDER **********************************************/
const getRestockOrders = async () => {
  const restockOrders = await db("restockOrder");
  return restockOrders;
};

const getRestockOrdersIssued = async () => {
  const state = "ISSUED";
  const restockOrders = await db("restockOrder").where({ state });
  return restockOrders;
};

const getRestockOrderById = async (id) => {
  const restockOrder = await db("restockOrder").where({ id }).first();
  return restockOrder;
};

const createRestockOrder = async (restockOrder) => {
  const { issueDate, state, supplierId, transportNote } = restockOrder;
  const createdRestockOrder = await db("restockOrder").insert({
    issueDate,
    state,
    supplierId,
    transportNote,
  });
  return createdRestockOrder;
};

const updateRestockOrderState = async (id, state) => {
  await db("restockOrder").update({ state }).where({ id });
  return "OK";
};

const updateRestockOrderTransportNote = async (id, transportNote) => {
  await db("restockOrder").update({ transportNote }).where({ id });
  return "OK";
};

const deleteRestockOrderById = async (id) => {
  await db("restockOrder").del().where({ id });
  return "OK";
};

/**************************************** RESTOCK ORDER SKU RELATION **********************************************/

const getRestockOrderSku = async () => {
  const restockOrdersSku = await db("restockOrderSkuRelation");
  return restockOrdersSku;
};

const createRestockOrderSku = async (restockOrderSku) => {
  const { restockOrderId, skuId, rfid } = restockOrderSku;
  await db("restockOrderSkuRelation").insert({ restockOrderId, skuId, rfid });
  return "OK";
};

const updateRestockOrderSku = async (restockOrderSku) => {
  const { id, restockOrderId, skuId, rfid } = restockOrderSku;
  await db("restockOrderSkuRelation")
    .update({ restockOrderId, skuId, rfid })
    .where({ id });
  return "OK";
};

const deleteRestockOrderSku = async (restockOrderId) => {
  await db("restockOrderSkuRelation").del().where({ restockOrderId });
  return "OK";
};

const getRestockOrderSkuByRestockOrderIdAndSkuId = async (
  restockOrderId,
  skuId
) => {
  const res = await db("restockOrderSkuRelation").where({
    restockOrderId,
    skuId,
  });
  return res;
};

/**************************************** INTERNAL ORDER **********************************************/
const getInternalOrders = async () => {
  const internalOrders = await db("internalOrder");
  return internalOrders;
};

const getInteralOrdersIssued = async () => {
  const state = "ISSUED";
  const internalOrders = await db("internalOrder").where({ state });
  return internalOrders;
};

const getInteralOrdersAccepted = async () => {
  const state = "ACCEPTED";
  const internalOrders = await db("internalOrder").where({ state });
  return internalOrders;
};

const getInternalOrderById = async (id) => {
  const internalOrder = await db("internalOrder").where({ id }).first();
  return internalOrder;
};

const createInternalOrder = async (internalOrder) => {
  const { issueDate, state, customerId } = internalOrder;
  
  const createdRestockOrder = await db("internalOrder").insert({
    issueDate,
    state,
    customerId
  });
  return createdRestockOrder;
};

const updateInternalOrderState = async (id, state) => {
  await db("internalOrder").update({ state }).where({ id });
  return "OK";
};

const deleteInternalOrderById = async (id) => {
  await db("internalOrder").del().where({ id });
  return "OK";
};

/**************************************** INTERNAL ORDER SKU RELATION **********************************************/

const getInternalOrderSku = async () => {
  const restockOrders = await db("internalOrderSkuRelation");
  return restockOrders;
};


const createInternalOrderSku = async (internalOrderSku) => {
  const { internalOrderId, skuId, rfid } = internalOrderSku;
  await db("internalOrderSkuRelation").insert({ internalOrderId, skuId, rfid });
  return "OK";
};

const updateInternalOrderSku = async (internalOrderSku) => {
  const { id, internalOrderId, skuId, rfid } = internalOrderSku;
  await db("internalOrderSkuRelation")
    .update({ internalOrderId, skuId, rfid })
    .where({ id });
  return "OK";
};

const deleteInternalOrderSku = async (internalOrderId) => {
  await db("internalOrderSkuRelation").del().where({ internalOrderId });
  return "OK";
};

const getInternalOrderSkuByInternalOrderIdAndSkuId = async (
  internalOrderId,
  skuId
) => {
  const res = await db("internalOrderSkuRelation").where({
    internalOrderId,
    skuId,
  });
  return res;
};

/**************************************** RETURN ORDER SKU RELATION **********************************************/
const createReturnOrder = async(returnOrder) => {
  const {returnDate, restockOrderId} = returnOrder;
  const returnOrderInserted = await db("returnOrder").insert({returnDate, restockOrderId})
  return returnOrderInserted
}

const getReturnOrders = async() => {
  const returnOrders = await db("returnOrder");
  return returnOrders;
}

const getReturnOrderById = async(id) => {
  const returnOrder = await db("returnOrder").where({id});
  return returnOrder;
}

const deleteReturnOrderById = async(id) => {
  await db("returnOrder").del().where({id})
  return "OK"
}

/**************************************** RETURN ORDER SKU RELATION **********************************************/
const createReturnOrderSku = async (returnOrderSku) => {
  const { returnOrderId, skuId, rfid } = returnOrderSku;
  await db("returnOrderSkuRelation").insert({ returnOrderId, skuId, rfid });
  return "OK";
};

const getReturnOrderSku = async() => {
  const returnOrderSkus = await db("returnOrderSkuRelation")
  return returnOrderSkus;
}


const deleteReturnOrderSkuByReturnOrderId = async(returnOrderId) => {
  await db("returnOrderSkuRelation").del().where({returnOrderId})
  return "OK"
};

/**************************************** ITEM **********************************************/

const getItems = async () => {
  const items = await db("item");
  return items;
};

const getItemById = async (id) => {
  const item = await db("item").where({ id });
  return item;
};

const createItem = async (item) => {
  const { id,description, price, skuId, supplierId } = item;
  await db("item").insert({ id,description, price, skuId, supplierId });
  return "OK";
};

const updateItem = async (item) => {
  const { id, description, price, skuId, supplierId } = item;
  await db("item")
    .update({ description, price, skuId, supplierId })
    .where({ id });
  return "OK";
};

const deleteItemById = async (id) => {
  await db("item").del().where({ id });
  return "OK";
};

const getItemBySupplierId = async (supplierId) => {
  const items = await db("item").where({ supplierId });
  return items;
};

module.exports = {
  getSkus,
  getSkuById,
  createSku,
  updateSku,
  getPositionBySkuId,
  updatePosition,
  getPositionByPositionId,
  deleteSkuId,
  getTestDescriptorsBySkuId,
  getSkuItems,
  getSkuItemsBySkuIdAndIsAvailable,
  getSkuItemByRFID,
  createSkuItem,
  updateSkuItem,
  deleteSkuItemByRFID,
  getPositions,
  createPosition,
  deletePositionById,
  getTestDescriptors,
  getTestDescriptorById,
  createTestDescriptor,
  updateTestDescriptor,
  deleteTestDescriptorById,
  getTestResultsByRFID,
  getTestResultsByRFIDAndId,
  createTestResult,
  updateTestResult,
  getTestResultById,
  deleteTestResultByRFIDAndID,
  getUserInfo,
  getUsers,
  createUser,
  getUserByUsername,
  updateUser,
  deleteUser,
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItemById,
  getItemBySupplierId,
  getUserById,
  createRestockOrder,
  createRestockOrderSku,
  getRestockOrderById,
  deleteRestockOrderById,
  deleteRestockOrderSku,
  updateRestockOrderTransportNote,
  updateRestockOrderState,
  getRestockOrderSkuByRestockOrderIdAndSkuId,
  updateRestockOrderSku,
  getRestockOrders,
  getRestockOrdersIssued,
  getRestockOrderSku,
  createInternalOrder,
  createInternalOrderSku,
  getInternalOrderById,
  deleteInternalOrderSku,
  deleteInternalOrderById,
  getInternalOrders,
  getInternalOrderSku,
  getInteralOrdersIssued,
  getInteralOrdersAccepted,
  updateInternalOrderState,
  getInternalOrderSkuByInternalOrderIdAndSkuId,
  updateInternalOrderSku,
  createReturnOrder,
  createReturnOrderSku,
  deleteReturnOrderById,
  deleteReturnOrderSkuByReturnOrderId,
  getReturnOrderById,
  getReturnOrderSku,
  getReturnOrders
};
