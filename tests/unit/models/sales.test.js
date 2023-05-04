const { expect } = require('chai');
const sinon = require('sinon');


const connection = require('../../../src/models/connection');
const { salesListMock, salesByIdMock, registerSaleMock } = require('../mocks/sales.mock');
const { salesModel } = require('../../../src/models')

describe('Testando camada Model de Vendas', function () {

  beforeEach(function () {
    sinon.restore();
  })

  it('Recuperando lista de vendas', async function () {
    sinon.stub(connection, 'execute').resolves([salesListMock])
    const result = await salesModel.listSales();

    expect(result).to.be.deep.equal(salesListMock)
  })

  it('Recuperando produtos por id', async function () {
    sinon.stub(connection, 'execute').resolves([salesByIdMock])
    const result = await salesModel.findSaleById(1);

    expect(result).to.be.deep.equal(salesByIdMock)
  });

  it('Registrando venda na tabela "sales"', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }])
    const result = await salesModel.registerSale();

    expect(result).to.be.equal(1)
    expect(connection.execute).to.have.been.calledWith(
      'INSERT INTO sales ( date ) VALUE ( NOW() )',
    );
  });

    it('Registrando venda na tabela "sales_products"', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }])
    const result = await salesModel.registerSaleProduct(1, 1, 5);

    expect(result).to.be.equal(1)
    expect(connection.execute).to.have.been.calledWith(
      `INSERT INTO sales_products ( sale_id, product_id, quantity ) VALUE ( ?, ?, ? )`,
    );
  });
})