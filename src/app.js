const express = require('express');
const { productsController, salesController } = require('./controllers');

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

app.get(
  '/products',
  productsController.listProducts,
);

app.get(
  '/products/:id',
  productsController.findProductById,
);

app.put(
  '/products/:id',
  productsController.updateProduct,
);

app.get(
  '/sales',
  salesController.listSales,
);

app.get(
  '/sales/:id',
  salesController.findSaleById,
);

app.post(
  '/sales',
  salesController.registerSale,
);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;