// Main App Controller — routing, state, and event handling
const app = {
  currentPage: 'home',
  currentCategory: 'all',
  searchTerm: '',
  searchTimeout: null,

  async init() {
    this.bindSearch();
    await this.navigate('home');
    await this.updateCartBadge();
  },

  // === Navigation ===
  async navigate(page, data) {
    this.currentPage = page;
    const main = document.getElementById('main-content');
    main.innerHTML = '<div class="page-loader"><div class="loader-spinner"></div><p>Loading...</p></div>';

    try {
      let html = '';
      switch (page) {
        case 'home':
          html = await Pages.home(this.currentCategory, this.searchTerm);
          break;
        case 'cart':
          html = await Pages.cart();
          break;
        case 'checkout':
          html = await Pages.checkout();
          break;
        case 'confirmation':
          html = Pages.confirmation(data);
          break;
        case 'orders':
          html = await Pages.orders();
          break;
        default:
          html = await Pages.home();
      }
      main.innerHTML = html;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      main.innerHTML = Components.emptyState('⚠️', 'Something went wrong', err.message,
        '<button class="btn-primary" onclick="app.navigate(\'home\')">Go Home</button>');
    }
  },

  // === Search ===
  bindSearch() {
    const input = document.getElementById('search-input');
    const clear = document.getElementById('search-clear');
    if (!input) return;

    input.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      clear.classList.toggle('visible', val.length > 0);
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.searchTerm = val;
        if (this.currentPage === 'home') {
          this.navigate('home');
        }
      }, 350);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        clearTimeout(this.searchTimeout);
        this.searchTerm = input.value.trim();
        this.navigate('home');
      }
    });
  },

  clearSearch() {
    const input = document.getElementById('search-input');
    const clear = document.getElementById('search-clear');
    if (input) input.value = '';
    if (clear) clear.classList.remove('visible');
    this.searchTerm = '';
    if (this.currentPage === 'home') this.navigate('home');
  },

  // === Category Filter ===
  async filterCategory(cat) {
    this.currentCategory = cat;
    this.navigate('home');
  },

  // === Cart Actions ===
  async addToCart(productId) {
    try {
      const res = await API.addToCart(productId);
      this.updateCartBadge();
      this.showToast('Added to cart!', '🛒');

      // Re-render product grid to show quantity controls
      if (this.currentPage === 'home') {
        this.navigate('home');
      }
    } catch (err) {
      this.showToast('Failed to add item', '❌');
    }
  },

  async updateQuantity(productId, qty) {
    try {
      if (qty <= 0) {
        await API.removeFromCart(productId);
      } else {
        await API.updateCartItem(productId, qty);
      }
      this.updateCartBadge();
      // Re-render current page
      if (this.currentPage === 'home') {
        this.navigate('home');
      } else if (this.currentPage === 'cart') {
        this.navigate('cart');
      }
    } catch (err) {
      this.showToast('Failed to update item', '❌');
    }
  },

  async removeFromCart(productId) {
    try {
      await API.removeFromCart(productId);
      this.updateCartBadge();
      this.showToast('Item removed', '🗑️');
      if (this.currentPage === 'cart') this.navigate('cart');
    } catch (err) {
      this.showToast('Failed to remove item', '❌');
    }
  },

  async clearCart() {
    try {
      await API.clearCart();
      this.updateCartBadge();
      this.showToast('Cart cleared', '🗑️');
      if (this.currentPage === 'cart') this.navigate('cart');
    } catch (err) {
      this.showToast('Failed to clear cart', '❌');
    }
  },

  // === Orders ===
  async placeOrder() {
    const name = document.getElementById('cust-name')?.value.trim();
    const phone = document.getElementById('cust-phone')?.value.trim();
    const address = document.getElementById('cust-address')?.value.trim();
    const btn = document.getElementById('place-order-btn');

    if (!name || !phone || !address) {
      this.showToast('Please fill in all fields', '⚠️');
      return;
    }

    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Placing order...';
    }

    try {
      const res = await API.placeOrder({ name, phone, address });
      this.updateCartBadge();
      this.navigate('confirmation', res.data);
    } catch (err) {
      this.showToast('Failed to place order: ' + err.message, '❌');
      if (btn) {
        btn.disabled = false;
        btn.textContent = '🛒 Place Order';
      }
    }
  },

  // === Cart Badge ===
  async updateCartBadge() {
    try {
      const res = await API.getCart();
      const badge = document.getElementById('cart-badge');
      if (!badge) return;
      const count = res.data.itemCount;
      badge.textContent = count;
      badge.classList.toggle('visible', count > 0);
      // Trigger pulse animation
      badge.classList.remove('pulse');
      void badge.offsetWidth; // force reflow
      badge.classList.add('pulse');
    } catch (e) { /* silent */ }
  },

  // === Toast ===
  showToast(message, icon = '✅') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const html = Components.toast(message, icon);
    container.insertAdjacentHTML('beforeend', html);
    const toast = container.lastElementChild;
    setTimeout(() => {
      toast.classList.add('toast-out');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }
};

// Boot the app
document.addEventListener('DOMContentLoaded', () => app.init());
