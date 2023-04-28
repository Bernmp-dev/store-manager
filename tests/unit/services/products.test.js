const { expect } = require('chai');
const sinon = require('sinon');


const { productList } = require('../mocks/products.mock');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');


describe('Testando camada service de produtos', function () {

  beforeEach(function () {
    sinon.restore();
  });
  
  it('Recuperando lista de produtos', async function () {

    sinon.stub(productsModel, 'listProducts').resolves(productList);

    const result = await productsService.listProducts();
    
    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(productList);
  });

    it('Recuperando produtos po id', async function () {

    sinon.stub(productsModel, 'findById').resolves([productList[0]]);

    const result = await productsService.findById(1);
    
    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal([productList[0]]);
  });
});
