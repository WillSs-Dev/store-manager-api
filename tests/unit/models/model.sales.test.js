const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
chai.use(chaiHttp);

const salesModel = require('../../../src/models/model.sales');
const { allSales, sale1, salesIds } = require('./model.sales.mock');
const db = require('../../../src/models/connection');

describe('Testes de unidade do model de vendas', function () {
  afterEach(sinon.restore);
  it('Buscando todas as vendas do banco de dados', async function () {
    sinon.stub(db, 'query').resolves([allSales]);

    const result = await salesModel.getAll();
    
    expect(result).to.deep.equal(allSales);
  });
  it('Buscando uma venda específica do banco de dados', async function () {
    sinon.stub(db, 'query').resolves([sale1]);

    const result = await salesModel.getById(1);
    
    expect(result).to.deep.equal(sale1);
  });
  it('Buscando os IDs das vebdas no banco de dados', async function () {
    sinon.stub(db, 'query').resolves([salesIds]);

    const result = await salesModel.getAllSalesId();
    
    expect(result).to.deep.equal(salesIds);
  });
});