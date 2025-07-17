// Tours carousel functionality
const handleToursCarousel = () => {
  const toursFlex = document.querySelector('.tours__flex');
  const items = document.querySelectorAll('.tours__item');
  const prevBtn = document.querySelector('.tours__nav-btn.tours__prev');
  const nextBtn = document.querySelector('.tours__nav-btn.tours__next');
  
  if (!toursFlex || !items.length) return;
  
  let currentIndex = 0;
  let autoPlayInterval;
  let isTransitioning = false;
  
  const getItemsPerView = () => {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    if (window.innerWidth <= 1280) return 3;
    return 4; // Desktop: exactly 4 items
  };
  
  const getGap = () => {
    if (window.innerWidth <= 400) return 8; // 0.5rem - smaller gap for better centering
    if (window.innerWidth <= 600) return 16; // 1rem
    if (window.innerWidth <= 900) return 24; // 1.5rem
    if (window.innerWidth <= 1280) return 24; // 1.5rem
    return 32; // 2rem
  };
  
  const getCarouselPadding = () => {
    if (window.innerWidth <= 400) return 24; // 1.5rem - reduced padding for better centering
    if (window.innerWidth <= 600) return 32; // 2rem
    if (window.innerWidth <= 768) return 40; // 2.5rem
    if (window.innerWidth <= 900) return 48; // 3rem
    if (window.innerWidth <= 1024) return 56; // 3.5rem
    if (window.innerWidth <= 1280) return 64; // 4rem
    if (window.innerWidth <= 1600) return 72; // 4.5rem
    return 80; // 5rem
  };
  
  const calculateItemWidth = () => {
    const carouselWrapper = toursFlex.closest('.tours__carousel-wrapper');
    const containerWidth = carouselWrapper.offsetWidth;
    const itemsPerView = getItemsPerView();
    const gap = getGap();
    const padding = getCarouselPadding();
    
    // Available width = container width - left padding - right padding
    const availableWidth = containerWidth - (padding * 2);
    
    // For single item view on small screens, use fixed width for better centering
    if (window.innerWidth <= 400 && itemsPerView === 1) {
      // Use a fixed width that works well for centering
      return Math.min(280, availableWidth - gap);
    }
    
    // Item width = (available width - gaps between items) / number of items
    const totalGaps = (itemsPerView - 1) * gap;
    const itemWidth = (availableWidth - totalGaps) / itemsPerView;
    
    return Math.floor(itemWidth); // Ensure integer for precise positioning
  };
  
  let itemsPerView = getItemsPerView();
  let maxIndex = Math.max(0, items.length - itemsPerView);
  
  const updateCarousel = () => {
    // Recalculate items per view based on screen size
    itemsPerView = getItemsPerView();
    maxIndex = Math.max(0, items.length - itemsPerView);
    
    // Calculate item width and gap
    const itemWidth = calculateItemWidth();
    const gap = getGap();
    
    // Set item widths to ensure exact fit
    items.forEach(item => {
      item.style.width = `${itemWidth}px`;
      item.style.flexShrink = '0';
      item.style.flexGrow = '0';
    });
    
    // Set gap dynamically
    toursFlex.style.gap = `${gap}px`;
    
    // Calculate the exact position for current index
    const stepDistance = itemWidth + gap;
    const totalMoveDistance = currentIndex * stepDistance;
    
    // Apply smooth transition
    toursFlex.style.transition = 'transform 0.3s ease-in-out';
    toursFlex.style.transform = `translateX(-${totalMoveDistance}px)`;
    
    // Always enable buttons for infinite loop
    [prevBtn, nextBtn].forEach(btn => {
      if (btn) {
        btn.disabled = false;
        btn.style.opacity = '1';
      }
    });
  };
  
  const handleSlideTransition = (direction) => {
    if (isTransitioning) return;
    
    isTransitioning = true;
    
    if (direction === 'next') {
      currentIndex++;
      // Loop to beginning if we reach the end
      if (currentIndex > maxIndex) {
        currentIndex = 0;
      }
    } else {
      currentIndex--;
      // Loop to end if we go before the beginning
      if (currentIndex < 0) {
        currentIndex = maxIndex;
      }
    }
    
    updateCarousel();
    
    setTimeout(() => {
      isTransitioning = false;
    }, 350);
  };
  
  const nextSlide = () => handleSlideTransition('next');
  const prevSlide = () => handleSlideTransition('prev');
  
  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
  };
  
  const stopAutoPlay = () => {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  };
  
  const handleNavigation = (direction) => {
    if (isTransitioning) return;
    stopAutoPlay();
    handleSlideTransition(direction);
    startAutoPlay();
  };
  
  // Event listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', () => handleNavigation('prev'));
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => handleNavigation('next'));
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      handleNavigation('prev');
    } else if (e.key === 'ArrowRight') {
      handleNavigation('next');
    }
  });
  
  // Pause autoplay on hover
  toursFlex.addEventListener('mouseenter', stopAutoPlay);
  toursFlex.addEventListener('mouseleave', startAutoPlay);
  
  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newItemsPerView = getItemsPerView();
      if (newItemsPerView !== itemsPerView) {
        itemsPerView = newItemsPerView;
        maxIndex = Math.max(0, items.length - itemsPerView);
        // Keep currentIndex within bounds but allow it to loop
        if (currentIndex > maxIndex) {
          currentIndex = 0;
        }
      }
      updateCarousel();
    }, 150);
  });
  
  // Initialize
  updateCarousel();
  startAutoPlay();
  
  // Force recalculation on window load
  window.addEventListener('load', () => {
    setTimeout(updateCarousel, 100);
  });
};

// Initialize tours carousel only on main page (not on tours page)
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize carousel if we're not on the tours page
  if (!document.body.classList.contains('tours-page')) {
    handleToursCarousel();
  }
}); 