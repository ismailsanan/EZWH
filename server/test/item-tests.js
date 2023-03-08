const { expect } = require('chai');

const chai = require('chai');
const chaiHttp = require('chai-http');
const { getItemById } = require('../model/dbHelper');
chai.use(chaiHttp);
chai.should();

const getSkuItemById = (req, expectedHTTPStatus) => {
    describe('get skuItem by id', () => {

        it('getting skuItem by id', async () => {
            await agent
                .get('/api/skuitems/'+req)
                .then((res) => {
                res.should.have.status(expectedHTTPStatus);   
            })
        })
    })
}

const getSkuItems = (expectedHTTPStatus) => {
    describe('get skuItems by id', () => {

        it('getting skuItems', async () => {
            await agent
                .get('/api/skuitems/')
                .then((res) => {
                res.should.have.status(expectedHTTPStatus);   
            })
        })
    })
}

const createSkuItem = (RFID, SKUId, DateOfStock, expectedHTTPStatus) => {
    describe('create skuItem', () => {

        it('creating skuItem', async () => {
            let sku = { 
                RFID: RFID,
                SKUID:SKUId,
                DateOfStock:DateOfStock, 
            }
            await agent
                .post('/api/skuitem/')
                .send(sku)
                .then((res) => {
                res.should.have.status(expectedHTTPStatus);   
            })
        })
    })
}

// const updateSku = (id, description, weight, volume, notes, price, availableQuantity, expectedHTTPStatus) => {
//     describe('update sku', () => {

//         it('updating sku', async () => {
//             let sku = { 
//                 description:description,
//                 weight:weight,
//                 volume:volume,
//                 notes:notes,
//                 price:price,
//                 availableQuantity:availableQuantity, 
//             }
//             await agent
//                 .put('/api/sku/'+id)
//                 .send(sku)
//                 .then((res) => {
//                 res.should.have.status(expectedHTTPStatus); 
//                 res.body.id.should.equal(id);  
//                 res.body.id.should.equal(description);
//                 res.body.id.should.equal(weight);
//                 res.body.id.should.equal(volume);
//                 res.body.id.should.equal(notes);
//                 res.body.id.should.equal(price);
//                 res.body.id.should.equal(availableQuantity);
//             })
//         })
//     })
// }

const startTesting = async () => {
    await agent.post('/api/managerSessions')
      .send({username : "manager1@ezwh.com", password: "testpassword"})
      .then((err,res) => {});
      
    getSkuItemById(100, 404);
    getSkuItemById(-1, 422);
    getSkuItemById(0, 422);
    getSkuItemById(2, 201);
    getSkuItems(200);
    createSkuItem(12, 1, "25/12/2021", 202);
    
  }
  
const itemTests = async (app) => {
  agent = chai.request.agent(app);
  await startTesting();
}

module.exports = itemTests;