const camelcaseKeys = require('camelcase-keys');
const db = require('./connection');

const getAll = async () => {
  const [result] = await db.query(
    `SELECT sale_id, date, product_id, quantity
    FROM StoreManager.sales
    INNER JOIN StoreManager.sales_products
    GROUP BY sale_id, date, product_id, quantity
    ORDER BY sale_id`,
  );
  return camelcaseKeys(result);
};

const getById = async (id) => {
  const [result] = await db.query(
    `SELECT date, product_id, quantity
    FROM StoreManager.sales
    INNER JOIN StoreManager.sales_products
    WHERE sale_id = ?
    GROUP BY sale_id, date, product_id, quantity`,
    [id],
  );
  return camelcaseKeys(result);
};

const getAllSalesId = async () => {
  const [result] = await db.query('SELECT id FROM StoreManager.sales');
  return result;
};

const add = async (id) => {
  await db.query('INSERT INTO StoreManager.sales (id) VALUES (?)', [id]);
};

const deleteById = async (id) => {
  await db.query('DELETE FROM StoreManager.sales WHERE id = ?', [id]);
};

module.exports = { getAll, getById, getAllSalesId, add, deleteById };
