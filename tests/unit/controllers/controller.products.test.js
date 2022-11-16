const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
chai.use(chaiHttp);

const productsModel = require('../../../src/models/model.products');
const { allProducts, notFoundMsg, newProduct } = require('./controller.products.mock');
const app = require('../../../src/app');

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const NOT_FOUND_STATUS = 404;
const BAD_REQUEST = 400;
const UNPROCESSABLE_ENTITY = 422;

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
  it('Adicionando um produto no banco de dados', async function () {
    sinon.stub(productsModel, 'add').resolves(newProduct);

    const res = await chai.request(app).post('/products').send({ name: 'Garras do Wolverine' });

    expect(res.status).to.be.equal(CREATED_STATUS);
    expect(res.body).to.deep.equal(newProduct);
  });
  it('Adicionando um produto sem nome no banco de dados', async function () {
    const res = await chai.request(app).post('/products').send({});

    expect(res.status).to.be.equal(BAD_REQUEST);
    expect(res.body).to.deep.equal({ message: '"name" is required' });
  });
  it('Adicionando um produto com nome com menos do que 5 caracteres no banco de dados', async function () {
    const res = await chai.request(app).post('/products').send({ name: 'Luva' });

    expect(res.status).to.be.equal(UNPROCESSABLE_ENTITY);
    expect(res.body).to.deep.equal({ message: '"name" length must be at least 5 characters long' });
  });
});