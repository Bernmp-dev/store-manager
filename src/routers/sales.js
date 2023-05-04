const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.get(
  '/sales',
  salesController.listSales,
);

router.get(
  '/sales/:id',
  salesController.findSaleById,
);

router.post(
  '/sales',
  salesController.registerSale,
);

module.exports = router;