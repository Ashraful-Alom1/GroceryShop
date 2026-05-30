// Page Renderers
const Pages = {

  async home(category, search) {
    const [prodRes, catRes, cartRes] = await Promise.all([
      API.getProducts(category, search),
      API.getCategories(),
      API.getCart()
    ]);
    const products = prodRes.data;
    const categories = catRes.data;
    const cartMap = {};
    cartRes.data.items.forEach(i => { cartMap[i.productId] = i.quantity; });

    const catChips = `<button class="category-chip ${(!category || category === 'all') ? 'active' : ''}" onclick="app.filterCategory('all')">
      <span class="chip-emoji">🏪</span><span>All</span><span class="chip-count">${prodRes.count}</span>
    </button>` + categories.map(c => Components.categoryChip(c, category === c.name)).join('');

    const title = search ? `Results for "${search}"` : (category && category !== 'all' ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products');

    const grid = products.length > 0
      ? products.map(p => Components.productCard(p, cartMap[p.id] || 0)).join('')
      : Components.emptyState('🔍', 'No products found', 'Try a different search or category.',
          '<button class="btn-primary" onclick="app.clearSearch(); app.filterCategory(\'all\')">Browse All</button>');

    return `<div class="page-enter">
      <section class="hero">
        <div class="hero-content">
          <div class="hero-text">
            <div class="hero-badge">🌿 Farm Fresh Quality</div>
            <h1>Fresh Groceries,<br><span class="accent">Delivered Fast</span></h1>
            <p>Premium quality groceries at your fingertips. Order now and get delivery in 30-45 minutes.</p>
            <div class="hero-stats">
              <div class="stat"><div class="stat-value">50+</div><div class="stat-label">Products</div></div>
              <div class="stat"><div class="stat-value">30min</div><div class="stat-label">Delivery</div></div>
              <div class="stat"><div class="stat-value">$35+</div><div class="stat-label">Free Ship</div></div>
            </div>
          </div>
          <div class="hero-animation" id="hero-animation">
            <div class="float-bubble fb-1"><span>🍎</span><small>Fruits</small></div>
            <div class="float-bubble fb-2"><span>🥬</span><small>Vegetables</small></div>
            <div class="float-bubble fb-3"><span>🥛</span><small>Dairy</small></div>
            <div class="float-bubble fb-4"><span>🍞</span><small>Bakery</small></div>
            <div class="float-bubble fb-5"><span>☕</span><small>Beverages</small></div>
            <div class="float-bubble fb-6"><span>🍿</span><small>Snacks</small></div>
            <div class="float-orbit orb-1">🍓</div>
            <div class="float-orbit orb-2">🥑</div>
            <div class="float-orbit orb-3">🧀</div>
            <div class="float-orbit orb-4">🥐</div>
            <div class="hero-glow"></div>
          </div>
        </div>
      </section>
      <div class="category-bar" id="category-bar">${catChips}</div>
      <div class="products-header">
        <h2>${title}</h2>
        <span class="products-count">${products.length} products</span>
      </div>
      <div class="product-grid" id="product-grid">${grid}</div>
    </div>`;
  },

  async cart() {
    const res = await API.getCart();
    const cart = res.data;
    if (cart.items.length === 0) {
      return `<div class="cart-page page-enter">
        <div class="cart-page-header"><h1>Shopping Cart</h1>
          <button class="back-btn" onclick="app.navigate('home')">← Continue Shopping</button></div>
        ${Components.emptyState('🛒', 'Your cart is empty', 'Browse our fresh groceries and add items to your cart.',
          '<button class="btn-primary" onclick="app.navigate(\'home\')">Start Shopping</button>')}
      </div>`;
    }
    const items = cart.items.map(i => Components.cartItem(i)).join('');
    return `<div class="cart-page page-enter">
      <div class="cart-page-header"><h1>Shopping Cart</h1>
        <button class="back-btn" onclick="app.navigate('home')">← Continue Shopping</button></div>
      <div class="cart-layout">
        <div class="cart-items">${items}</div>
        ${Components.cartSummary(cart)}
      </div>
    </div>`;
  },

  async checkout() {
    const res = await API.getCart();
    const cart = res.data;
    if (cart.items.length === 0) { app.navigate('cart'); return ''; }
    return `<div class="checkout-page page-enter">
      <button class="back-btn" onclick="app.navigate('cart')" style="margin-bottom:16px">← Back to Cart</button>
      <h1>Checkout</h1>
      <div class="checkout-layout">
        <div class="checkout-form-card">
          <h3>📍 Delivery Details</h3>
          <div class="form-group"><label for="cust-name">Full Name</label>
            <input type="text" id="cust-name" placeholder="John Doe"></div>
          <div class="form-group"><label for="cust-phone">Phone Number</label>
            <input type="tel" id="cust-phone" placeholder="+1 (555) 000-0000"></div>
          <div class="form-group"><label for="cust-address">Delivery Address</label>
            <textarea id="cust-address" placeholder="123 Main St, Apt 4B, New York, NY 10001"></textarea></div>
          <button class="place-order-btn" id="place-order-btn" onclick="app.placeOrder()">
            🛒 Place Order — $${cart.total.toFixed(2)}
          </button>
        </div>
        ${Components.cartSummary(cart, false)}
      </div>
    </div>`;
  },

  confirmation(order) {
    const items = order.items.map(i =>
      `<div class="order-item-row"><span class="emoji">${i.image}</span><span class="name">${i.name}</span><span class="qty">x${i.quantity}</span><span class="price">$${i.subtotal.toFixed(2)}</span></div>`
    ).join('');
    return `<div class="confirmation-page page-enter">
      <div class="confirm-icon">✓</div>
      <h1>Order Confirmed!</h1>
      <p class="confirm-subtitle">Thank you, ${order.customerName}! Your order has been placed.</p>
      <div class="order-details-card">
        <h3>Order Details <span class="order-id-badge">${order.id}</span></h3>
        <div class="order-detail-row"><span class="label">Status</span><span class="value" style="color:var(--accent-primary)">✅ ${order.status}</span></div>
        <div class="order-detail-row"><span class="label">Delivery To</span><span class="value">${order.address}</span></div>
        <div class="order-detail-row"><span class="label">Phone</span><span class="value">${order.phone}</span></div>
        <div class="order-items-list">${items}</div>
        <div class="order-detail-row" style="margin-top:12px;border-top:1px solid var(--border-color);padding-top:12px">
          <span class="label">Subtotal</span><span class="value">$${order.subtotal.toFixed(2)}</span></div>
        <div class="order-detail-row"><span class="label">Delivery</span><span class="value">${order.deliveryFee === 0 ? 'FREE' : '$' + order.deliveryFee.toFixed(2)}</span></div>
        <div class="order-detail-row"><span class="label" style="font-weight:700">Total</span><span class="value" style="font-size:18px;color:var(--accent-primary)">$${order.total.toFixed(2)}</span></div>
      </div>
      <div class="delivery-info"><span class="icon">🚚</span><div class="text">Estimated delivery: <strong>${order.estimatedDelivery}</strong></div></div>
      <br>
      <button class="continue-btn" onclick="app.navigate('home')">Continue Shopping →</button>
    </div>`;
  },

  async orders() {
    const res = await API.getOrders();
    const orders = res.data;
    if (orders.length === 0) {
      return `<div class="orders-page page-enter">
        <div class="cart-page-header"><h1>My Orders</h1>
          <button class="back-btn" onclick="app.navigate('home')">← Back to Shop</button></div>
        ${Components.emptyState('📦', 'No orders yet', 'Place your first order and it will appear here.',
          '<button class="btn-primary" onclick="app.navigate(\'home\')">Start Shopping</button>')}
      </div>`;
    }
    return `<div class="orders-page page-enter">
      <div class="cart-page-header"><h1>My Orders</h1>
        <button class="back-btn" onclick="app.navigate('home')">← Back to Shop</button></div>
      <div class="orders-list">${orders.map(o => Components.orderCard(o)).join('')}</div>
    </div>`;
  }
};
