const { expect } = require('chai');
const sinon = require('sinon');
const db = require('../../../src/models/connection');
const productsModel = require('../../../src/models/model.products');
const productsService = require('../../../src/services/service.products');
const { allProducts, notFoundMsg } = require('./service.products.mock');

const OK = 1;
const ERROR = 0;

describe('Testes de unidade da service de produtos', function () {
  afterEach(sinon.restore);
  it('Buscando todos os produtos do banco de dados', async function () {
    sinon.stub(productsModel, 'getAll').resolves(allProducts);

    const results = await productsService.requestAll();

    expect(results).to.be.equal(allProducts);
  });
  it('Buscando um produto específico do banco de dados', async function () {
    sinon.stub(productsModel, 'getById').resolves(allProducts[1]);

    const result = await productsService.requestById(2);

    expect(result).to.deep.equal({ type: OK, data: allProducts[1] });
  });
});