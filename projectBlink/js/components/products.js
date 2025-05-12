// Products functionality

// Load products page
function loadProductsPage() {
  const productsContainer = document.getElementById('products-container');
  const categoryFilter = document.getElementById('category-filter');
  const sortSelect = document.getElementById('sort-select');
  
  if (!productsContainer) return;
  
  // Get query parameters
  const categoryParam = getUrlParameter('category');
  
  // Filter products by category if specified
  let filteredProducts = categoryParam ? 
    products.filter(product => product.category === categoryParam) : 
    [...products];
  
  // Initialize filter options
  if (categoryFilter) {
    // Add event listener to category filter
    categoryFilter.addEventListener('change', function() {
      filterProducts();
    });
    
    // Set initial value if category parameter exists
    if (categoryParam) {
      categoryFilter.value = categoryParam;
    }
  }
  
  // Initialize sort options
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      filterProducts();
    });
  }
  
  // Display products
  displayProducts(filteredProducts);
  
  // Filter products based on current filter and sort options
  function filterProducts() {
    let filtered = [...products];
    
    // Apply category filter
    if (categoryFilter && categoryFilter.value !== 'all') {
      filtered = filtered.filter(product => product.category === categoryFilter.value);
    }
    
    // Apply price range filter if present
    const priceRange = document.getElementById('price-range');
    const priceOutput = document.getElementById('price-output');
    
    if (priceRange && priceOutput) {
      const maxPrice = priceRange.value;
      priceOutput.textContent = `$${maxPrice}`;
      filtered = filtered.filter(product => product.price <= maxPrice);
    }
    
    // Apply sort
    if (sortSelect) {
      switch (sortSelect.value) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          filtered = filtered.filter(product => product.new).concat(
            filtered.filter(product => !product.new)
          );
          break;
      }
    }
    
    // Display filtered and sorted products
    displayProducts(filtered);
  }
  
  // Display products
  function displayProducts(productsList) {
    productsContainer.innerHTML = '';
    
    if (productsList.length === 0) {
      productsContainer.innerHTML = `
        <div class="no-products">
          <p>No products found. Try a different filter.</p>
        </div>
      `;
      return;
    }
    
    productsList.forEach(product => {
      productsContainer.appendChild(createProductCard(product));
    });
  }
}

// Load product detail page
function loadProductDetailPage() {
  const productId = parseInt(getUrlParameter('id'));
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    window.location.href = 'products.html';
    return;
  }
  
  // Update page title
  document.title = `${product.title} | Premium Store`;
  
  // Update product details
  const productTitle = document.getElementById('product-title');
  const productPrice = document.getElementById('product-price');
  const productOriginalPrice = document.getElementById('product-original-price');
  const productDiscount = document.getElementById('product-discount');
  const productRating = document.getElementById('product-rating');
  const productRatingCount = document.getElementById('product-rating-count');
  const productDescription = document.getElementById('product-description');
  const productCategory = document.getElementById('product-category');
  const productAvailability = document.getElementById('product-availability');
  const productSku = document.getElementById('product-sku');
  const addToCartButton = document.getElementById('add-to-cart-button');
  const mainImage = document.getElementById('main-image');
  const colorVariations = document.getElementById('color-variations');
  
  if (productTitle) productTitle.textContent = product.title;
  if (productPrice) productPrice.textContent = formatPrice(product.price);
  
  if (productOriginalPrice && product.originalPrice) {
    productOriginalPrice.textContent = formatPrice(product.originalPrice);
    productOriginalPrice.style.display = 'inline';
  } else if (productOriginalPrice) {
    productOriginalPrice.style.display = 'none';
  }
  
  if (productDiscount && product.discountPercentage) {
    productDiscount.textContent = `-${product.discountPercentage}%`;
    productDiscount.style.display = 'inline';
  } else if (productDiscount) {
    productDiscount.style.display = 'none';
  }
  
  if (productRating) {
    let ratingStars = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(product.rating)) {
        ratingStars += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
      } else if (i === Math.ceil(product.rating) && !Number.isInteger(product.rating)) {
        ratingStars += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l2.42 6.17L22 9.24l-5 4.87 1.18 6.89L12 17.77 8.42 18.98l-1.18-6.89-5-4.87 7.58-1.07L12 2z"></path></svg>';
      } else {
        ratingStars += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
      }
    }
    productRating.innerHTML = ratingStars;
  }
  
  if (productRatingCount) productRatingCount.textContent = `(${product.ratingCount} reviews)`;
  if (productDescription) productDescription.textContent = product.description;
  if (productCategory) productCategory.textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
  if (productAvailability) productAvailability.textContent = product.inStock ? 'In Stock' : 'Out of Stock';
  if (productSku) productSku.textContent = `SKU-${product.id.toString().padStart(5, '0')}`;
  
  // Setup main image
  if (mainImage) {
    mainImage.src = product.images[0] || product.image;
    mainImage.alt = product.title;
  }
  
  // Setup gallery thumbnails
  const galleryThumbnails = document.getElementById('gallery-thumbnails');
  if (galleryThumbnails && product.images.length > 0) {
    galleryThumbnails.innerHTML = '';
    
    product.images.forEach((image, index) => {
      const thumbnail = document.createElement('div');
      thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
      thumbnail.innerHTML = `<img src="${image}" alt="${product.title} - Image ${index + 1}">`;
      
      thumbnail.addEventListener('click', function() {
        // Update main image
        mainImage.src = image;
        
        // Update active thumbnail
        document.querySelectorAll('.thumbnail').forEach(thumb => {
          thumb.classList.remove('active');
        });
        this.classList.add('active');
      });
      
      galleryThumbnails.appendChild(thumbnail);
    });
  }
  
  // Setup color variations
  if (colorVariations && product.colors && product.colors.length > 0) {
    colorVariations.innerHTML = '';
    
    product.colors.forEach((color, index) => {
      const colorOption = document.createElement('div');
      colorOption.className = `color-option ${index === 0 ? 'active' : ''}`;
      colorOption.style.backgroundColor = color;
      
      colorOption.addEventListener('click', function() {
        // Update active color
        document.querySelectorAll('.color-option').forEach(option => {
          option.classList.remove('active');
        });
        this.classList.add('active');
      });
      
      colorVariations.appendChild(colorOption);
    });
  } else if (colorVariations && (!product.colors || product.colors.length === 0)) {
    // Hide color variations section if no colors
    const colorVariationsSection = document.querySelector('.variation.colors');
    if (colorVariationsSection) {
      colorVariationsSection.style.display = 'none';
    }
  }
  
  // Setup quantity buttons
  const quantityInput = document.getElementById('quantity');
  const decrementBtn = document.querySelector('.quantity-btn:first-child');
  const incrementBtn = document.querySelector('.quantity-btn:last-child');
  
  if (quantityInput && decrementBtn && incrementBtn) {
    decrementBtn.addEventListener('click', function() {
      const currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });
    
    incrementBtn.addEventListener('click', function() {
      const currentValue = parseInt(quantityInput.value);
      quantityInput.value = currentValue + 1;
    });
  }
  
  // Setup add to cart button
  if (addToCartButton) {
    addToCartButton.addEventListener('click', function() {
      const quantity = parseInt(quantityInput.value);
      addToCart(product.id, quantity);
    });
  }
  
  // Setup product tabs
  const tabItems = document.querySelectorAll('.tab-item');
  const tabContents = document.querySelectorAll('.tab-content');
  
  if (tabItems.length > 0 && tabContents.length > 0) {
    tabItems.forEach(tab => {
      tab.addEventListener('click', function() {
        const target = this.getAttribute('data-tab');
        
        // Update active tab
        tabItems.forEach(item => {
          item.classList.remove('active');
        });
        this.classList.add('active');
        
        // Show target tab content
        tabContents.forEach(content => {
          content.classList.remove('active');
          if (content.id === target) {
            content.classList.add('active');
          }
        });
      });
    });
  }
}