const salesService = require('../services/service.sales');

// const OK_STATUS = 200;
const CREATED_STATUS = 201;
const NOT_FOUND_STATUS = 404;

const insert = async (body, res) => {
  const { type, data } = await salesService.create(body);
  if (type) {
    return res.status(CREATED_STATUS).json(data);
  }
  res.status(NOT_FOUND_STATUS).json({ message: 'Product not found' });
};

module.exports = { insert };