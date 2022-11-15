const express = require('express');
const { validateProduct } = require('./middlewares/requestValidation');
const productsController = require('./controllers/controller.products');

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

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;
