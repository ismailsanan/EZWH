const { expect } = require('chai');

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();


const deletePositions = (positionID, expectedHTTPStatus) => {
    describe('delete position by id', () => {

        it('deleting position by id', async () => {
            await agent
                .delete('/api/position/' + positionID)
                .then((res) => {
                res.should.have.status(expectedHTTPStatus);   
            })
        })
    })
}


const getPositions = (expectedHTTPStatus) => {
    describe('get position by id', () => {

        it('getting position by id', async () => {
            await agent
                .get('/api/positions/')
                .then((res) => {
                res.should.have.status(expectedHTTPStatus);   
            })
        })
    })
}

const createPosition = (positionID, aisleID, row, col, maxWeight, maxVolume, expectedHTTPStatus) => {
    describe('create position', () => {

        it('creating position', async () => {
            let position = { 
                positionID:positionID,
                aisleID:aisleID,
                row:row,
                col:col,
                maxWeight:maxWeight,
                maxVolume:maxVolume, 
            }
            await agent
                .post('/api/position/')
                .send(position)
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
    
    getPositions(200);      
    
    createPosition(12, 34, 56, 2, 19, 98, 200);
    createPosition(0, 0, 0, 0, 0, 0, 422);
    createPosition(12, 34, 56, 2, 19, 0, 422);
    createPosition(12, 34, 56, 2, 0, 98, 422);
    createPosition(12, 34, 56, 0, 19, 98, 422);
    createPosition(12, 34, 0, 2, 19, 98, 422);
    createPosition(12, 0, 56, 2, 19, 98, 422);
    createPosition(0, 34, 56, 2, 19, 98, 422);

    deletePositions(13, 204);
    deletePositions(0, 422);
    deletePositions(1000, 404);
  }
  
const positionTests = async (app) => {
  agent = chai.request.agent(app);
  await startTesting();
}

module.exports = positionTests;