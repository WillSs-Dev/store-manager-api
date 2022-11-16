const db = require('./connection');

const add = async (body, saleId) => {
  body.forEach(async ({ productId, quantity }) => {
    await db.query(`INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?)`, [saleId, productId, quantity]);
  });
};

module.exports = { add };