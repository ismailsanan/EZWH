const app = require('../server');

//const returnOrderTests = require('./return-order-tests');
//const skuTests = require('./sku-tests');
//const itemTests = require('./item-tests');
const positionTests = require('./position-tests');
//TODO all tests

describe('start api tests', () => {
//   it('launch return order tests', async () => {
//     await returnOrderTests(app);
//   })
  
  // it('launch sku tests', async () => {
  //  await skuTests(app);
  // })
  // it('launch skuItem tests', async () => {
  //   await itemTests(app);
  // })

  it('launch position tests', async () => {
    await positionTests(app);
  })

})