const { productsModel } = require('../models');
const schema = require('./validations/validateInput');

const listProducts = async () => {
  const products = await productsModel.listProducts();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const product = await productsModel.findById(productId);
  
  if (!product) {
    return {
    type: 'NOT_FOUND',
    message: 'Product not found',
   };
  }

  return { type: null, message: product };
};

const createProduct = async (product) => {
  const error = schema.validateNewProduct(product);
  if (error.type) return error;

  const newProductId = await productsModel.createProduct(product);
  const newProduct = await productsModel.findById(newProductId);

  return { type: null, message: newProduct };
};

module.exports = {
  listProducts,
  findById,
  createProduct,
};