const { idSchema, addProductSchema, salesSchema } = require('./schemas');
const { productsModel } = require('../../models');
const statusGen = require('../../utils/statusGen');

const validateId = (id) => {
  const { error } = idSchema.validate(id);

  if (error) {
    const { type, message } = error.details[0];
    return statusGen(type, message);
  }
  
  return statusGen();
};

const validateNewProduct = (product) => {
  const { error } = addProductSchema.validate(product);

  if (error) {
    const { type, message } = error.details[0];
    return statusGen(type, message);
  }
  
    return statusGen();
};

const validateNewSale = async (sale) => {
  const { error } = salesSchema.validate(sale);

  if (error) {
    const { type, message } = error.details[0];
    return statusGen(type, message);
  }
  
  return statusGen();
};

const validateSaleByProductId = async (sale) => {
  const promises = sale
    .map(({ productId }) => productsModel.findProductById(productId));
  
  const results = await Promise.all(promises);

  if (results.includes(undefined)) {
    return statusGen('NOT_FOUND', 'Product not found');
  }

  return statusGen();
};

module.exports = {
  validateId,
  validateNewProduct,
  validateNewSale,
  validateSaleByProductId,
  // validateSaleId,
};
