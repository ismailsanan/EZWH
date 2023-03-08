const db = require("../model/dbHelper");
const {checkDateFormat} = require("../util")
// GET

const getAllSkuItems = async (req, res) => {
  try {
    const skuItems = await db.getSkuItems();
    const response = [];
    skuItems.map((item) => {
      response.push({
        RFID: item.rfid,
        SKUID: item.skuId,
        DateOfStoc: item.dateOfStock,
        Available: item.available,
      });
    });
    res.status(200).json(response);
  } catch (err) {
    res.sendStatus(500);
  }
};

const getSkuItemsBySkuId = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.sendStatus(422);
  } else {
    const skuItemsAvailable = await db.getSkuItemsBySkuIdAndIsAvailable(id);
    if (skuItemsAvailable.length < 1) {
      res.sendStatus(404);
    } else {
      try {
        const response = [];
        skuItemsAvailable.map((item) => {
          response.push({
            RFID: item.rfid,
            SKUID: item.skuId,
            DateOfStoc: item.dateOfStock,
          });
        });
        res.status(200).json(response);
      } catch (err) {
        res.sendStatus(500);
      }
    }
  }
};

const getSkuItemByRFID = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.sendStatus(422);
  } else {
    const skuItemByRFID = await db.getSkuItemByRFID(id);
    if (!skuItemByRFID.skuId) {
      res.sendStatus(404);
    } else {
      try {
        const response = {
          RFID: skuItemByRFID.rfid,
          SKUID: skuItemByRFID.skuId,
          DateOfStoc: skuItemByRFID.dateOfStock,
          Available: skuItemByRFID.available,
        };
        res.status(200).json(response);
      } catch (err) {
        res.sendStatus(500);
      }
    }
  }
};

// POST

const createSkuItem = async (req, res) => {
  const {RFID ,SKUID , DateOfStock } = req.body

  if (
    !RFID ||
    !SKUID ||
    !DateOfStock
  ) {
    res.sendStatus(422);
  } else {
    try {
      const skuById = await db.getSkuById(SKUID);
      if (!skuById) {
        res.sendStatus(404);
      } else {
        await db.createSkuItem({ RFID ,SKUID , DateOfStock});
        res.sendStatus(201);
      }
    } catch (err) {
      res.sendStatus(503);
    }
  }
};

// PUT
const updateSkuItemByRFID = async (req, res) => {
  const rfid = req.params.rfid;
  const { newRFID, newAvailable, newDateOfStock } = req.body;
  if (
    !rfid ||
    (!newRFID && !newAvailable && !newDateOfStock) ||
    !checkDateFormat(newDateOfStock)
  ) {
    res.sendStatus(422);
  } else {
    const skuItemByRFID = await db.getSkuItemByRFID(rfid);
    if (!skuItemByRFID) {
      res.sendStatus(404);
    } else {
      try {
        const skuItemToUpdate = {
          id: skuItem.id,
          rfid: !newRFID ? skuItem.rfid : newRFID,
          dateOfStock: !newDateOfStock ? skuItem.dateOfStock : newDateOfStock,
          available: !newAvailable ? skuItem.available : newAvailable,
        };

        await db.updateSkuItem(skuItemToUpdate);
        res.sendStatus(200);
      } catch (err) {
        res.sendStatus(503);
      }
    }
  }
};

// DELETE
const deleteSkuItemByRFID = async (req, res) => {
  const rfid = req.params.rfid;
  if (!rfid) {
    res.sendStatus(422);
  } else {
    try {
      const skuItemByRFID = await db.getSkuItemByRFID(rfid);
      if (!skuItemByRFID) {
        res.sendStatus(404);
      } else {
        await db.deleteSkuItemByRFID(rfid);
        res.sendStatus(204);
      }
    } catch (err) {
      res.sendStatus(503);
    }
  }
};

/***************************************  TEST RESULT ***************************************/

// GET

const getAllTestResultsForSkuItem = async (req, res) => {
  const rfid = req.params.rfid;
  if (!rfid) {
    res.sendStatus(422);
  } else {
    try {
      const skuItemByRFID = await db.getSkuItemByRFID(rfid);
      if (!skuItemByRFID) {
        res.sendStatus(404);
      } else {
        const testResults = await db.getTestResultsByRFID(rfid);
        const response = [];
        testResults.map((t) => {
          response.push({
            id: t.id,
            idTestDescriptor: t.idTestDescriptor,
            Date: t.date,
            Result: t.result,
          });
        });

        res.status(200).json(response);
      }
    } catch (err) {
      res.sendStatus(500);
    }
  }
};

const getTestResultForSkuItem = async (req, res) => {
  const rfid = req.params.rfid;
  const id = req.params.id;
  if (!rfid || !id) {
    res.sendStatus(422);
  } else {
    try {
      const testResult = await db.getTestResultsByRFIDAndId(rfid, id);
      if (!testResult) {
        res.sendStatus(404);
      } else {
        const response = {
          id: testResult.id,
          idTestDescriptor: testResult.idTestDescriptor,
          Date: testResult.date,
          Result: testResult.result,
        };

        res.status(200).json(response);
      }
    } catch (err) {
      res.sendStatus(500);
    }
  }
};

// POST

const createTestResult = async (req, res) => {
  const { rfid, idTestDescriptor, Date, Result } = req.body;
  if (!rfid || !idTestDescriptor || !Date) {
    res.sendStatus(422);
  } else {
    try {
      const skuItem = await db.getSkuItemByRFID(rfid);
      if (!skuItem) {
        res.sendStatus(404);
      } else {
        const testDescriptor = await db.getTestDescriptorById(idTestDescriptor);
        if (!testDescriptor) {
          res.sendStatus(404);
        } else {
          const testResultToInsert = {
            idTestDescriptor,
            date: Date,
            result: Result,
            rfid,
          };

          await db.createTestResult(testResultToInsert);
          res.sendStatus(201);
        }
      }
    } catch (err) {
      res.sendStatus(503);
    }
  }
};

// PUT
const updateTestResult = async (req, res) => {
  const rfid = req.params.rfid;
  const id = req.params.id;
  const { newIdTestDescriptor, newDate, newResult } = req.body;
  if (!rfid || !id || !newIdTestDescriptor || !newDate) {
    res.sendStatus(422);
  } else {
    try {
      const testResult = await db.getTestResultById(id);
      if (!testResult) {
        res.sendStatus(404);
      } else {
        const testDescriptor = await db.getTestDescriptorById(
          newIdTestDescriptor
        );
        if (!testDescriptor) {
          res.sendStatus(404);
        } else {
          const testResultToUpdate = {
            id: testRes.id,
            idTestDescriptor: newIdTestDescriptor,
            date: newDate,
            result: newResult,
            rfid,
          };
          await db.updateTestResult(testResultToUpdate);
          res.sendStatus(200);
        }
      }
    } catch (err) {
      res.sendStatus(503);
    }
  }
};

// DELETE
const deleteTestResult = async (req, res) => {
  const rfid = req.params.rfid;
  const id = req.params.id;
  if (!rfid || !id) {
    res.sendStatus(422);
  } else {
    try {
      await db.deleteTestResultByRFIDAndID(rfid, id);
      res.sendStatus(204);
    } catch (err) {
      res.sendStatus(503);
    }
  }
};

module.exports = {
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
};
