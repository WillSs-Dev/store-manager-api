const db = require('./connection');

const getAllSalesId = async () => {
  const [result] = await db.query('SELECT id FROM StoreManager.sales');
  return result;
};

const add = async (id) => {
  await db.query('INSERT INTO StoreManager.sales (id) VALUES (?)', [id]);
};

module.exports = { getAllSalesId, add };