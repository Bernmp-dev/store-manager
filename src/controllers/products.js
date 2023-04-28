const { productsService } = require('../services');
const { errorMap } = require('../utils/errorMap');

const listProducts = async (req, res) => {
  const { type, message } = await productsService.listProducts();

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

module.exports = {
  listProducts,
};
