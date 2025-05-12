// Main JavaScript file

// Global Variables
const products = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    price: 249.99,
    originalPrice: 299.99,
    discountPercentage: 17,
    rating: 4.8,
    ratingCount: 456,
    image: "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    category: "electronics",
    featured: true,
    new: true,
    description: "Experience premium sound quality with these noise-cancelling wireless headphones. Perfect for music lovers who want the best audio experience.",
    colors: ["#000000", "#FFFFFF", "#1E3A8A"],
    inStock: true
  },
  {
    id: 2,
    title: "Smart Watch Series 5",
    price: 399.99,
    originalPrice: 449.99,
    discountPercentage: 11,
    rating: 4.6,
    ratingCount: 302,
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    category: "electronics",
    featured: true,
    new: false,
    description: "Track your fitness goals and stay connected with this premium smartwatch. Features include heart rate monitoring, GPS, and water resistance.",
    colors: ["#000000", "#FFFFFF", "#C2C5CC"],
    inStock: true
  },
  {
    id: 3,
    title: "Premium Leather Wallet",
    price: 79.99,
    originalPrice: 99.99,
    discountPercentage: 20,
    rating: 4.9,
    ratingCount: 189,
    image: "https://images.pexels.com/photos/2442893/pexels-photo-2442893.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/2442893/pexels-photo-2442893.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    category: "fashion",
    featured: true,
    new: false,
    description: "Handcrafted from premium full-grain leather, this wallet combines classic style with modern functionality. Multiple card slots and a sleek design.",
    colors: ["#6B3207", "#000000"],
    inStock: true
  },
  {
    id: 4,
    title: "Ergonomic Office Chair",
    price: 349.99,
    originalPrice: 399.99,
    discountPercentage: 13,
    rating: 4.7,
    ratingCount: 231,
    image: "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    category: "home",
    featured: true,
    new: false,
    description: "Designed for comfort and support, this ergonomic office chair helps maintain proper posture during long work sessions. Adjustable height and lumbar support.",
    colors: ["#000000", "#454545", "#FFFFFF"],
    inStock: true
  },
  {
    id: 5,
    title: "Premium Coffee Maker",
    price: 129.99,
    originalPrice: 159.99,
    discountPercentage: 19,
    rating: 4.5,
    ratingCount: 178,
    image: "https://images.pexels.com/photos/373639/pexels-photo-373639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/373639/pexels-photo-373639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    category: "home",
    featured: true,
    new: true,
    description: "Brew the perfect cup of coffee with this premium coffee maker. Features programmable settings and a sleek stainless steel design.",
    colors: ["#C0C0C0", "#000000"],
    inStock: true
  },
  {
    id: 6,
    title: "Organic Skincare Set",
    price: 89.99,
    originalPrice: 109.99,
    discountPercentage: 18,
    rating: 4.8,
    ratingCount: 143,
    image: "https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    category: "beauty",
    featured: true,
    new: false,
    description: "This organic skincare set includes face wash, toner, and moisturizer. Made with natural ingredients for all skin types.",
    colors: [],
    inStock: true
  },
  {
    id: 7,
    title: "Portable Bluetooth Speaker",
    price: 79.99,
    originalPrice: 99.99,
    discountPercentage: 20,
    rating: 4.6,
    ratingCount: 201,
    image: "https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    category: "electronics",
    featured: true,
    new: false,
    description: "Take your music anywhere with this waterproof Bluetooth speaker. Features 12 hours of battery life and deep bass sound.",
    colors: ["#000000", "#0047AB", "#FF5733"],
    inStock: true
  },
  {
    id: 8,
    title: "Designer Sunglasses",
    price: 149.99,
    originalPrice: 179.99,
    discountPercentage: 17,
    rating: 4.7,
    ratingCount: 156,
    image: "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    category: "fashion",
    featured: true,
    new: true,
    description: "These designer sunglasses offer UV protection and a stylish look. Lightweight frame and polarized lenses.",
    colors: ["#000000", "#8B4513", "#708090"],
    inStock: true
  }
];

// Document Ready Function
document.addEventListener('DOMContentLoaded', function() {
  // Initialize components
  initializeHeader();
  
  // Load page-specific content
  loadPageContent();
  
  // Initialize newsletter form
  initializeNewsletterForm();
});

// Page Content Loader
function loadPageContent() {
  const path = window.location.pathname;
  
  // Load content based on current page
  if (path === '/' || path.includes('index.html')) {
    loadHomePage();
  } else if (path.includes('/products.html')) {
    loadProductsPage();
  } else if (path.includes('/product-detail.html')) {
    loadProductDetailPage();
  } else if (path.includes('/cart.html')) {
    loadCartPage();
  } else if (path.includes('/checkout.html')) {
    loadCheckoutPage();
  }
}

// Home Page Content
function loadHomePage() {
  loadFeaturedProducts();
}

// Load Featured Products
function loadFeaturedProducts() {
  const featuredProductsContainer = document.getElementById('featured-products');
  if (!featuredProductsContainer) return;
  
  const featuredProducts = products.filter(product => product.featured);
  
  featuredProductsContainer.innerHTML = '';
  
  featuredProducts.forEach(product => {
    featuredProductsContainer.appendChild(createProductCard(product));
  });
}

// Create Product Card
function createProductCard(product) {
  const productCard = document.createElement('div');
  productCard.className = 'product-card';
  
  let ratingStars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(product.rating)) {
      ratingStars += '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
    } else if (i === Math.ceil(product.rating) && !Number.isInteger(product.rating)) {
      ratingStars += '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l2.42 6.17L22 9.24l-5 4.87 1.18 6.89L12 17.77 8.42 18.98l-1.18-6.89-5-4.87 7.58-1.07L12 2z"></path></svg>';
    } else {
      ratingStars += '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
    }
  }
  
  productCard.innerHTML = `
    <div class="product-image">
      ${product.new ? '<span class="product-badge">New</span>' : ''}
      <div class="product-wishlist">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
      </div>
      <img src="${product.image}" alt="${product.title}" loading="lazy">
    </div>
    <div class="product-info">
      <div class="product-category">${product.category}</div>
      <h3 class="product-title">${product.title}</h3>
      <div class="product-rating">
        <div class="rating-stars">
          ${ratingStars}
        </div>
        <span class="rating-count">(${product.ratingCount})</span>
      </div>
      <div class="product-price">
        <span class="current-price">$${product.price.toFixed(2)}</span>
        ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
        ${product.discountPercentage ? `<span class="discount-percentage">-${product.discountPercentage}%</span>` : ''}
      </div>
    </div>
    <div class="product-actions">
      <button class="btn btn-primary add-to-cart" data-product-id="${product.id}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        Add to Cart
      </button>
    </div>
  `;
  
  // Add event listener to "Add to Cart" button
  productCard.querySelector('.add-to-cart').addEventListener('click', function(event) {
    event.preventDefault();
    const productId = parseInt(this.getAttribute('data-product-id'));
    addToCart(productId);
  });
  
  // Add event listener to the product card to navigate to detail page
  productCard.querySelector('.product-image').addEventListener('click', function() {
    window.location.href = `pages/product-detail.html?id=${product.id}`;
  });
  
  productCard.querySelector('.product-title').addEventListener('click', function() {
    window.location.href = `pages/product-detail.html?id=${product.id}`;
  });
  
  return productCard;
}

// Newsletter Form
function initializeNewsletterForm() {
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterMessage = document.getElementById('newsletter-message');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const email = document.getElementById('newsletter-email').value;
      
      // Simulate form submission
      newsletterMessage.textContent = 'Thank you for subscribing!';
      newsletterMessage.style.color = 'var(--color-success)';
      
      // Reset form
      newsletterForm.reset();
      
      // Clear message after 3 seconds
      setTimeout(() => {
        newsletterMessage.textContent = '';
      }, 3000);
    });
  }
}

// Handle URL parameters
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Format price
function formatPrice(price) {
  return `$${parseFloat(price).toFixed(2)}`;
}