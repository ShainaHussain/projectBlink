// Newsletter functionality

function initializeNewsletterForm() {
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterMessage = document.getElementById('newsletter-message');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const email = document.getElementById('newsletter-email').value;
      
      // Validate email
      if (!validateEmail(email)) {
        newsletterMessage.textContent = 'Please enter a valid email address';
        newsletterMessage.style.color = 'var(--color-error)';
        return;
      }
      
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

// Validate email format
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}