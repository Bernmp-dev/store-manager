const { Router } = require('express');
const { salesController } = require('../controllers');

const salesRoutes = Router();

salesRoutes.get(
  '/',
  salesController.listSales,
);

salesRoutes.get(
  '/:id',
  salesController.findSaleById,
);

salesRoutes.post(
  '/',
  salesController.registerSale,
);

module.exports = salesRoutes;