// Mobile menu functionality
const handleMobileMenu = () => {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const hamburger = document.querySelector('.burger-icon');
  
  if (!mobileMenuToggle || !mobileMenu || !hamburger) return;
  
  const toggleMobileMenu = () => {
    const isActive = mobileMenu.classList.contains('mobile-menu--active');
    
    if (isActive) {
      // Close menu
      mobileMenu.classList.remove('mobile-menu--active');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      // Open menu
      mobileMenu.classList.add('mobile-menu--active');
      hamburger.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };
  
  // Toggle menu on hamburger click
  mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  
  // Close menu when clicking on menu items
  const menuLinks = mobileMenu.querySelectorAll('.mobile-menu__link, .mobile-menu__languages-link');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('mobile-menu--active');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('mobile-menu--active')) {
      toggleMobileMenu();
    }
  });
  
  // Close menu on window resize (if screen becomes larger)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && mobileMenu.classList.contains('mobile-menu--active')) {
      toggleMobileMenu();
    }
  });
};

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', handleMobileMenu); 