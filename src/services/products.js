const { productsModel } = require('../models');
const schema = require('./validations/validateInput');
const statusGen = require('../utils/statusGen');

const listProducts = async () => {
  const products = await productsModel.listProducts();
  return statusGen(null, products);
};

const findById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const product = await productsModel.findById(productId);
  if (!product) return statusGen('NOT_FOUND', 'Product not found');

  return statusGen(null, product);
};

const createProduct = async (product) => {
  const error = schema.validateNewProduct(product);
  if (error.type) return error;

  const newProductId = await productsModel.createProduct(product);
  const newProduct = await productsModel.findById(newProductId);

  return statusGen(null, newProduct);
};

module.exports = {
  listProducts,
  findById,
  createProduct,
};