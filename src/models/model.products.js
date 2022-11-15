const db = require('../connection');

const getProducts = async () => {
  const [result] = await db.execute('SELECT * FROM StoreManager.products');
  return result;
};

module.exports = { getProducts };