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

  it('Recuperando produtos por id', async function () {
  
    sinon.stub(connection, 'execute').resolves([[productList[0]]])
    const result = await productsModel.findById(1);
    
    expect(result).to.be.deep.equal(productList[0])
  });
  
  it('Criando e inserindo produto no banco de dados', async function () {
    const productName = 'Produto de Teste';

    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }])
    const result = await productsModel.createProduct({ name: productName });

    expect(result).to.be.equal(1)
    expect(connection.execute).to.have.been.calledWith(
      'INSERT INTO products ( name ) VALUE ( ? )',
      [productName],
    );
  });
});