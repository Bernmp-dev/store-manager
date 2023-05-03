const errorMap = {
  'any.required': 400,
  'string.min': 422,
  'number.min': 422,
  NOT_FOUND: 404,
  INVALID_VALUE: 422,
  DATABASE_ERROR: 500,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  mapError,
  errorMap,
};