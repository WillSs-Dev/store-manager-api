const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
chai.use(chaiHttp);

const salesModel = require('../../../src/models/model.sales');
const salesService = require('../../../src/services/service.sales');
const productsModel = require('../../../src/models/model.products');
const { allSales, newSale, saleRequestBody, sale1, productsIds, salesIds } = require('./service.sales.mock');
const app = require('../../../src/app');
const db = require('../../../src/models/connection');

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const NOT_FOUND_STATUS = 404;
const BAD_REQUEST = 400;
const UNPROCESSABLE_ENTITY = 422;

describe('Testes de unidade da service de vendas', function () {
  afterEach(sinon.restore);
  it('Buscando todas as vendas do banco de dados', async function () {
    sinon.stub(salesModel, 'getAll').resolves(allSales);

    const result = await salesService.requestAll();
    
    expect(result).to.deep.equal(allSales);
  });
  it('Buscando uma venda específica do banco de dados', async function () {
    sinon.stub(salesModel, 'getById').resolves(sale1);

    const result = await salesService.requestById(1);
    
    expect(result).to.deep.equal({ type: 1, data: sale1 });
  });
  it('Buscando uma venda que não existe do banco de dados', async function () {
    sinon.stub(salesModel, 'getById').resolves([]);

    const result = await salesService.requestById(80);
    
    expect(result).to.deep.equal({ type: 0 });
  });
  it('Adicionando uma venda no banco de dados', async function () {
    sinon.stub(db, 'query')
      .onCall(0).resolves([productsIds])
      .onCall(1).resolves([salesIds])
      .onCall(2).resolves()
      .onCall(3).resolves();

    const result = await salesService.create(saleRequestBody);
    
    expect(result).to.deep.equal({ type: 1, data: newSale });
  });
});