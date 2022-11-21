const db = require('./connection');

const getAll = async () => {
  const [result] = await db.query('SELECT * FROM StoreManager.products');
  return result;
};

const getAllProductIds = async () => {
  const [result] = await db.query('SELECT id FROM StoreManager.products');
  return result;
};

const getByQuery = async (searchQuery) => {
  const [result] = await db.query(
    'SELECT * FROM StoreManager.products WHERE name LIKE ?',
    [searchQuery],
  );
  return result;
};

const getById = async (id) => {
  const [[result]] = await db.query(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return result;
};

const add = async (name) => {
  await db.query('INSERT INTO StoreManager.products (name) VALUES (?)', [name]);
  const [[newProduct]] = await db.query(
    'SELECT * FROM StoreManager.products WHERE name = ?',
    [name],
  );
  return newProduct;
};

const changeById = async (id, name) => {
  await db.query('UPDATE StoreManager.products SET name = ? WHERE id = ?', [
    name,
    id,
  ]);
  const [[updatedProduct]] = await db.query(
    'SELECT * FROM StoreManager.products WHERE name = ?',
    [name],
  );
  return updatedProduct;
};

const deleteById = async (id) => {
  await db.query('DELETE FROM StoreManager.products WHERE id = ?', [id]);
};

module.exports = {
  getAll,
  getByQuery,
  getById,
  add,
  getAllProductIds,
  changeById,
  deleteById,
};
