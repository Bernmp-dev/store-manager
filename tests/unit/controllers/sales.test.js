const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = require('chai');
chai.use(sinonChai);


const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { salesListMock, registerSaleMock, newSale } = require('../mocks/sales.mock')

describe('Testando camada service de vendas ', function () {

  beforeEach(function () {
    sinon.restore();
  });

  it('Recuperando lista de vendas', async function () {
    const res = {};
    const req = {};
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(salesService, 'listSales')
      .resolves({ type: null, message: salesListMock });
    
    await salesController.listSales(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesListMock);
  });

    it('Deve retornar com 200 e os dados quando o venda existir', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(salesService, 'findSaleById')
      .resolves({ type: null, message: salesListMock[0] });
    
    await salesController.findSaleById(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesListMock[0]);
    });
  
    it('Deve retornar com 400 quando o venda nao conter productId', async function () {
    const res = {};
    const req = {
      body: {
      "id": 3,
      "itemsSold": [
        {
          "quantity": 1
        },
        {
          "productId": 3,
          "quantity": 5
        }
      ]
    },
    };
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(salesService, 'registerSale')
      .resolves({ type: 'any.required', message: '"productId" is required' });
    
    await salesController.registerSale(req, res);
    
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    });
  
    it('Deve retornar com 400 quando o venda nao conter quantity', async function () {
    const res = {};
    const req = {
      body: {
      "id": 3,
      "itemsSold": [
        {
          "productId": 1,
        },
        {
          "productId": 3,
          "quantity": 5
        }
      ]
    },
    };
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(salesService, 'registerSale')
      .resolves({ type: 'any.required', message: '"quantity" is required' });
    
    await salesController.registerSale(req, res);
    
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
    });
  
    it('Deve retornar com 400 quando o venda nao conter quantity', async function () {
    const res = {};
      const req = {
        body:
          [
            {
              "productId": 1,
              "quantity": 1
            },
            {
              "productId": 3,
              "quantity": 5
            }
          ]
      };
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(salesService, 'registerSale')
      .resolves({ type: null, message: req.body });
    
    await salesController.registerSale(req, res);
    
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(req.body);
    });
});
