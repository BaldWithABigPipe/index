// Файл: js/about-us.js
// Описание: Этот скрипт является точкой входа для страницы "О нас".
// Он управляет инициализацией страницы, включая загрузку переводов и обработку смены языка.

import { aboutUsTranslations } from './about-us-data.js';
import { changeLanguage } from './language.js';

// Присваиваем переводы для страницы "О нас" глобальному объекту window.translations.
// Это необходимо, чтобы функция changeLanguage имела доступ к нужным данным.
window.translations = aboutUsTranslations;

// Ожидаем полной загрузки DOM, прежде чем выполнять скрипты.
document.addEventListener('DOMContentLoaded', () => {
  const loadingOverlay = document.getElementById('loading-overlay');
  
  // Получаем сохраненный язык из localStorage или используем 'ru' по умолчанию.
  const savedLang = localStorage.getItem('selectedLanguage') || 'ru';
  // Применяем перевод при первоначальной загрузке страницы.
  changeLanguage(savedLang, aboutUsTranslations);

  const languageSelect = document.querySelector('.header__settings-language-select');
  if (languageSelect) {
    // Устанавливаем текущее значение выпадающего списка языков.
    languageSelect.value = savedLang;
    // Добавляем обработчик события для смены языка.
    languageSelect.addEventListener('change', (e) => {
      const lang = e.target.value;
      // Сохраняем выбор пользователя в localStorage.
      localStorage.setItem('selectedLanguage', lang);
      // Применяем новый язык к странице.
      changeLanguage(lang, aboutUsTranslations);
    });
  }

  // Скрываем оверлей загрузки с небольшой задержкой для плавности.
  setTimeout(() => {
    if (loadingOverlay) loadingOverlay.classList.add('loading-overlay--hidden');
  }, 500);
}); 