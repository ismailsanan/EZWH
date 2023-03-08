const db = require("../model/dbHelper");

// GET

const getAllTestDescriptors = async (req, res) => {
  try {
    const testDescriptors = await db.getTestDescriptors();
    const response = [];
    testDescriptors.map((testDescriptor) =>
      response.push({
        id : testDescriptor.id,
        name: testDescriptor.name,
        procedureDescription: testDescriptor.procedureDescription,
        idSKU: testDescriptor.skuId,
      })
    );
    res.status(200).json(response);
  } catch (err) {
    res.sendStatus(500);
  }
};

const getTestDescriptorById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
  } else {
    try {
      const testDescriptor = await db.getTestDescriptorById(id);
      if (!testDescriptor) {
        res.sendStatus(404);
      } else {
        const response = {
          name: testDescriptor.name,
          procedureDescription: testDescriptor.procedureDescription,
          idSKU: testDescriptor.skuId,
        };
        res.status(200).json(response);
      }
    } catch (err) {
      res.sendStatus(500);
    }
  }
};

// POST

const createTestDescriptor = async (req, res) => {
  const { name, procedureDescription, idSKU } = req.body;
  if (!name || !procedureDescription || !idSKU) {
    res.sendStatus(422);
  } else {
    try {
      const sku = await db.getSkuById(idSKU);
      if (!sku) {
        res.sendStatus(404);
      } else {
        const testDescriptorToInsert = {
          name,
          procedureDescription,
          skuId: idSKU,
        };

        await db.createTestDescriptor(testDescriptorToInsert);
        res.sendStatus(201);
      }
    } catch (err) {
      res.sendStatus(503);
    }
  }
};

// PUT
const updateTestDescriptorById = async (req, res) => {
  const id = req.params.id;
  const { newName, newProcedureDescription, newIdSKU } = req.body;
  if (!id || !newName || !newProcedureDescription || !newIdSKU) {
    res.sendStatus(422);
  } else {
    try {
      const testDescriptor = await db.getTestDescriptorById(id);
      if (!testDescriptor) {
        res.sendStatus(404);
      } else {
        const sku = await db.getSkuById(testDescriptor.skuId);
        if (!sku) {
          res.sendStatus(404);
        } else {
          const testDescriptorToUpdate = {
            id: testDescriptor.id,
            procedureDescription: newProcedureDescription,
            skuId: newIdSKU,
          };
          await db.updateTestDescriptor(testDescriptorToUpdate);
          res.sendStatus(200);
        }
      }
    } catch (err) {
      res.sendStatus(503);
    }
  }
};

// DELETE
const deleteTestDescriptorById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.sendStatus(422);
  } else {
    try {
      await db.deleteTestDescriptorById(id);
      res.sendStatus(204);
    } catch (err) {
      res.sendStatus(503);
    }
  }
};

module.exports = {
  getAllTestDescriptors,
  getTestDescriptorById,
  createTestDescriptor,
  updateTestDescriptorById,
  deleteTestDescriptorById,
};
