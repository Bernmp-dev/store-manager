const { productsModel } = require('../models');

const listProducts = async () => {
  const products = await productsModel.listProducts();
  return { type: null, message: products };
};

module.exports = {
  listProducts,
};