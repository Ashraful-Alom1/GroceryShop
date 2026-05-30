// Reusable UI Components
const Components = {

  productCard(product, cartQty = 0) {
    const stars = '★'.repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? '½' : '');
    const badge = product.rating >= 4.7 ? '<div class="product-card-badge">⭐ Top Rated</div>' : '';
    const addBtn = cartQty > 0
      ? this.quantityControl(product.id, cartQty)
      : `<button class="add-to-cart-btn" id="add-btn-${product.id}" onclick="app.addToCart(${product.id})">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add
        </button>`;
    return `<div class="product-card" data-product-id="${product.id}">
      <div class="product-card-image"><span>${product.image}</span>${badge}</div>
      <div class="product-card-body">
        <div class="product-card-category">${product.category}</div>
        <div class="product-card-name">${product.name}</div>
        <div class="product-card-desc">${product.description}</div>
      </div>
      <div class="product-card-footer">
        <div>
          <span class="product-price">$${product.price.toFixed(2)} <span class="unit">/ ${product.unit}</span></span>
          <div class="product-rating"><span class="star">${stars}</span> ${product.rating} (${product.reviews})</div>
        </div>
        ${addBtn}
      </div>
    </div>`;
  },

  quantityControl(productId, qty) {
    return `<div class="qty-control" id="qty-${productId}">
      <button class="qty-btn" onclick="app.updateQuantity(${productId}, ${qty - 1})">−</button>
      <span class="qty-value">${qty}</span>
      <button class="qty-btn" onclick="app.updateQuantity(${productId}, ${qty + 1})">+</button>
    </div>`;
  },

  categoryChip(cat, isActive) {
    return `<button class="category-chip ${isActive ? 'active' : ''}" id="cat-${cat.name}" onclick="app.filterCategory('${cat.name}')">
      <span class="chip-emoji">${cat.emoji}</span><span>${cat.label}</span><span class="chip-count">${cat.count}</span>
    </button>`;
  },

  cartItem(item) {
    return `<div class="cart-item" data-product-id="${item.productId}">
      <div class="cart-item-image">${item.product.image}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.product.name}</div>
        <div class="cart-item-price">$${item.product.price.toFixed(2)} / ${item.product.unit}</div>
      </div>
      <div class="cart-item-actions">
        ${this.quantityControl(item.productId, item.quantity)}
        <div class="cart-item-subtotal">$${item.subtotal.toFixed(2)}</div>
        <button class="cart-item-remove" onclick="app.removeFromCart(${item.productId})" title="Remove">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      </div>
    </div>`;
  },

  cartSummary(cart, showCheckout = true) {
    const free = cart.subtotal >= 35;
    const rem = (35 - cart.subtotal).toFixed(2);
    const note = free ? '<div class="free-delivery-note">✅ You qualify for free delivery!</div>' :
      (cart.subtotal > 0 ? `<div class="free-delivery-note">🚚 Add $${rem} more for free delivery!</div>` : '');
    const btns = showCheckout ? `<button class="checkout-btn" id="checkout-btn" onclick="app.navigate('checkout')">Proceed to Checkout →</button>
      <button class="clear-cart-btn" onclick="app.clearCart()">Clear Cart</button>` : '';
    return `<div class="cart-summary"><h3>Order Summary</h3>
      <div class="summary-row"><span class="label">Subtotal (${cart.itemCount} items)</span><span class="value">$${cart.subtotal.toFixed(2)}</span></div>
      <div class="summary-row ${free ? 'free' : ''}"><span class="label">Delivery Fee</span><span class="value">${free ? 'FREE' : '$' + cart.deliveryFee.toFixed(2)}</span></div>
      <div class="summary-row total"><span class="label">Total</span><span class="value">$${cart.total.toFixed(2)}</span></div>
      ${note}${btns}</div>`;
  },

  orderCard(order) {
    const d = new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const em = order.items.slice(0, 5).map(i => i.image).join(' ');
    return `<div class="order-card">
      <div class="order-card-header"><span class="order-card-id">${order.id}</span><span class="order-status ${order.status}"><span class="dot"></span>${order.status}</span></div>
      <div class="order-card-body"><span class="order-emojis">${em}</span><span class="order-card-meta">${order.items.length} items</span><span class="order-card-total">$${order.total.toFixed(2)}</span></div>
      <div class="order-card-date">📅 ${d} · 📍 ${order.address}</div>
    </div>`;
  },

  emptyState(icon, title, msg, action = '') {
    return `<div class="empty-state"><div class="empty-state-icon">${icon}</div><h3>${title}</h3><p>${msg}</p>${action}</div>`;
  },

  toast(msg, icon = '✅') {
    return `<div class="toast" id="toast-${Date.now()}"><span class="toast-icon">${icon}</span><span>${msg}</span></div>`;
  }
};
