const salesModel = require('../models/model.sales');
const productsModel = require('../models/model.products');
const salesProductsModel = require('../models/model.sales_products');

const OK = 1;
const ERROR = 0;

const requestAll = async () => {
  const result = await salesModel.getAll();
  return result;
};

const requestById = async (id) => {
  const product = await salesModel.getById(id);
  if (product.length) {
    return { type: OK, data: product };
  }
  return { type: ERROR };
};

const create = async (body) => {
  const products = await productsModel.getAllProductIds();
  const productsId = [];
  products.forEach((product) => productsId.push(product.id));
  const productsExistsOnTheDB = body.every((product) => productsId.includes(product.productId));
  if (productsExistsOnTheDB) {
    const sales = await salesModel.getAllSalesId();
    const salesId = [];
    sales.forEach((sale) => salesId.push(sale.id));
    const newSaleId = salesId[salesId.length - 1] + 1;
    await salesModel.add(newSaleId);
    await salesProductsModel.add(body, newSaleId);
    const newSale = { id: newSaleId, itemsSold: body };
    return { type: OK, data: newSale };
  }
  return { type: ERROR };
};

const requestDeleteById = async (id) => {
  const product = await salesModel.getById(id);
  if (product) {
    await salesModel.deleteById(id);
    return { type: OK };
  }
  return { type: ERROR };
};

module.exports = { requestAll, requestById, create, requestDeleteById };