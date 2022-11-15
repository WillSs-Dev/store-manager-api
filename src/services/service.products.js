const { getProducts } = require('../models/model.products');

const OK_STATUS = 200;

const requestProducts = async (res) => {
  res.status(OK_STATUS).json(await getProducts());
};

module.exports = { requestProducts };