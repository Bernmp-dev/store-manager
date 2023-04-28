const { expect } = require('chai');
const sinon = require('sinon');


const connection = require('../../../src/models/connection');
const { productList } = require('../mocks/products.mock');
const { productsModel } = require('../../../src/models')

describe('Testando camada Model de produtos', function () {

  beforeEach(function () {
    sinon.restore();
  });

  it('Recuperando lista de produtos', async function () {

    sinon.stub(connection, 'execute').resolves([productList])
    const result = await productsModel.listProducts();

    expect(result).to.be.deep.equal(productList)
  });

    it('Recuperando produto por id', async function () {
    
    sinon.stub(connection, 'execute').resolves([productList[0]])
    const result = await productsModel.findById(1);

    expect(result).to.be.deep.equal(productList[0])
  });
});