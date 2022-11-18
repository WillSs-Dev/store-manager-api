const salesService = require('../services/service.sales');

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const NO_CONTENT_STATUS = 204;
const NOT_FOUND_STATUS = 404;

const fetchAll = async (res) => {
  res.status(OK_STATUS).json(await salesService.requestAll());
};

const fetchById = async (id, res) => {
  const { type, data } = await salesService.requestById(id);
  if (type) {
    return res.status(OK_STATUS).json(data);
  }
  res.status(NOT_FOUND_STATUS).json({ message: 'Sale not found' });
};

const insert = async (body, res) => {
  const { type, data } = await salesService.create(body);
  if (type) {
    return res.status(CREATED_STATUS).json(data);
  }
  res.status(NOT_FOUND_STATUS).json({ message: 'Product not found' });
};

const remove = async (id, res) => {
  const { type, data } = await salesService.requestDeleteById(id);
  if (type) {
    return res.status(NO_CONTENT_STATUS).json(data);
  }
  res.status(NOT_FOUND_STATUS).json({ message: 'Sale not found' });
};

module.exports = { fetchAll, fetchById, insert, remove };