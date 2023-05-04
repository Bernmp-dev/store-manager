const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { dataBaseListMock, salesListMock } = require('../mocks/sales.mock')

describe('Testando camada service de produtos', function () {

  beforeEach(function () {
    sinon.restore();
  });

  it('Testa registro da venda', async function () {
    const sale = [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 3 },
      ];
    
    const saleId = 1;
    
    const expectedSale = {
        id: saleId,
        itemsSold: sale,
      };
    
    sinon.stub(salesModel, 'registerSale').resolves(saleId);

    const result = await salesService.registerSale(sale);
      
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(expectedSale);
  });

  it('Recuperando lista contendo todas vendas', async function () {
    sinon.stub(salesModel, 'listSales').resolves(dataBaseListMock)

    const result = await salesService.listSales();
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(salesListMock);
  });

    it('Erro 404 ao recuperar lista contendo todas vendas', async function () {
    sinon.stub(salesModel, 'listSales').resolves(undefined)

    const result = await salesService.listSales();
    expect(result.type).to.equal('NOT_FOUND');
    expect(result.message).to.deep.equal('Sale not found');
    });
  
  it('Recuperando venda por id', async function () {
      
    const saleFromDb =
      [{
        sale_id: 2,
        product_id: 3,
        quantity: 15,
          date: '2023-05-04T00:42:01.000Z'
      }]

    const newSale =
      [{
        "date": "2023-05-04T00:42:01.000Z",
        "productId": 3,
          "quantity": 15
      }]

    sinon.stub(salesModel, 'findSaleById').resolves(saleFromDb)

    const result = await salesService.findSaleById(2);

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(newSale);
  });

    it('Erro passando string como parametro para recuperar venda por id', async function () {
    sinon.stub(salesModel, 'findSaleById').resolves([])

    const result = await salesService.findSaleById('a');

    expect(result.type).to.equal('number.base');
    expect(result.message).to.deep.equal('"value" must be a number');
    });
  
  
    it('Erro passando numero indevido como parametro para recuperar venda por id', async function () {
    sinon.stub(salesModel, 'findSaleById').resolves([])

    const result = await salesService.findSaleById(0);

    expect(result.type).to.equal('number.min');
    expect(result.message).to.deep.equal('"value" must be greater than or equal to 1');
  });
});