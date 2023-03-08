const { expect } = require('chai');

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const getSkuById = (req, expectedHTTPStatus) => {
    describe('get sku by id', () => {

        it('getting sku by id', async () => {
            await agent
                .get('/api/skus/'+req)
                .then((res) => {
                res.should.have.status(expectedHTTPStatus);   
            })
        })
    })
}

const getSkus = (expectedHTTPStatus) => {
    describe('get sku by id', () => {

        it('getting sku by id', async () => {
            await agent
                .get('/api/skus/')
                .then((res) => {
                res.should.have.status(expectedHTTPStatus);   
            })
        })
    })
}

const createSku = (description, weight, volume, notes, price, availableQuantity, expectedHTTPStatus) => {
    describe('create sku', () => {

        it('creating sku', async () => {
            let sku = { 
                description:description,
                weight:weight,
                volume:volume,
                notes:notes,
                price:price,
                availableQuantity:availableQuantity, 
            }
            await agent
                .post('/api/sku/')
                .send(sku)
                .then((res) => {
                res.should.have.status(expectedHTTPStatus);   
            })
        })
    })
}

const updateSku = (id, description, weight, volume, notes, price, availableQuantity, expectedHTTPStatus) => {
    describe('update sku', () => {

        it('updating sku', async () => {
            let sku = { 
                description:description,
                weight:weight,
                volume:volume,
                notes:notes,
                price:price,
                availableQuantity:availableQuantity, 
            }
            await agent
                .put('/api/sku/'+id)
                .send(sku)
                .then((res) => {
                res.should.have.status(expectedHTTPStatus); 
                res.body.id.should.equal(id);  
                res.body.id.should.equal(description);
                res.body.id.should.equal(weight);
                res.body.id.should.equal(volume);
                res.body.id.should.equal(notes);
                res.body.id.should.equal(price);
                res.body.id.should.equal(availableQuantity);
            })
        })
    })
}

const startTesting = async () => {
    await agent.post('/api/managerSessions')
      .send({username : "manager1@ezwh.com", password: "testpassword"})
      .then((err,res) => {});
      
    getSkuById(100, 404);
    getSkuById(1, 200);
    getSkuById(-1, 404);
    getSkuById(0, 422);
    getSkus(200);
    createSku("description", 50, 12, "notes", 18, 125, 201);
    createSku("", 30, 12, "notes", 18, 0, 422);
    createSku("", 20, 12, "notes", 0, 125, 422);
    createSku("", 10, 0, "", 18, 125, 422);
    createSku("", 0, 12, "notes", 18, 125, 422);
    updateSku(1, "test", 7, 13, "notes", 19, 126, 201);
    updateSku(4, "", 16, 15, "notes", 4, 9, 422);
    updateSku(2, "prova", 4, 9, "notes", 71, 25, 201);
  }
  
const skuTests = async (app) => {
  agent = chai.request.agent(app);
  await startTesting();
}

module.exports = skuTests;