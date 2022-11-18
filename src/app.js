const express = require('express');
const {
  validateProduct,
  validateSale,
} = require('./middlewares/requestValidation');
const productsController = require('./controllers/controller.products');
const salesController = require('./controllers/controller.sales');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', (__req, res) => productsController.fetchAll(res));

app.get('/products/:id', ({ params: { id } }, res) =>
  productsController.fetchById(id, res));

app.post('/products', validateProduct, ({ body: { name } }, res) =>
  productsController.insert(name, res));

app.put('/products/:id', validateProduct, ({ params: { id }, body: { name } }, res) =>
  productsController.update(id, name, res));

app.delete('/products/:id', ({ params: { id } }, res) => productsController.remove(id, res));

app.get('/sales', (__req, res) => salesController.fetchAll(res));

app.get('/sales/:id', ({ params: { id } }, res) =>
  salesController.fetchById(id, res));

app.post('/sales', validateSale, ({ body }, res) =>
  salesController.insert(body, res));

app.delete('/sales/:id', ({ params: { id } }, res) => 
  salesController.remove(id, res));

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;
