const { expect } = require("chai");

const db = require("../model/dbHelper");

describe("User unit test", () => {  // description + function
  test("create user", async () => { // asynch and wait
    const res = await db.createUser({ // wait for db create 
      name: "kkk",
      password: "testpassword",
      surname: "fff",
      type: "Clerk",
      username: "mok82@gmail.com",
    });

    expect(res).equal("OK"); // expect to be ok since the function returns OK when created
  });

  test("getUserByUsername", async () => {
    const res = await db.getUserByUsername("mok82@gmail.com"); // check the username which is unique
    const { username } = res[0]; // object username res is an array res[0] is the username

    expect("mok82@gmail.com").equal(username); // expect username = username 
  });
});

const userService = require("../controllers/user-controller.js");
const db = require("../model/dbHelper");
const sku_controller = require("../controllers/sku-controller");

// function test() {
//   describe("test", () => {
//     test('testing', async () => {
      
//     });
//   });
// };
// describe("test", () => {

// });

// function testProva( req ) {
//   describe("test", () => {
//     test('testing', async () => {
//       console.log(req);
//       let res = await sku_controller.createSku(req);
//       res.should.have.status(422);
//     });
//   });
// };
// describe("test", () => {
//   let req = {
//     description: "description",
//         weight: 17,
//         volume: 18,
//         notes: "notes", 
//         price: 4,
//         availableQuantity: 0,
//   }
//   testProva(req);
// });





////////////////////////////////////////////////
////////////////SKU/////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////SKU/////////////////////////////
////////////////////////////////////////////////



function testGetSKUById(id) {
  describe("get SKU", () => {
    test('getting SKU by ID', async () => {
      const res = await db.getSkuById(id);
      let Description = res.description;
      expect("a new sku").equal(Description);
    });
  });
};
describe("test", () => {
  testGetSKUById(1);
});




function testCreateSKU( description, weight, volume, notes, price, availableQuantity ) {
  describe("create new SKU", () => {
    test('create SKU', async () => {
      let res = await db.createSku ({
        description: description,
        weight: weight,
        volume: volume,
        notes: notes, 
        price: price,
        availableQuantity: availableQuantity,
      });
      expect(res).equal("OK");
    });
  });
};
describe ("create SKU", () => {
  
    testCreateSKU("description", "150", "200", "note", "2000", "67" );
});




function testUpdateSKU(id, description, weight, volume, notes, price, availableQuantity) {
  describe("update an SKU", () => {
    test('updating SKU', async () => {
      let res = await db.updateSku ({
        id: id,
        description: description,
        weight: weight,
        volume: volume,
        notes: notes, 
        price: price,
        availableQuantity: availableQuantity,
      });
      expect(res).equal("OK");
    });
  });
};
describe("test update SKU", () => {
  testUpdateSKU(13, "new description", "160", "201", "new notes", "1000", "50");
})




function testDeleteSKUId(id) {
  describe("delete an SKU", () => {
    test('deleting SKU', async () => {
      let res = await db.deleteSkuId (id);
      expect(res).equal("OK");
    });
  });
};
describe("test update SKU", () => {
  testDeleteSKUId(13);
});




////////////////////////////////////////////////
////////////////SKUItem/////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////SKUItem/////////////////////////
////////////////////////////////////////////////


function testCreateSKUItem(RFID, SKUID, DateOfStock) {
  describe("create new SKUItem", () => {
    test('creating SKUItem ', async () => {
      let res = await db.createSkuItem({
        RFID: RFID,
        SKUID: SKUID,
        DateOfStock: DateOfStock,
      });
      expect(res).equal("OK");
    });
  });
};
describe("create new SKUItem", () => {
  testCreateSKUItem("2", "1", "25/12/2021");
});


function testGetSKUItemByRFID(RFID) {
  describe("get SKUItem", () => {
    test('getting SKUItem', async () => {
      const res = await db.getSkuItemByRFID(RFID);
      let rfid = res.rfid;
      expect(parseInt(rfid)).equal(RFID);
    });
  });
};
describe("get SKUItemByRFID", () => {
  testGetSKUItemByRFID(2);
});




function testGetSKUItemBySkuIdndIsAvailable(SKUId) {
  describe("get SKUItem", () => {
    test('getting SKUItem', async () => {
      const res = await db.getSkuItemsBySkuIdAndIsAvailable(SKUId);
      let skuid = res.skuId;
      expect(parseInt(skuid)).equal(SKUId);
    });
  });
};
describe("get SKUItemByRFID", () => {
  testGetSKUItemBySkuIdndIsAvailable(1);
});





function testUpdateSKUItem(id, rfid, skuId, dateOfStock, available) {
  describe("update SKUItem", () => {
    test('updating SKUItem', async () => {
      let res = await db.updateSkuItem({
        id: id,
        rfid: rfid,
        skuId: skuId,
        dateOfStock: dateOfStock,
        available: available,
      })
      expect(res).equal("OK");
    });
  });
};
describe("update SKUItem", () => {
  testUpdateSKUItem(2, 2, 1, "25/12/2021", 1);
});




function testDeleteSKUItemByRFID(RFID) {
  describe("delete an SKUItem", () => {
    test('deleting SKUItem', async () => {
      let res = await db.deleteSkuItemByRFID(RFID);
      expect(res).equal("OK");
    });
  });
};
describe("test update SKU", () => {
  testDeleteSKUItemByRFID(1);
});




////////////////////////////////////////////////
////////////////Position////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////Position////////////////////////
////////////////////////////////////////////////




function testCreatePosition(positionId, aisleId, row, col, maxWeight, maxVolume) {
  describe("create new Position", () => {
    test('creating position', async () => {
      let res = await db.createPosition({
        positionId: positionId,
        aisleId: aisleId,
        row: row,
        column: col,
        maxWeight: maxWeight,
        maxVolume: maxVolume,
      });
      expect(res).equal("OK");
    });
  });
};
describe("test", () => {
  testCreatePosition(13, 34, 18, 26, 160, 144);
});




function testGetPositionById(id) {
  describe("get position by ID", () => {
    test('getting position', async () => {
      const res = await db.getPositionByPositionId(id);
      let ID = res.positionId;
      expect(parseInt(ID)).equal(id);
    });
  });
};
describe("test", () => {
  testGetPositionById(13);
});




// function testGetPositionBySkuId(id) {
//   describe("get position by SkuID", () => {
//     test('getting position', async () => {
//       const res = await db.getPositionByPositionSkuId(id);
//       let ID = res.positionId;
//       expect(parseInt(ID)).equal(id);
//     });
//   });
// };
// describe("test", () => {
//   testGetPositionBySkuId(13);
// });




function testUpdatePosition(id, positionId, aisleId, row, col, maxWeight, maxVolume, skuId) {
  describe("update position", () => {
    test('updating position', async () => {
      let res = await db.updatePosition({
        id: id,
        positionId: positionId,
        aisleId: aisleId,
        row: row,
        column: col,
        maxWeight: maxWeight,
        maxVolume: maxVolume,
        skuId: skuId,
      });
      expect(res).equal("OK");
    });
  });
};
describe("update Position", () => {
  testUpdatePosition(2, 12, 100000, 18, 266, 160, 144, 7 );
});



function testDeletePositionById(positionId) {
  describe("delete a Position", () => {
    test('deleting Position', async () => {
      let res = await db.deletePositionById(positionId)
      expect(res).equal("OK");
    });
  });
};
describe("test update SKU", () => {
  testDeletePositionById(12);
});




////////////////////////////////////////////////
////////////////TestDescriptor////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////TestDescriptor////////////////////////
////////////////////////////////////////////////




function testCreateTestDescriptor(name, procedureDescription, skuId) {
  describe("create new TestDescriptor", () => {
    test('creating TestDescriptor', async () => {
      const res = await db.createTestDescriptor({
        name: name,
        procedureDescription: procedureDescription,
        skuId: skuId,
      });
      expect(res).equal("OK");
    });
  });
};

describe("create TESTDESCRIPTOR", () => {
  testCreateTestDescriptor("siliconTest", "testing edurance", 1);
});




function testGetTestDescriptorById(id) {
  describe("get TestDescriptor by ID", () => {
    test('getting TestDescriptor', async () => {
      const res = await db.getTestDescriptorById(id);
      let ID = res.id;
      expect(parseInt(ID)).equal(id);
    });
  });
};
describe("test", () => {
  testGetTestDescriptorById(2);
});



function testGetTestDescriptorsBySkuId(SKUid) {
  describe("get TestDescriptor by SkuID", () => {
    test('getting TestDescriptor', async () => {
      const res = await db.getTestDescriptorsBySkuId(SKUid);
      let skuId = res[0].skuId;
      expect(parseInt(skuId)).equal(SKUid);
    });
  });
};
describe("test", () => {
  testGetTestDescriptorsBySkuId(1);
});




function testUpdateTestDescriptor(id, name, procedureDescription, skuId) {
  describe("update TestDescriptor", () => {
    test('updating TestDescriptor', async () => {
      let res = await db.updateTestDescriptor({
        id: id,
        name: name,
        procedureDescription: procedureDescription,
        skuId: skuId,
      });
      expect(res).equal("OK");
    });
  });
};
describe("update TESTDESCRIPTOR", () => {
  testUpdateTestDescriptor(1, "ceramic test", "testing", 1);
});




function testDeleteTestDescriptorById(id) {
  describe("delete a TestDescriptor", () => {
    test('deleting TestDescriptor', async () => {
      let res = await db.deleteTestDescriptorById(id)
      expect(res).equal("OK");
    });
  });
};
describe("test update SKU", () => {
  testDeleteTestDescriptorById(1);
});




////////////////////////////////////////////////
////////////////TestResult//////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////TestResult//////////////////////
////////////////////////////////////////////////




function testCreateTestResult(idTestDescriptor, date, result, rfid) {
  describe("create new TestResult", () => {
    test('creating TestResult', async () => {
      const res = await db.createTestResult({
        idTestDescriptor: idTestDescriptor,
        date: date,
        result: result,
        rfid: rfid,
      });
      expect(res).equal("OK");
    });
  });
};
describe("create TESTRESULT", () => {
  testCreateTestResult(12, "11/12/2021", "passed", 18);
});




function testGetTestResultById(id) {
  describe("get TestResult by ID", () => {
    test('getting TestResult', async () => {
      const res = await db.getTestResultById(id);
      let ID = res.id;
      expect(parseInt(ID)).equal(id);
    });
  });
};
describe("test", () => {
  testGetTestResultById(2);
});


function testGetTestResultByRFID(id) {
  describe("get TestResult by ID", () => {
    test('getting TestResult', async () => {
      const res = await db.getTestResultsByRFID(id);
      let ID = res[0].rfid;
      expect(parseInt(ID)).equal(id);
    });
  });
};
describe("test", () => {
  testGetTestResultByRFID(18);
});




function testUpdateTestResult(id, idTestDescriptor, date, result, rfid) {
  describe("update TestResult", () => {
    test('updating TestResult', async () => {
      let res = await db.updateTestResult({
        id: id,
        idTestDescriptor: idTestDescriptor,
        date: date,
        result: result,
        rfid: rfid,
      });
      expect(res).equal("OK");
    });
  });
};
describe("update TESTRESULT", () => {
  testUpdateTestResult(1, 1, "ceramic test", "testing", 1);
});




function testDeleteTestResultByRFIDAndId(RFID, id) {
  describe("delete a TestResult", () => {
    test('deleting TestResult', async () => {
      let res = await db.deleteTestResultByRFIDAndID(RFID, id)
      expect(res).equal("OK");
    });
  });
};
describe("test update SKU", () => {
  testDeleteTestResultByRFIDAndId(1, 2);
});




//////////////////////////////////////////
////////////////User//////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
////////////////User//////////////////////
//////////////////////////////////////////




function testCreateUser(username, name, surname, password, type) {
  describe("create new User", () => {
    test('create User', async () => {
      let res = await db.createUser ({
        username: username,
        password: password,
        name: name,
        surname: surname, 
        type: type,
      });
      expect(res).equal("OK");
    });
  });
};
describe ("create User", () => {
      // async () => {
      //   const res = await db.getUserByUsername("morre@gmail.com");
      //   let ID = res[0].id;
      //   db.deleteUser(ID);
      // }
    testCreateUser("morre@gmail.com", "luke", "morisio", "testpassword", "clerk" );
});




function testGetUserByUsername(userName) {
  describe("get user by username", () => {
    test('get user', async () => {
      const res = await db.getUserByUsername(userName);
      let userNAME = res[0].username;
      let USERName = "morre@gmail.com";
      expect(USERName).equal(userNAME);
    });
  });
};
describe(" get user ", () => {
  testGetUserByUsername("morre@gmail.com");
});




function testDeleteUser(id) {
  describe("delete user by username", () => {
    test('delete user', async () => {
      let res = await db.deleteUser(id);
      expect(res).equal("OK");
    })
  })
}
describe("delete user", () => {
  testDeleteUser(17);
});




////////////////////////////////////////////////
////////////////RestockOrder////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////RestockOrder////////////////////
////////////////////////////////////////////////




// function testCreateRestockOrder(idTestDescriptor, date, result, rfid) {
//   describe("create new RestockOrder", () => {
//     test('creating RestockOrder', async () => {
//       const res = await db.createRestockOrder({
//         idTestDescriptor: idTestDescriptor,
//         date: date,
//         result: result,
//         rfid: rfid,
//       });
//       expect(res).equal("OK");
//     });
//   });
// };
// describe("create RESTOCKORDER", () => {
//   testCreateRestockOrder(12, "11/12/2021", "passed", 18);
// });




// function testGetRestockOrderById(id) {
//   describe("get RestockOrder by ID", () => {
//     test('getting RestockOrder', async () => {
//       const res = await db.getRestockOrderById(id);
//       let ID = res.id;
//       console.log(ID);
//       expect(ID).equal(id);
//     });
//   });
// };
// describe("test", () => {
//   testGetRestockOrderById(1);
// });




// function testUpdateRestockOrder(id, idTestDescriptor, date, result, rfid) {
//   describe("update RestockOrder", () => {
//     test('updating RestockOrder', async () => {
//       let res = await db.updateRestockOrder({
//         id: id,
//         idTestDescriptor: idTestDescriptor,
//         date: date,
//         result: result,
//         rfid: rfid,
//       });
//       expect(res).equal("OK");
//     });
//   });
// };
// describe("update TESTRESULT", () => {
//   testUpdateRestockOrder(1, 1, "ceramic test", "testing", 1);
// });
>>>>>>> ecb690754a9123af1d5e2e21bfaab444abbbbc5c
