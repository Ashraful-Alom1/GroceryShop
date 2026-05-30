const express = require('express');
const router = express.Router();
const store = require('../store');

// GET /api/cart — get cart contents
router.get('/', (req, res) => {
  const cart = store.getCart();
  res.json({ success: true, data: cart });
});

// POST /api/cart — add item to cart
router.post('/', (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId) {
    return res.status(400).json({ success: false, error: 'productId is required' });
  }
  const cart = store.addToCart(productId, quantity || 1);
  if (!cart) {
    return res.status(404).json({ success: false, error: 'Product not found or out of stock' });
  }
  res.json({ success: true, data: cart });
});

// PUT /api/cart/:productId — update item quantity
router.put('/:productId', (req, res) => {
  const { quantity } = req.body;
  if (quantity === undefined) {
    return res.status(400).json({ success: false, error: 'quantity is required' });
  }
  const cart = store.updateCartItem(req.params.productId, quantity);
  if (!cart) {
    return res.status(404).json({ success: false, error: 'Item not in cart' });
  }
  res.json({ success: true, data: cart });
});

// DELETE /api/cart/:productId — remove item
router.delete('/:productId', (req, res) => {
  const cart = store.removeFromCart(req.params.productId);
  res.json({ success: true, data: cart });
});

// DELETE /api/cart — clear entire cart
router.delete('/', (req, res) => {
  const cart = store.clearCart();
  res.json({ success: true, data: cart });
});

module.exports = router;
