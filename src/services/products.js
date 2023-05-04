const { productsModel } = require('../models');
const schema = require('./validations/validateInput');
const statusGen = require('../utils/statusGen');

const listProducts = async () => {
  const products = await productsModel.listProducts();
  return statusGen(null, products);
};

const findProductById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const product = await productsModel.findProductById(productId);
  if (!product) return statusGen('NOT_FOUND', 'Product not found');

  return statusGen(null, product);
};

const createProduct = async (product) => {
  const error = schema.validateNewProduct(product);
  if (error.type) return error;

  const newProductId = await productsModel.createProduct(product);
  const newProduct = await productsModel.findProductById(newProductId);

  return statusGen(null, newProduct);
};
const updateProduct = async ({ id, name }) => {
  let error = await findProductById(id);
  if (error.type) return error;

  error = schema.validateNewProduct({ name });
  if (error.type) return error;

  const affectedRows = await productsModel.updateProduct({ id, name });
  if (affectedRows <= 0) return statusGen('DATABASE_ERROR', 'Erro no banco de dados');

  return statusGen(null, { id, name });
};

const deleteProduct = async (id) => {
  const error = await findProductById(id);
  if (error.type) return error;

  const affectedRows = await productsModel.deleteProduct(id);

  if (affectedRows <= 0) return statusGen('DATABASE_ERROR', 'Erro no banco de dados');

  return statusGen();
};

module.exports = {
  listProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};