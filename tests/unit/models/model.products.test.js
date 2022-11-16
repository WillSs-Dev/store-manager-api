const { expect } = require('chai');
const sinon = require('sinon');
const db = require('../../../src/models/connection');
const productsModel = require('../../../src/models/model.products');
const { allProducts, newProduct } = require('./model.products.mock');

describe('Testes de unidade do model de produtos', function () {
  afterEach(sinon.restore);
  it('Buscando todos os produtos do banco de dados', async function () {
    sinon.stub(db, 'query').resolves([allProducts]);

    const results = await productsModel.getAll();

    expect(results).to.be.equal(allProducts);
  });
  it('Buscando um produto específico do banco de dados', async function () {
    sinon.stub(db, 'query').resolves([[allProducts[1]]]);

    const result = await productsModel.getById(2);

    expect(result).to.be.equal(allProducts[1]);
  });
  it('Adicionando um produto no banco de dados', async function () {
    sinon.stub(db, 'query').onFirstCall().resolves().onSecondCall().resolves([[newProduct]]);

    const result = await productsModel.add('Garras do Wolverine');

    expect(result).to.deep.equal(newProduct);
  });
});