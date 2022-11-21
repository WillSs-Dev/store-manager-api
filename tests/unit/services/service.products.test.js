const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/model.products');
const productsService = require('../../../src/services/service.products');
const { allProducts, newProduct, searchedProducts, updatedProduct } = require('./service.products.mock');

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
  it('Buscando um produto que não existe no banco de dados', async function () {
    sinon.stub(productsModel, 'getById').resolves(undefined);

    const result = await productsService.requestById(80);

    expect(result).to.deep.equal({ type: ERROR });
  });
  it('Adicionando um produto no banco de dados', async function () {
    sinon.stub(productsModel, 'add').resolves(newProduct);

    const result = await productsService.create('Garras do Wolverine');

    expect(result).to.deep.equal(newProduct);
  });
  it('Buscando um produto por query de busca', async function () {
    sinon.stub(productsModel, 'getByQuery').resolves(searchedProducts);

    const result = await productsService.requestByQuery('de');

    expect(result).to.deep.equal({ type: OK, data: searchedProducts });
  });
  it('Buscando um produto com a query de busca vazia', async function () {
    sinon.stub(productsModel, 'getAll').resolves(allProducts);

    const result = await productsService.requestByQuery('');

    expect(result).to.deep.equal({ type: OK, data: allProducts });
  });
  it('Buscando um produto que não existe no banco de dados com a query de busca vazia', async function () {
    sinon.stub(productsModel, 'getByQuery').resolves(undefined);

    const result = await productsService.requestByQuery('Tangerina');

    expect(result).to.deep.equal({ type: ERROR });
  });
  it('Atualizando o nome de um produto pela Id', async function () {
    sinon.stub(productsModel, 'getById').resolves(allProducts[1]);
    sinon.stub(productsModel, 'changeById').resolves(updatedProduct);

    const result = await productsService.requestChangeById(2, 'Garras do Wolverine');

    expect(result).to.deep.equal({ type: OK, data: updatedProduct });
  });
  it('Atualizando o nome de um produto que não existe', async function () {
    sinon.stub(productsModel, 'getById').resolves(allProducts[5]);
    sinon.stub(productsModel, 'changeById').resolves(updatedProduct);

    const result = await productsService.requestChangeById(4, 'Garras do Wolverine');

    expect(result).to.deep.equal({ type: ERROR });
  });
});