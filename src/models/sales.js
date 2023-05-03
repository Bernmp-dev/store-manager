const connection = require('./connection');

const registerSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales ( date ) VALUE ( NOW() )',
  );

return insertId;
};

const registerSaleProduct = async (saleId, productId, quantity) => {
  const [{ affectedRows }] = await connection.execute(
    'INSERT INTO sales_products ( sale_id, product_id, quantity ) VALUE ( ?, ?, ? )',
    [saleId, productId, quantity],
  );

  return affectedRows;
};

module.exports = {
  registerSale,
  registerSaleProduct,
};