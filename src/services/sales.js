const { salesModel } = require('../models');
const schema = require('./validations/validateInput');
const statusGen = require('../utils/statusGen');

const registerSaleProduct = async (sale, saleId) => {
  const promises = sale.map(({ productId, quantity }) => salesModel
    .registerSaleProduct(saleId, productId, quantity));
  
  await Promise.all(promises);

  const newSale = { id: saleId };

  newSale.itemsSold = sale
    .map(({ productId, quantity }) => ({ productId, quantity }));

  return statusGen(null, newSale);
};

const registerSale = async (sale) => {
  let error = await schema.validateNewSale(sale);
  if (error.type) return error;

  error = await schema.findId(sale);
  if (error.type) return error;

  const saleId = await salesModel.registerSale();

  return registerSaleProduct(sale, saleId);
};

module.exports = {
  registerSale,
};
