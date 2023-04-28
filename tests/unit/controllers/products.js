const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = require('chai');
chai.use(sinonChai);


const { productList } = require('../mocks/products.mock');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

describe('Testando camada controller de produtos ', function () {
  describe('Recuperando lista de produtos', function () {

  beforeEach(function () {
    sinon.restore();
  });

    it('Deve retornar o status 200 e a lista', async function () {
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'listProducts')
        .resolves({ type: null, message: productList });

      await productsController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productList);
    });

    it('Deve retornar um erro 422 quando a lista não for encontrada', async function () {

      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'listProducts')
        .resolves({ type: 'INVALID_VALUE', message: 'Lista nao encontrada' });

      await productsController.listProducts(req, res);

      expect(res.status.calledWith(422)).to.be.true;
      expect(res.json.calledWith('Lista nao encontrada')).to.be.true;
      });
  
  });

  describe('Recuperando produto por id', function () {

        beforeEach(function () {
    sinon.restore();
        });
    
    it('deve responder com 200 e os dados do banco quando existir', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'findById')
        .resolves({ type: null, message: productList[0] });

      await productsController.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productList[0]);
    });

    it('ao passar um id inválido deve retornar um erro', async function () {
      const res = {};
      const req = {
        params: { id: 'abc' }, 
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'findById')
        .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });

      await productsController.findById(req, res);

      expect(res.status).to.have.been.calledWith(422); 
      expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
    });

    it('ao passar um id que não existe no banco deve retornar um erro', async function () {
      const res = {};
      const req = {
        params: { id: 9999 }, 
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
 
      sinon
        .stub(productsService, 'findById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await productsController.findById(req, res);

      expect(res.status).to.have.been.calledWith(404); 
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
});