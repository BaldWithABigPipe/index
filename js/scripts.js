/**
 * @file Главный скрипт страницы, который инициализирует все остальные модули.
 * Выполняется после полной загрузки DOM.
 */

// 1. Импорт всех необходимых модулей и данных
import { locations, vehicles, translations } from './data.js';
import { initAutocomplete } from './autocomplete.js';
import { initMap, showRoute } from './map.js';
import { initVehicleSelection } from './vehicle-selection.js';
import { changeLanguage, initLanguageSelector } from './language.js';
import { initFAQ } from './faq.js';
import { initGallery } from './gallery.js';
import { insertStructuredData } from './structured-data.js';
import { initDatepicker, linkDateFields, manageReturnDateField } from './datepicker.js';
import { CTAButtons } from './cta-buttons.js';

// 2. Основная логика, которая выполняется после полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    
    // --- ПРОВЕРКА ПОДДЕРЖКИ STICKY ПОЗИЦИОНИРОВАНИЯ ---
    const header = document.querySelector('.header');
    if (header) {
        // Проверяем поддержку sticky позиционирования
        const isStickySupported = CSS.supports('position', 'sticky') || 
                                 CSS.supports('position', '-webkit-sticky');
        
        if (!isStickySupported) {
            // Если sticky не поддерживается, применяем fixed позиционирование
            header.style.position = 'fixed';
            header.style.top = '0';
            header.style.left = '0';
            header.style.right = '0';
            header.style.zIndex = '10000';
            
            // Добавляем отступ для основного контента
            const main = document.querySelector('main');
            if (main) {
                main.style.paddingTop = '80px';
            }
        }
    }
    
    // --- ИНИЦИАЛИЗАЦИЯ СТРУКТУРИРОВАННЫХ ДАННЫХ ---
    insertStructuredData();
    
    // --- ИНИЦИАЛИЗАЦИЯ ЯЗЫКА ---
    const savedLang = localStorage.getItem('selectedLanguage') || 'ru';
    changeLanguage(savedLang, translations);
    
    // Инициализация кастомного селектора языка
    initLanguageSelector(translations);

    // --- ИНИЦИАЛИЗАЦИЯ CTA КНОПОК ---
    // Инициализация системы CTA кнопок (показ/скрытие при прокрутке)
    new CTAButtons();

    // --- ИНИЦИАЛИЗАЦИЯ ОСНОВНЫХ МОДУЛЕЙ ---

    // Инициализация автозаполнения для полей "Откуда" и "Куда"
    initAutocomplete(locations);

    // Инициализация аккордеона в секции FAQ (если он есть на странице)
    if (document.querySelector('.faq')) {
        initFAQ();
    }
    
    // Инициализация галереи
    const gallery = initGallery(vehicles);
    
    // Делаем галерею доступной глобально для обновления языка
    window.gallery = gallery;

    // Инициализация логики выбора автомобиля
    if (document.getElementById('vehicle-selection')) {
    initVehicleSelection(vehicles);
    }

    // --- ЛЕНИВАЯ ЗАГРУЗКА И ИНИЦИАЛИЗАЦИЯ КАРТЫ ---
    let mapInitialized = false;
    const showRouteButton = document.getElementById('show-route-btn') || document.getElementById('show-route-bt');
    
    if (showRouteButton) {
        showRouteButton.addEventListener('click', async () => {
            if (!mapInitialized) {
                initMap();
                mapInitialized = true;
            }
            await showRoute();
        });
    }

    // --- ГЛОБАЛЬНЫЕ ФУНКЦИИ ---
    window.showRoute = showRoute;

    // --- ОБРАБОТЧИК КНОПКИ "ДОБАВИТЬ ОБРАТНЫЙ ТРАНСФЕР" ---
    // (Вся логика создания/удаления return-date теперь реализуется в datepicker.js)
    // После создания/рендера полей:
    const tripDateInput = document.getElementById('date');
    let returnDateInput = document.getElementById('return-date');

    const today = new Date();
    today.setHours(0,0,0,0);

    if (tripDateInput) {
        initDatepicker(tripDateInput, { min: today });
        manageReturnDateField(tripDateInput, savedLang, translations);
    }

    // --- АНИМАЦИЯ ЛОГОТИПА ---
    const logo = document.querySelector('.header__logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            if (!logo.classList.contains('shine')) {
                logo.classList.add('shine');
            }
        });
        logo.addEventListener('animationend', function(e) {
            if (e.animationName === 'logo-shine-move') {
                logo.classList.remove('shine');
            }
        });
    }

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