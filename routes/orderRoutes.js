const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrdersByClient,
  updateOrderStatus
} = require('../controllers/orderController');

// Place an order
router.post('/', createOrder);

// List orders for a given client
router.get('/:clientId', getOrdersByClient);

// Update an order’s status
router.put('/:id/status', updateOrderStatus);

module.exports = router;
