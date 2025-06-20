/**
 * @file Главный скрипт страницы, который инициализирует все остальные модули.
 * Выполняется после полной загрузки DOM.
 */

// 1. Импорт всех необходимых модулей и данных
import { locations, vehicles, translations } from './data.js';
import { initAutocomplete } from './autocomplete.js';
import { initMap, showRoute } from './map.js';
import { initVehicleSelection } from './vehicle-selection.js';
import { changeLanguage } from './language.js';
import { initFAQ } from './faq.js';
import { initGallery } from './gallery.js';

// 2. Основная логика, которая выполняется после полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    
    // --- ИНИЦИАЛИЗАЦИЯ ЯЗЫКА ---
    const savedLang = localStorage.getItem('selectedLanguage') || 'ru';
    changeLanguage(savedLang, translations);
    
    const languageSelect = document.querySelector('.header__settings-language-select');
    if (languageSelect) {
        languageSelect.value = savedLang;
    }

    // --- ИНИЦИАЛИЗАЦИЯ ОСНОВНЫХ МОДУЛЕЙ ---

    // Инициализация автозаполнения для полей "Откуда" и "Куда"
    initAutocomplete(locations);

    // Инициализация аккордеона в секции FAQ (если он есть на странице)
    if (document.querySelector('.faq')) {
        initFAQ();
    }
    
    // Инициализация галереи
    const gallery = initGallery(vehicles);
    
    // Инициализация логики выбора автомобиля
    if (document.getElementById('vehicle-selection')) {
        initVehicleSelection(vehicles);
    }

    // Инициализация переключателя языка
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            const newLang = e.target.value;
            localStorage.setItem('selectedLanguage', newLang);
            changeLanguage(newLang, translations);
            if (gallery && gallery.updateLanguage) {
                gallery.updateLanguage(newLang);
            }
        });
    }

    // --- ЛЕНИВАЯ ЗАГРУЗКА И ИНИЦИАЛИЗАЦИЯ КАРТЫ ---
    let mapInitialized = false;
    const showRouteButton = document.getElementById('show-route-btn');
    
    if (showRouteButton) {
        showRouteButton.addEventListener('click', async () => {
            if (!mapInitialized) {
                initMap(); // Инициализируем карту только при первом клике.
                mapInitialized = true;
            }
            await showRoute(); // Вызываем функцию показа маршрута из map.js
        });
    }

    // --- ГЛОБАЛЬНЫЕ ФУНКЦИИ ---
    window.showRoute = showRoute;

});