// In-memory data store for cart and orders
const products = require('../data/products');

const store = {
  products: [...products],
  cart: {
    items: [] // { productId, quantity }
  },
  orders: [],
  orderCounter: 1000,

  // Product methods
  getAllProducts(category, search) {
    let result = this.products;
    if (category && category !== 'all') {
      result = result.filter(p => p.category === category);
    }
    if (search) {
      const term = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      );
    }
    return result;
  },

  getProductById(id) {
    return this.products.find(p => p.id === parseInt(id));
  },

  getCategories() {
    const cats = [...new Set(this.products.map(p => p.category))];
    return cats.map(c => ({
      name: c,
      label: c.charAt(0).toUpperCase() + c.slice(1),
      count: this.products.filter(p => p.category === c).length,
      emoji: this.getCategoryEmoji(c)
    }));
  },

  getCategoryEmoji(category) {
    const emojis = {
      fruits: '🍎',
      vegetables: '🥬',
      dairy: '🥛',
      bakery: '🍞',
      beverages: '☕',
      snacks: '🍿'
    };
    return emojis[category] || '📦';
  },

  // Cart methods
  getCart() {
    const items = this.cart.items.map(item => {
      const product = this.getProductById(item.productId);
      return {
        ...item,
        product,
        subtotal: product ? +(product.price * item.quantity).toFixed(2) : 0
      };
    }).filter(item => item.product);

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = +items.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2);
    const deliveryFee = subtotal > 0 ? (subtotal >= 35 ? 0 : 3.99) : 0;
    const total = +(subtotal + deliveryFee).toFixed(2);

    return { items, itemCount, subtotal, deliveryFee, total };
  },

  addToCart(productId, quantity = 1) {
    const product = this.getProductById(productId);
    if (!product) return null;
    if (!product.inStock) return null;

    const existing = this.cart.items.find(i => i.productId === parseInt(productId));
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.items.push({ productId: parseInt(productId), quantity });
    }
    return this.getCart();
  },

  updateCartItem(productId, quantity) {
    const idx = this.cart.items.findIndex(i => i.productId === parseInt(productId));
    if (idx === -1) return null;
    if (quantity <= 0) {
      this.cart.items.splice(idx, 1);
    } else {
      this.cart.items[idx].quantity = quantity;
    }
    return this.getCart();
  },

  removeFromCart(productId) {
    this.cart.items = this.cart.items.filter(i => i.productId !== parseInt(productId));
    return this.getCart();
  },

  clearCart() {
    this.cart.items = [];
    return this.getCart();
  },

  // Order methods
  placeOrder(customerInfo) {
    const cart = this.getCart();
    if (cart.items.length === 0) return null;

    this.orderCounter++;
    const order = {
      id: `ORD-${this.orderCounter}`,
      items: cart.items.map(item => ({
        productId: item.productId,
        name: item.product.name,
        image: item.product.image,
        price: item.product.price,
        quantity: item.quantity,
        subtotal: item.subtotal
      })),
      subtotal: cart.subtotal,
      deliveryFee: cart.deliveryFee,
      total: cart.total,
      customerName: customerInfo.name,
      address: customerInfo.address,
      phone: customerInfo.phone,
      status: 'confirmed',
      estimatedDelivery: '30-45 minutes',
      createdAt: new Date().toISOString()
    };

    this.orders.unshift(order);
    this.clearCart();
    return order;
  },

  getOrders() {
    return this.orders;
  },

  getOrderById(id) {
    return this.orders.find(o => o.id === id);
  }
};

module.exports = store;
