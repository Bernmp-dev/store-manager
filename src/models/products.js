const connection = require('./connection');

const listProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  return result;
};

module.exports = {
  listProducts,
};