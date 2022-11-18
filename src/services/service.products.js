const productsModel = require('../models/model.products');

const OK = 1;
const ERROR = 0;

const requestAll = async () => {
  const result = await productsModel.getAll();
  return result;
};

const requestByQuery = async (query) => {
  if (!query) {
    const result = await productsModel.getAll();
    return { type: OK, data: result };
  }
  const result = await productsModel.getByQuery(`%${query}%`);
  if (result) {
    return { type: OK, data: result };
  }
  return { tyep: ERROR };
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

const requestChangeById = async (id, name) => {
  const product = await productsModel.getById(id);
  if (product) {
    const updatedProduct = await productsModel.changeById(id, name);
    return { type: OK, data: updatedProduct };
  }
  return { type: ERROR };
};

const requestDeleteById = async (id) => {
  const product = await productsModel.getById(id);
  if (product) {
    await productsModel.deleteById(id);
    return { type: OK };
  }
  return { type: ERROR };
};

module.exports = {
  requestAll,
  requestByQuery,
  requestById,
  create,
  requestChangeById,
  requestDeleteById,
};
