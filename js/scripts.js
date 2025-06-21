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
import { insertStructuredData } from './structured-data.js';

// 2. Основная логика, которая выполняется после полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    
    // --- ИНИЦИАЛИЗАЦИЯ СТРУКТУРИРОВАННЫХ ДАННЫХ ---
    insertStructuredData();
    
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

    // --- ОБРАБОТЧИК КНОПКИ "ДОБАВИТЬ ОБРАТНЫЙ ТРАНСФЕР" ---
    const addReturnTransferButton = document.getElementById('add-return-transfer');
    if (addReturnTransferButton) {
        let returnTransferAdded = false;
        
        addReturnTransferButton.addEventListener('click', () => {
            const addText = addReturnTransferButton.getAttribute('data-add-text');
            const removeText = addReturnTransferButton.getAttribute('data-remove-text');
            
            if (!returnTransferAdded) {
                // Добавляем обратный трансфер
                addReturnTransferButton.textContent = removeText;
                addReturnTransferButton.querySelector('svg').style.transform = 'rotate(45deg)';
                returnTransferAdded = true;
                
                // Здесь можно добавить логику для добавления поля обратного трансфера
                console.log('Обратный трансфер добавлен');
            } else {
                // Убираем обратный трансфер
                addReturnTransferButton.textContent = addText;
                addReturnTransferButton.querySelector('svg').style.transform = 'rotate(0deg)';
                returnTransferAdded = false;
                
                // Здесь можно добавить логику для удаления поля обратного трансфера
                console.log('Обратный трансфер убран');
            }
        });
    }

});