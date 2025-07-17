// Main entry point
import { showPreloader, hidePreloader } from './preloader.js';
import { getBasePath, getCurrentLanguage, updateLangCurrent, navigateToLanguage, initLangSwitcher } from './lang-switcher.js';
import { openGallery, closeGallery, changeMainImage, initGalleryModals } from './gallery.js';
import { handleCarModal } from './car-modal.js';
import { handleBookingLabels } from './booking-labels.js';
import { handleFAQAccordion } from './faq.js';
import { handleFloatingContact } from './floating-contact.js';
import { initSmoothScroll } from './scroll.js';
import './mobile-menu.js';
import './carousel.js';

// Preloader
// (window load обработан в preloader.js)

// Language switcher
initLangSwitcher(showPreloader);

// Gallery modals
initGalleryModals();

// Car modal
handleCarModal();

// Booking labels
handleBookingLabels();

// FAQ accordion
handleFAQAccordion();

// Floating contact
handleFloatingContact();

// Smooth scroll
initSmoothScroll();

// Ensure preloader works on all pages with correct base path
const basePath = document.currentScript && document.currentScript.src.includes('/js/') ? './' : '../js/';