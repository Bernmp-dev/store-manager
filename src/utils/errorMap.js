const errorMap = {
  EMPTY_FIELD: 400,
  PRODUCT_NOT_FOUND: 404,
  INVALID_VALUE: 422,
  DATABASE_ERROR: 500,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  mapError,
};