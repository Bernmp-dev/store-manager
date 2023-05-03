const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const registerSale = async (req, res) => {
  const { type, message } = await salesService.registerSale(req.body);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

const listSales = async (_req, res) => {
    const { type, message } = await salesService.listSales();

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

module.exports = {
  registerSale,
  listSales,
};