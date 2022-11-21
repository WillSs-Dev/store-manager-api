const { expect } = require('chai');
const sinon = require('sinon');
const db = require('../../../src/models/connection');
const productsModel = require('../../../src/models/model.products');
const { allProducts, newProduct, searchedProducts, updatedProduct } = require('./model.products.mock');

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
  it('Buscando um produto por query de busca', async function () {
    sinon.stub(db, 'query').resolves([searchedProducts]);

    const result = await productsModel.getByQuery('de');

    expect(result).to.deep.equal(searchedProducts);
  });
  it('Atualizando o nome de um produto pela Id', async function () {
    sinon.stub(db, 'query').resolves([[updatedProduct]]);

    const result = await productsModel.changeById(2, 'Garras do Wolverine');

    expect(result).to.deep.equal(updatedProduct);
  });
});