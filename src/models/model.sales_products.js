const db = require('./connection');

const add = async (body, saleId) => {
  const promissesStack = body.map(({ productId, quantity }) => db.query(
      `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?)`,
      [saleId, productId, quantity],
    ));
  return Promise.all(promissesStack);
};

module.exports = { add };
