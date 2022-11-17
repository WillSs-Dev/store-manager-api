const productsService = require('../services/service.products');

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const NOT_FOUND_STATUS = 404;

const fetchAll = async (res) => {
  res.status(OK_STATUS).json(await productsService.requestAll());
};

const fetchById = async (id, res) => {
  const { type, data } = await productsService.requestById(id);
  if (type) {
    return res.status(OK_STATUS).json(data);
  }
  res.status(NOT_FOUND_STATUS).json({ message: 'Product not found' });
};

const insert = async (name, res) => {
  res.status(CREATED_STATUS).json(await productsService.create(name));
};

const update = async (id, name, res) => {
  const { type, data } = await productsService.requestChangeById(id, name);
  if (type) {
    return res.status(OK_STATUS).json(data);
  }
  res.status(NOT_FOUND_STATUS).json({ message: 'Product not found' });
};

module.exports = { fetchAll, fetchById, insert, update };