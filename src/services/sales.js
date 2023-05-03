const { salesModel } = require('../models');

const registerSale = async (sale) => {
  const saleId = await salesModel.registerSale();
  console.log('-------------------------------', sale);
  console.log('-------------------------------', saleId);

  if (saleId && sale) {
      await Promise.all(sale.map(({ productId, quantity }) => salesModel
    .registerSaleProduct(saleId, productId, quantity)));
  }

  const newSale = sale.map(({ productId, quantity }) => ({ saleId, productId, quantity }));

  return { type: null, message: newSale };
};

module.exports = {
  registerSale,
};
