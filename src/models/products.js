const connection = require('./connection');

const listProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  return result;
};

const findProductById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );

  return result;
};

const createProduct = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products ( name ) VALUE ( ? )',
    [product.name],
  );

  return insertId;
};

const updateProduct = async ({ name, id }) => { 
    const [affectedRows] = await connection.execute(
      `UPDATE products
      SET name = ?
      WHERE id = ?;`,
    [name, id],
  );

  return affectedRows;
};

const deleteProduct = async (id) => {
  const [affectedRows] = await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
  );
  
  return affectedRows;
};

module.exports = {
  listProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
