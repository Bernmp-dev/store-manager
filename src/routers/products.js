const { Router } = require('express');
const { productsController } = require('../controllers');

const productsRoutes = Router();

productsRoutes.post(
  '/',
    productsController.createProduct,
);

productsRoutes.get(
  '/',
  productsController.listProducts,
);

productsRoutes.get(
  '/:id',
  productsController.findProductById,
);

productsRoutes.put(
  '/:id',
  productsController.updateProduct,
);

productsRoutes.delete(
  '/:id',
  productsController.deleteProduct,
);

module.exports = productsRoutes;