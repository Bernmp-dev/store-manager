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

const listSales = async () => {
  const [result] = await connection.execute(
    `SELECT sp.*, s.date
    FROM sales_products sp
    JOIN sales s ON s.id = sp.sale_id
    ORDER BY sp.sale_id ASC, sp.product_id ASC`,
  );

  return result;
};

const findSaleById = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT sp.*, s.date 
    FROM sales_products sp 
    JOIN sales s ON sp.sale_id = s.id 
    WHERE sp.sale_id = ?
    ORDER BY sp.sale_id ASC, sp.product_id ASC`,
    [saleId],
  );

  return result;
};

module.exports = {
  registerSale,
  registerSaleProduct,
  listSales,
  findSaleById,
};