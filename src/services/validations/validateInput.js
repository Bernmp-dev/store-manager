const { idSchema, addProductSchema, salesSchema } = require('./schemas');
const { productsModel } = require('../../models');

const statusGen = (type = null, message = '') => ({ type, message }); 

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

const findId = async (_res, req, next) => {
  if (req.body) {
    const promises = req.body
      .map(({ productId: pId }) => productsModel.findById(pId));
  
    const results = await Promise.all(promises);

    if (results.includes(undefined)) {
      return statusGen('NOT_FOUND', 'Product not found');
    }
    return next();
  }

  return next();
};

const validateNewSale = async (_res, req, next) => {
  const { error } = salesSchema.validate(req.body);

  if (error) {
    const { type, message } = error.details[0];
    return statusGen(type, message);
  }
  
  return next();
};

module.exports = {
  validateId,
  validateNewProduct,
  validateNewSale,
  findId,

};
