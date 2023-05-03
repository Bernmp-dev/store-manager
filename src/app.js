const express = require('express');

const { productsController, salesController } = require('./controllers');
const { findId, validateNewSale } = require('./services/validations/validateInput');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post(
  '/products',
    productsController.createProduct,
);

app.post(
  '/sales',
  validateNewSale,
  findId,
  salesController.registerSale,
);

app.get(
  '/products',
  productsController.listProducts,
);

app.get(
  '/products/:id',
  productsController.findById,
);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;