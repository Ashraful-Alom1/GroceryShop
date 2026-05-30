// API Client — handles all communication with the backend
const API = {
  BASE: '/api',

  async request(endpoint, options = {}) {
    try {
      const res = await fetch(`${this.BASE}${endpoint}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');
      return data;
    } catch (err) {
      console.error(`API Error [${endpoint}]:`, err);
      throw err;
    }
  },

  // Products
  async getProducts(category, search) {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.set('category', category);
    if (search) params.set('search', search);
    const qs = params.toString();
    return this.request(`/products${qs ? '?' + qs : ''}`);
  },

  async getProduct(id) {
    return this.request(`/products/${id}`);
  },

  async getCategories() {
    return this.request('/products/categories');
  },

  // Cart
  async getCart() {
    return this.request('/cart');
  },

  async addToCart(productId, quantity = 1) {
    return this.request('/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  },

  async updateCartItem(productId, quantity) {
    return this.request(`/cart/${productId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  },

  async removeFromCart(productId) {
    return this.request(`/cart/${productId}`, { method: 'DELETE' });
  },

  async clearCart() {
    return this.request('/cart', { method: 'DELETE' });
  },

  // Orders
  async placeOrder(customerInfo) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(customerInfo),
    });
  },

  async getOrders() {
    return this.request('/orders');
  },

  async getOrder(id) {
    return this.request(`/orders/${id}`);
  },
};
