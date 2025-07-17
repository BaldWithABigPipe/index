// Floating contact button module (BEM)
export const handleFloatingContact = () => {
  const contactButton = document.getElementById('contactButton');
  const contactPopup = document.getElementById('contactPopup');
  if (!contactButton || !contactPopup) return;
  
  // Footer visibility check for mobile screens
  const handleFooterVisibility = () => {
    if (window.innerWidth > 600) return; // Only for screens 600px and below
    
    const footer = document.querySelector('.footer');
    if (!footer) return;
    
    const footerRect = footer.getBoundingClientRect();
    const buttonRect = contactButton.getBoundingClientRect();
    
    // Check if footer is visible and button would overlap with it
    const isFooterVisible = footerRect.top < window.innerHeight;
    const wouldButtonOverlap = buttonRect.bottom > footerRect.top;
    
    if (isFooterVisible && wouldButtonOverlap) {
      contactButton.classList.add('floating-contact__button--hidden');
    } else {
      contactButton.classList.remove('floating-contact__button--hidden');
    }
  };
  
  // Initial check
  handleFooterVisibility();
  
  // Check on scroll
  let scrollTimeout;
  const handleScroll = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(handleFooterVisibility, 10);
  };
  
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleFooterVisibility);
  
  const togglePopup = () => {
    const isVisible = contactPopup.classList.contains('floating-contact__popup--visible');
    if (isVisible) {
      contactPopup.classList.remove('floating-contact__popup--visible');
      contactButton.setAttribute('aria-expanded', 'false');
    } else {
      contactPopup.classList.add('floating-contact__popup--visible');
      contactButton.setAttribute('aria-expanded', 'true');
    }
  };
  
  contactButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    togglePopup();
  });
  
  contactButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      togglePopup();
    }
  });
  
  document.addEventListener('click', (e) => {
    const isClickInside = contactButton.contains(e.target) || contactPopup.contains(e.target);
    if (!isClickInside && contactPopup.classList.contains('floating-contact__popup--visible')) {
      contactPopup.classList.remove('floating-contact__popup--visible');
      contactButton.setAttribute('aria-expanded', 'false');
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactPopup.classList.contains('floating-contact__popup--visible')) {
      contactPopup.classList.remove('floating-contact__popup--visible');
      contactButton.setAttribute('aria-expanded', 'false');
    }
  });
  
  const contactLinks = contactPopup.querySelectorAll('.floating-contact__popup-link');
  contactLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.href.startsWith('tel:')) return;
      if (link.target === '_blank') {
        setTimeout(() => {
          contactPopup.classList.remove('floating-contact__popup--visible');
          contactButton.setAttribute('aria-expanded', 'false');
        }, 100);
      }
    });
  });
}; 