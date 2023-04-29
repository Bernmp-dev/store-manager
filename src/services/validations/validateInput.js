const { idSchema, addProductSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  console.log(error);
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  
  return { type: null, message: '' };
};

const validateNewProduct = (product) => {
  const { error } = addProductSchema.validate(product);

  if (error) {
    const { type, message } = error.details[0];
    if (type === 'any.required') {
      return { type: 'EMPTY_FIELD', message };
    }

    if (type === 'string.min') {
      return { type: 'INVALID_VALUE', message };
    }
  }
  
    return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
};
