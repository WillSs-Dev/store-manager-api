const productsModel = require('../models/model.products');

const OK = 1;
const ERROR = 0;

const requestAll = async () => {
  const result = await productsModel.getAll();
  return result;
};

const requestById = async (id) => {
  const product = await productsModel.getById(id);
  if (product) {
    return { type: OK, data: product };
  }
  return { type: ERROR };
};

const create = async (name) => {
  const newProduct = await productsModel.add(name);
  return newProduct;
};

module.exports = { requestAll, requestById, create };