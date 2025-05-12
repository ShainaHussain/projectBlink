// Cart functionality

// Initialize cart from local storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in header
function updateCartCount() {
  const cartCountElements = document.querySelectorAll('.cart-count');
  
  if (cartCountElements.length === 0) return;
  
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  cartCountElements.forEach(element => {
    element.textContent = totalItems;
  });
}

// Add product to cart
function addToCart(productId, quantity = 1) {
  const product = products.find(p => p.id === productId);
  
  if (!product) return;
  
  // Check if product already exists in cart
  const existingItemIndex = cart.findIndex(item => item.id === productId);
  
  if (existingItemIndex !== -1) {
    // Update quantity
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }
  
  // Save to local storage
  saveCart();
  
  // Update cart count
  updateCartCount();
  
  // Show success message
  showAddToCartMessage(product.title);
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  
  // Save to local storage
  saveCart();
  
  // Update cart count
  updateCartCount();
  
  // Update cart page if on cart page
  if (window.location.pathname.includes('cart.html')) {
    loadCartPage();
  }
}

// Update item quantity in cart
function updateCartItemQuantity(productId, quantity) {
  const index = cart.findIndex(item => item.id === productId);
  
  if (index === -1) return;
  
  if (quantity <= 0) {
    // Remove item if quantity is 0 or less
    removeFromCart(productId);
  } else {
    // Update quantity
    cart[index].quantity = quantity;
    
    // Save to local storage
    saveCart();
    
    // Update cart count
    updateCartCount();
    
    // Update cart page if on cart page
    if (window.location.pathname.includes('cart.html')) {
      updateCartTotal();
    }
  }
}

// Save cart to local storage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Clear cart
function clearCart() {
  cart = [];
  saveCart();
  updateCartCount();
  
  // Update cart page if on cart page
  if (window.location.pathname.includes('cart.html')) {
    loadCartPage();
  }
}

// Show add to cart message
function showAddToCartMessage(productTitle) {
  let messageContainer = document.getElementById('cart-message');
  
  // Create message container if it doesn't exist
  if (!messageContainer) {
    messageContainer = document.createElement('div');
    messageContainer.id = 'cart-message';
    document.body.appendChild(messageContainer);
    
    // Add styles
    const style = document.createElement('style');
    if (!document.querySelector('style[data-cart-styles]')) {
      style.setAttribute('data-cart-styles', 'true');
      style.textContent = `
        #cart-message {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: var(--color-primary);
          color: white;
          padding: 1rem;
          border-radius: var(--border-radius-md);
          box-shadow: var(--box-shadow-lg);
          z-index: 1000;
          transform: translateY(100px);
          opacity: 0;
          transition: all 0.3s ease;
        }
        
        #cart-message.show {
          transform: translateY(0);
          opacity: 1;
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  // Update message text
  messageContainer.innerHTML = `
    <div class="cart-message-content">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      <span>${productTitle} added to cart</span>
    </div>
  `;
  
  // Show message
  setTimeout(() => {
    messageContainer.classList.add('show');
    
    // Hide message after 3 seconds
    setTimeout(() => {
      messageContainer.classList.remove('show');
    }, 3000);
  }, 100);
}

// Load cart page
function loadCartPage() {
  const cartContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  const emptyCartMessage = document.getElementById('empty-cart-message');
  const cartActions = document.getElementById('cart-actions');
  
  if (!cartContainer) return;
  
  if (cart.length === 0) {
    // Show empty cart message
    if (emptyCartMessage) emptyCartMessage.style.display = 'block';
    if (cartActions) cartActions.style.display = 'none';
    
    cartContainer.innerHTML = '';
    if (cartTotalElement) cartTotalElement.textContent = '$0.00';
    
    return;
  }
  
  // Hide empty cart message and show cart actions
  if (emptyCartMessage) emptyCartMessage.style.display = 'none';
  if (cartActions) cartActions.style.display = 'flex';
  
  // Clear cart container
  cartContainer.innerHTML = '';
  
  // Add cart items
  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    
    cartItem.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
      </div>
      <div class="cart-item-details">
        <h3 class="cart-item-title">${item.title}</h3>
        <div class="cart-item-price">${formatPrice(item.price)}</div>
      </div>
      <div class="cart-item-quantity">
        <div class="quantity-input">
          <button class="quantity-btn decrement" data-product-id="${item.id}">-</button>
          <input type="text" class="quantity-number" value="${item.quantity}" readonly>
          <button class="quantity-btn increment" data-product-id="${item.id}">+</button>
        </div>
      </div>
      <div class="cart-item-total">${formatPrice(item.price * item.quantity)}</div>
      <button class="cart-item-remove" data-product-id="${item.id}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    `;
    
    cartContainer.appendChild(cartItem);
  });
  
  // Add event listeners to cart items
  addCartItemEventListeners();
  
  // Update cart total
  updateCartTotal();
}

// Add event listeners to cart items
function addCartItemEventListeners() {
  // Remove button
  const removeButtons = document.querySelectorAll('.cart-item-remove');
  removeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-product-id'));
      removeFromCart(productId);
    });
  });
  
  // Quantity increment
  const incrementButtons = document.querySelectorAll('.quantity-btn.increment');
  incrementButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-product-id'));
      const item = cart.find(item => item.id === productId);
      if (item) {
        updateCartItemQuantity(productId, item.quantity + 1);
        
        // Update quantity input
        const input = this.parentElement.querySelector('.quantity-number');
        input.value = item.quantity + 1;
        
        // Update item total
        const cartItem = this.closest('.cart-item');
        const totalElement = cartItem.querySelector('.cart-item-total');
        totalElement.textContent = formatPrice(item.price * (item.quantity + 1));
      }
    });
  });
  
  // Quantity decrement
  const decrementButtons = document.querySelectorAll('.quantity-btn.decrement');
  decrementButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-product-id'));
      const item = cart.find(item => item.id === productId);
      if (item && item.quantity > 1) {
        updateCartItemQuantity(productId, item.quantity - 1);
        
        // Update quantity input
        const input = this.parentElement.querySelector('.quantity-number');
        input.value = item.quantity - 1;
        
        // Update item total
        const cartItem = this.closest('.cart-item');
        const totalElement = cartItem.querySelector('.cart-item-total');
        totalElement.textContent = formatPrice(item.price * (item.quantity - 1));
      }
    });
  });
  
  // Clear cart button
  const clearCartButton = document.getElementById('clear-cart');
  if (clearCartButton) {
    clearCartButton.addEventListener('click', function() {
      if (confirm('Are you sure you want to clear your cart?')) {
        clearCart();
      }
    });
  }
  
  // Checkout button
  const checkoutButton = document.getElementById('checkout-button');
  if (checkoutButton) {
    checkoutButton.addEventListener('click', function() {
      window.location.href = 'checkout.html';
    });
  }
}

// Update cart total
function updateCartTotal() {
  const cartTotalElement = document.getElementById('cart-total');
  const cartSubtotalElement = document.getElementById('cart-subtotal');
  const cartTaxElement = document.getElementById('cart-tax');
  const cartShippingElement = document.getElementById('cart-shipping');
  
  if (!cartTotalElement) return;
  
  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calculate tax (10%)
  const tax = subtotal * 0.1;
  
  // Calculate shipping (free over $100)
  const shipping = subtotal > 100 ? 0 : 10;
  
  // Calculate total
  const total = subtotal + tax + shipping;
  
  // Update elements
  if (cartSubtotalElement) cartSubtotalElement.textContent = formatPrice(subtotal);
  if (cartTaxElement) cartTaxElement.textContent = formatPrice(tax);
  if (cartShippingElement) cartShippingElement.textContent = shipping === 0 ? 'Free' : formatPrice(shipping);
  cartTotalElement.textContent = formatPrice(total);
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
});