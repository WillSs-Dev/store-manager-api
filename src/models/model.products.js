const db = require('./connection');

const getAll = async () => {
  const [result] = await db.query('SELECT * FROM StoreManager.products');
  return result;
};

const getAllProductIds = async () => {
  const [result] = await db.query('SELECT id FROM StoreManager.products');
  return result;
};

const getById = async (id) => {
  const [[result]] = await db.query('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  return result;
};

const add = async (name) => {
  await db.query('INSERT INTO StoreManager.products (name) VALUES (?)', [name]);
  const [[newProduct]] = await db
    .query('SELECT * FROM StoreManager.products WHERE name = ?', [name]);
  return newProduct;
};

module.exports = { getAll, getById, add, getAllProductIds };