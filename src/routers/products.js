const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.post(
  '/products',
    productsController.createProduct,
);

router.get(
  '/products',
  productsController.listProducts,
);

router.get(
  '/products/:id',
  productsController.findProductById,
);

router.put(
  '/products/:id',
  productsController.updateProduct,
);

module.exports = router;