const db = require('./connection');

const add = async (body, saleId) => {
  const promisseStack = body.map(({ productId, quantity }) =>
    db.query(
      `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?)`,
      [saleId, productId, quantity],
    ));
  return Promise.all(promisseStack);
};

const changeById = async (body, saleId) => {
  const promisseStack = body.map(({ productId, quantity }) =>
    db.query(
      `UPDATE StoreManager.sales_products
    SET quantity = ?
    WHERE sale_id = ? AND product_id = ?`,
      [quantity, saleId, productId],
    ));
  return Promise.all(promisseStack);
};

module.exports = { add, changeById };
