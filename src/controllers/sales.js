const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const registerSale = async (req, res) => {
  const { type, message } = await salesService.registerSale(req.body);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

module.exports = {
  registerSale,
};