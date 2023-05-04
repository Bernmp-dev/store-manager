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
    
    it('Deve retornar com 200 e os dados quando o produto existir', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'findProductById')
        .resolves({ type: null, message: productList[0] });

      await productsController.findProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productList[0]);
    });

    it('Deve retornar um erro e status 422 se o id for invalido', async function () {
      const res = {};
      const req = {
        params: { id: 'abc' }, 
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'findProductById')
        .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });

      await productsController.findProductById(req, res);

      expect(res.status).to.have.been.calledWith(422); 
      expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
    });

    it('Deve retornar um erro e status 404 se o id nao existe', async function () {
      const res = {};
      const req = {
        params: { id: 9999 }, 
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
 
      sinon
        .stub(productsService, 'findProductById')
        .resolves({ type: 'NOT_FOUND', message: 'Product not found' });

      await productsController.findProductById(req, res);

      expect(res.status).to.have.been.calledWith(404); 
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('Deve retornar um erro e status 201 se criacao de novo produto for bem sucedida', async function () {
      const res = {};
      const req = {
        body: { name: 'Produto Teste' }, 
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
 
      sinon
        .stub(productsService, 'createProduct')
        .resolves({ type: null, message: req.body });

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201); 
      expect(res.json).to.have.been.calledWith(req.body);
    });
  });
});