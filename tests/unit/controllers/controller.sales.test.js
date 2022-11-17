const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
chai.use(chaiHttp);

const salesService = require('../../../src/services/service.sales');
const { allSales, saleNotFoundMsg, productNotFoundMsg, newSale, saleRequestBody, sale1, saleWithInexistentProduct } = require('./controller.sales.mock');
const app = require('../../../src/app');

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const NOT_FOUND_STATUS = 404;

describe('Testes de unidade do controller de vendas', function () {
  afterEach(sinon.restore);
  it('Buscando todas as vendas do banco de dados', async function () {
    sinon.stub(salesService, 'requestAll').resolves(allSales);

    const res = await chai.request(app).get('/sales');

    expect(res.status).to.be.equal(OK_STATUS);
    expect(res.body).to.deep.equal(allSales);
  });
  it('Buscando uma venda específica do banco de dados', async function () {
    sinon.stub(salesService, 'requestById').resolves({ type: 1, data: sale1 });

    const res = await chai.request(app).get('/sales/2');

    expect(res.status).to.be.equal(OK_STATUS);
    expect(res.body).to.deep.equal(sale1);
  });
  it('Buscando uma venda que não existe do banco de dados', async function () {
    sinon.stub(salesService, 'requestById').resolves({ type: 0 });

    const res = await chai.request(app).get('/sales/80');

    expect(res.status).to.be.equal(NOT_FOUND_STATUS);
    expect(res.body).to.deep.equal(saleNotFoundMsg);
  });
  it('Adicionando uma venda no banco de dados', async function () {
    sinon.stub(salesService, 'create').resolves({ type: 1, data: newSale });

    const res = await chai.request(app).post('/sales').send(saleRequestBody);

    expect(res.status).to.be.equal(CREATED_STATUS);
    expect(res.body).to.deep.equal(newSale);
  });
  it('Adicionando uma venda com um produto que não existe no banco de dados', async function () {
    const res = await chai.request(app).post('/sales').send(saleWithInexistentProduct);

    expect(res.status).to.be.equal(NOT_FOUND_STATUS);
    expect(res.body).to.deep.equal(productNotFoundMsg);
  });
});