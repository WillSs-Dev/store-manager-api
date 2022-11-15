const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
chai.use(chaiHttp);

const productsModel = require('../../../src/models/model.products');
const { allProducts, notFoundMsg } = require('./controller.products.mock');
const app = require('../../../src/app');

const OK_STATUS = 200;
const NOT_FOUND_STATUS = 404;

describe('Testes de unidade do controller de produtos', function () {
  afterEach(sinon.restore);
  it('Buscando todos os produtos do banco de dados', async function () {
    sinon.stub(productsModel, 'getAll').resolves(allProducts);

    const res = await chai.request(app).get('/products');

    expect(res.status).to.be.equal(OK_STATUS);
    expect(res.body).to.deep.equal(allProducts);
  });
  it('Buscando um produto específico do banco de dados', async function () {
    sinon.stub(productsModel, 'getById').resolves(allProducts[1]);

    const res = await chai.request(app).get('/products/2');

    expect(res.status).to.be.equal(OK_STATUS);
    expect(res.body).to.deep.equal(allProducts[1]);
  });
  it('Buscando um produto específico do banco de dados', async function () {
    sinon.stub(productsModel, 'getById').resolves(undefined);

    const res = await chai.request(app).get('/products/80');

    expect(res.status).to.be.equal(NOT_FOUND_STATUS);
    expect(res.body).to.deep.equal(notFoundMsg);
  });
});