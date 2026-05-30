const express = require('express');
const router = express.Router();
const store = require('../store');

// POST /api/orders — place a new order
router.post('/', (req, res) => {
  const { name, address, phone } = req.body;

  if (!name || !address || !phone) {
    return res.status(400).json({
      success: false,
      error: 'name, address, and phone are required'
    });
  }

  const order = store.placeOrder({ name, address, phone });
  if (!order) {
    return res.status(400).json({
      success: false,
      error: 'Cart is empty. Add items before placing an order.'
    });
  }

  res.status(201).json({ success: true, data: order });
});

// GET /api/orders — list all orders
router.get('/', (req, res) => {
  const orders = store.getOrders();
  res.json({ success: true, data: orders, count: orders.length });
});

// GET /api/orders/:id — get single order
router.get('/:id', (req, res) => {
  const order = store.getOrderById(req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, error: 'Order not found' });
  }
  res.json({ success: true, data: order });
});

module.exports = router;
