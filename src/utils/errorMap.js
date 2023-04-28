const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  INVALID_VALUE: 422,
  TRAVEL_NOT_FOUND: 404,
  TRAVEL_CONFLICT: 409,
  DATABASE_ERROR: 500,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  mapError,
};