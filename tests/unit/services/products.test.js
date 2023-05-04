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

  it('Recuperando produtos po id com sucesso', async function () {

    sinon.stub(productsModel, 'findProductById').resolves([productList[0]]);

    const result = await productsService.findProductById(1);
    
    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal([productList[0]]);
  });
  
  describe('Criando e inserindo produto no banco de dados', function () {

    beforeEach(function () {
      sinon.restore()
    });
      
    it('A chave name deve existir', async function () {
      sinon.stub(productsModel, 'findProductById').resolves({ id: 1});
      const result = await productsService.createProduct({ id: 1 });

      expect(result.type).to.equal('any.required');
      expect(result.message).to.deep.equal('"name" is required');
    });

    it('Chave name deve ter no mínimo 5 caracteres', async function () {
      sinon.stub(productsModel, 'findProductById').resolves({ id: 1, name: 'aaa' });

      const result = await productsService.createProduct({ id: 1, name: 'aaa' });

      expect(result.type).to.equal('string.min');
      expect(result.message).to.deep.equal('"name" length must be at least 5 characters long');
    });
    
    it('Retorna objeto vazio se produto é válido', async () => {
      const validProduct = { name: 'Produto válido' };

      sinon.stub(productsModel, 'findProductById').resolves(validProduct);

      const result = await productsService.createProduct(validProduct);
      
      expect(result).to.have.property('type', null);
      expect(result).to.have.property('message', validProduct);
    });
  });
});
