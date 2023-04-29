const { idSchema, addProductSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  
  return { type: null, message: '' };
};

const validateNewProduct = (product) => {
  const { error } = addProductSchema.validate(product);

  if (error) return { type: 'INVALID_VALUE', message: error.message };
  
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
};
