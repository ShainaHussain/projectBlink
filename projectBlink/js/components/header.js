// Header-related functionality

function initializeHeader() {
  // Toggle mobile menu
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  
  if (mobileMenuToggle && mobileMenu && mobileMenuClose) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenu.classList.add('active');
    });
    
    mobileMenuClose.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
    });
  }
  
  // Toggle search overlay
  const searchToggle = document.getElementById('search-toggle');
  const searchOverlay = document.getElementById('search-overlay');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  if (searchToggle && searchOverlay && searchClose && searchInput) {
    searchToggle.addEventListener('click', function() {
      searchOverlay.classList.add('active');
      searchInput.focus();
    });
    
    searchClose.addEventListener('click', function() {
      searchOverlay.classList.remove('active');
      searchInput.value = '';
      searchResults.innerHTML = '';
    });
    
    // Search functionality
    searchInput.addEventListener('input', function() {
      const query = this.value.toLowerCase().trim();
      
      if (query.length < 2) {
        searchResults.innerHTML = '';
        return;
      }
      
      const results = searchProducts(query);
      displaySearchResults(results);
    });
  }
  
  // Header scroll effect
  const header = document.getElementById('site-header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 80) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
    
    // Check scroll position on page load
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    }
  }
  
  // Update active nav link based on current page
  updateActiveNavLink();
}

// Search products
function searchProducts(query) {
  if (!query) return [];
  
  return products.filter(product => {
    return (
      product.title.toLowerCase().includes(query) || 
      product.category.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  }).slice(0, 6); // Limit to 6 results
}

// Display search results
function displaySearchResults(results) {
  const searchResults = document.getElementById('search-results');
  
  if (!searchResults) return;
  
  searchResults.innerHTML = '';
  
  if (results.length === 0) {
    searchResults.innerHTML = '<p class="text-center">No products found. Try a different search term.</p>';
    return;
  }
  
  const resultsFragment = document.createDocumentFragment();
  
  results.forEach(product => {
    const resultItem = document.createElement('div');
    resultItem.className = 'search-result-item';
    
    resultItem.innerHTML = `
      <div class="search-result-image">
        <img src="${product.image}" alt="${product.title}" loading="lazy">
      </div>
      <div class="search-result-info">
        <h3>${product.title}</h3>
        <p>${formatPrice(product.price)}</p>
      </div>
    `;
    
    resultItem.addEventListener('click', function() {
      window.location.href = `pages/product-detail.html?id=${product.id}`;
    });
    
    resultsFragment.appendChild(resultItem);
  });
  
  searchResults.appendChild(resultsFragment);
  
  // Add some basic styling for search results
  const style = document.createElement('style');
  if (!document.querySelector('style[data-search-styles]')) {
    style.setAttribute('data-search-styles', 'true');
    style.textContent = `
      .search-result-item {
        display: flex;
        margin-bottom: 1rem;
        padding: 0.5rem;
        border-radius: var(--border-radius-sm);
        transition: var(--transition);
        cursor: pointer;
      }
      
      .search-result-item:hover {
        background-color: var(--color-background-alt);
      }
      
      .search-result-image {
        width: 50px;
        height: 50px;
        margin-right: 1rem;
        border-radius: var(--border-radius-sm);
        overflow: hidden;
      }
      
      .search-result-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .search-result-info h3 {
        font-size: 0.875rem;
        margin-bottom: 0.25rem;
      }
      
      .search-result-info p {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--color-primary);
        margin-bottom: 0;
      }
    `;
    document.head.appendChild(style);
  }
}

// Update active nav link
function updateActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.header-nav a, .mobile-nav a');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    
    // Get the link path
    let linkPath = link.getAttribute('href');
    
    // Handle index.html and root path
    if (linkPath === 'index.html' || linkPath === '/') {
      if (currentPath === '/' || currentPath.endsWith('index.html')) {
        link.classList.add('active');
      }
    } 
    // Handle other pages
    else if (currentPath.includes(linkPath)) {
      link.classList.add('active');
    }
  });
}