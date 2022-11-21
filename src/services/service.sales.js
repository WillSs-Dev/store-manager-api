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
  const products = await salesModel.getById(id);
  if (products.length) {
    return { type: OK, data: products };
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

const requestChangeById = async (id, body) => {
  // check if sales exists
  const sales = await salesModel.getAllSalesId();
  const salesId = [];
  sales.forEach((sale) => salesId.push(sale.id));
  const saleExistsOnTheDB = salesId.includes(Number(id));
  // check if products exists
  const products = await productsModel.getAllProductIds();
  const productsId = [];
  products.forEach((product) => productsId.push(product.id));
  const productsExistsOnTheDB = body.every((product) => productsId.includes(product.productId));
  if (saleExistsOnTheDB && productsExistsOnTheDB) {
    await salesProductsModel.changeById(body, id);
    const updatedSale = { saleId: id, itemsUpdated: body };
    return { type: OK, data: updatedSale };
  }
  return { type: ERROR, data: { productsExistsOnTheDB, saleExistsOnTheDB } };
};

const requestDeleteById = async (id) => {
  const product = await salesModel.getById(id);
  if (product.length) {
    await salesModel.deleteById(id);
    return { type: OK };
  }
  return { type: ERROR };
};

module.exports = { requestAll, requestById, create, requestChangeById, requestDeleteById };