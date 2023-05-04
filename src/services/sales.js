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

  error = await schema.validateSaleByProductId(sale);
  if (error.type) return error;

  const saleId = await salesModel.registerSale();

  return registerSaleProduct(sale, saleId);
};

const listSales = async () => {
  let salesList = await salesModel.listSales();

  if (!salesList) {
    return statusGen('NOT_FOUND', 'Sale not found');
  }

  salesList = salesList.map(({ 
    sale_id: saleId,
    product_id: productId,
    quantity,
    date,
  }) => ({ saleId, date, productId, quantity }));

  return statusGen(null, salesList);
};

const findSaleById = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;

  let sale = await salesModel.findSaleById(id);

  if (!sale || sale.length <= 0) {
    return statusGen('NOT_FOUND', 'Sale not found');
  }

  sale = sale.map(({ 
  date,
  product_id: productId,
  quantity,
  }) => ({ date, productId, quantity }));

  return statusGen(null, sale);
};

module.exports = {
  registerSale,
  listSales,
  findSaleById,
};
