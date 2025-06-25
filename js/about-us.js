/**
 * @file Скрипт для страницы "О нас"
 */

import { translations } from './data.js';
import { changeLanguage, initLanguageSelector } from './language.js';

// Присваиваем переводы для страницы "О нас" глобальному объекту window.translations.
// Это необходимо, чтобы функция changeLanguage имела доступ к нужным данным.
window.translations = translations;

// Ожидаем полной загрузки DOM, прежде чем выполнять скрипты.
document.addEventListener('DOMContentLoaded', () => {
  const loadingOverlay = document.getElementById('loading-overlay');
  
  // Инициализация языка
  const savedLang = localStorage.getItem('selectedLanguage') || 'ru';
  changeLanguage(savedLang, translations);
  
  // Инициализация кастомного селектора языка
  initLanguageSelector(translations);

  // Скрываем оверлей загрузки с небольшой задержкой для плавности.
  setTimeout(() => {
    if (loadingOverlay) loadingOverlay.classList.add('loading-overlay--hidden');
  }, 500);

  // --- МОБИЛЬНОЕ МЕНЮ ---
  const mobileToggle = document.querySelector('.header__mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      
      // Меняем иконку кнопки
      const svg = this.querySelector('svg');
      if (mobileMenu.classList.contains('active')) {
        // Иконка закрытия (X)
        svg.innerHTML = '<path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
      } else {
        // Иконка меню (гамбургер)
        svg.innerHTML = '<path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
      }
    });
    
    // Закрытие меню при клике на ссылку
    const mobileLinks = mobileMenu.querySelectorAll('.header__mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        const svg = mobileToggle.querySelector('svg');
        svg.innerHTML = '<path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
      });
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function(e) {
      if (!mobileToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('active');
        const svg = mobileToggle.querySelector('svg');
        svg.innerHTML = '<path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
      }
    });
    
    // Закрытие меню при нажатии Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        const svg = mobileToggle.querySelector('svg');
        svg.innerHTML = '<path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
      }
    });
  }
}); 