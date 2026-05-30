const express = require('express');
const router = express.Router();
const store = require('../store');

// GET /api/products — list all (with optional ?category= and ?search= filters)
router.get('/', (req, res) => {
  const { category, search } = req.query;
  const products = store.getAllProducts(category, search);
  res.json({ success: true, data: products, count: products.length });
});

// GET /api/products/categories — list categories
router.get('/categories', (req, res) => {
  const categories = store.getCategories();
  res.json({ success: true, data: categories });
});

// GET /api/products/:id — get single product
router.get('/:id', (req, res) => {
  const product = store.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }
  res.json({ success: true, data: product });
});

module.exports = router;
