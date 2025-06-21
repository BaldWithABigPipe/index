// Файл: js/language.js
// Описание: Этот модуль содержит централизованную логику для смены языка на всем сайте.

// TODO: Структура данных `reviews` была изменена на единый массив.
// Функция `updateReviews` не будет работать корректно, так как она ожидает объект с ключами 'ru' и 'en'.
// Необходимо либо изменить структуру данных `reviews`, либо перенести тексты отзывов в основной объект `translations`
// и использовать `data-i18n` атрибуты в HTML для карточек отзывов.
import { reviews } from './data.js';

/**
 * Основная функция для смены языка на странице.
 * @param {string} lang - Код целевого языка ('ru' или 'en').
 * @param {object} translations - Объект с переводами, специфичный для текущей страницы.
 */
export function changeLanguage(lang, translations) {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (!loadingOverlay) {
        console.error('Loading overlay not found');
        return;
    }
    
    // --- Логика для мгновенного появления и плавного исчезновения ---
    // 1. Отключаем анимацию, чтобы оверлей появился мгновенно.
    loadingOverlay.style.transition = 'none';
    // 2. Убираем класс, который его скрывает.
    loadingOverlay.classList.remove('loading-overlay--hidden');

    // 3. Вынужденный reflow (перерасчет стилей). Чтение свойства вроде `offsetHeight`
    // заставляет браузер применить изменения CSS (шаги 1 и 2) синхронно.
    void loadingOverlay.offsetHeight;

    // 4. Включаем анимацию обратно, сбросив инлайн-стиль. 
    // Теперь последующее добавление класса `--hidden` будет плавным.
    loadingOverlay.style.transition = '';

    if (!translations || !translations[lang]) {
        console.error(`Translations for language "${lang}" not found`);
        setTimeout(() => {
            // Если переводы не найдены, скрываем оверлей обратно (уже плавно).
            loadingOverlay.classList.add('loading-overlay--hidden');
        }, 500); 
        return;
    }

    // Обновляем текст всех элементов с атрибутом `data-i18n`.
    // Это основной способ перевода статического текста на странице.
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
    });

    // Обновляем placeholder'ы в полях ввода.
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');
    if (fromInput) fromInput.placeholder = translations[lang]['hero.form.from.placeholder'] || 'Enter address';
    if (toInput) toInput.placeholder = translations[lang]['hero.form.to.placeholder'] || 'Enter address';

    // Обновляем текст в выпадающем списке количества пассажиров.
    const passengersSelect = document.getElementById('passengers');
    if (passengersSelect) {
        passengersSelect.querySelectorAll('option').forEach((option, index) => {
            // Генерируем ключ перевода на основе индекса.
            const key = `hero.form.passenger${index + 1}`;
            if (translations[lang][key]) {
                option.textContent = translations[lang][key];
            }
        });
    }

    // Обновляем текст в блоке рейтинга в шапке.
    const ratingText = document.querySelector('.header__rating-text');
    if (ratingText) {
        const key = 'header.rating';
        if (translations[lang][key]) {
            ratingText.textContent = translations[lang][key];
        }
    }

    // Обновляем текстовое содержимое карточек отзывов.
    updateReviews(lang);

    // Устанавливаем атрибут `lang` у тега `<html>` для доступности и SEO.
    document.documentElement.lang = lang;

    // Обновляем `alt` атрибуты у изображений для лучшей доступности.
    updateImageAltAttributes(lang);

    // Скрываем оверлей загрузки с небольшой задержкой после выполнения всех операций.
    setTimeout(() => {
        loadingOverlay.classList.add('loading-overlay--hidden');
    }, 500);
}

/**
 * Обновляет текст в карточках отзывов.
 * @param {string} lang - Текущий язык.
 */
function updateReviews(lang) {
    const reviewCards = document.querySelectorAll('.review-card');
    // ВНИМАНИЕ: Логика ниже некорректна из-за структуры `reviews` в data.js.
    // Оставлено для демонстрации, но требует исправления.
    reviewCards.forEach((card, index) => {
        const reviewData = reviews[index]; // Получаем отзыв по индексу из единого массива
        if(reviewData) {
            const textElement = card.querySelector('.review-card__text');
            const nameElement = card.querySelector('.review-card__name');
            const dateElement = card.querySelector('.review-card__date');
            
            // Предполагается, что отзывы в data.js могут содержать переводы,
            // или что текст должен быть переведен через основной объект translations.
            // Текущая реализация просто вставляет текст как есть.
            if (textElement) textElement.textContent = reviewData.text[lang] || reviewData.text['en']; // Пример, как это могло бы работать
            if (nameElement) nameElement.textContent = reviewData.name;
            if (dateElement) dateElement.textContent = reviewData.date[lang] || reviewData.date['ru'];
        }
    });
}

/**
 * Обновляет `alt` атрибуты изображений на основе текущего языка.
 * @param {string} lang - Текущий язык.
 */
function updateImageAltAttributes(lang) {
    // Локальный объект с переводами для `alt` атрибутов.
    // Это полезно для SEO и доступности.
    const altTranslations = {
        ru: {
            'mercedes_s_class.webp': 'Mercedes-Benz S-Class',
            'mercedes_v_class.webp': 'Mercedes-Benz V-Class',
            'mercedes_e_class.webp': 'Mercedes-Benz E-Class',
            'bmw_7_series.webp': 'BMW 7 Series',
            'audi_a8.webp': 'Audi A8',
            'rolls_royce_phantom.webp': 'Rolls-Royce Phantom',
            'zermatt.webp': 'Трансфер в Церматт',
            'geneva.webp': 'Трансфер в Женеву',
            'st-moritz.webp': 'Трансфер в Санкт-Мориц',
            'milan.webp': 'Трансфер в Милан',
            'avatar1.webp': 'Аватар клиента John D.',
            'avatar2.webp': 'Аватар клиента Anna K.',
            'avatar3.webp': 'Аватар клиента Peter S.',
            'avatar4.webp': 'Аватар клиента Maria L.',

        },
        en: {
            'mercedes_s_class.webp': 'Mercedes-Benz S-Class',
            'mercedes_v_class.webp': 'Mercedes-Benz V-Class',
            'mercedes_e_class.webp': 'Mercedes-Benz E-Class',
            'bmw_7_series.webp': 'BMW 7 Series',
            'audi_a8.webp': 'Audi A8',
            'rolls_royce_phantom.webp': 'Rolls-Royce Phantom',
            'zermatt.webp': 'Transfer to Zermatt',
            'geneva.webp': 'Transfer to Geneva',
            'st-moritz.webp': 'Transfer to St. Moritz',
            'milan.webp': 'Transfer to Milan',
            'avatar1.webp': 'Client avatar John D.',
            'avatar2.webp': 'Client avatar Anna K.',
            'avatar3.webp': 'Client avatar Peter S.',
            'avatar4.webp': 'Client avatar Maria L.',
        }
    };

    // Находим все изображения на странице.
    document.querySelectorAll('img').forEach(img => {
        const src = img.getAttribute('src');
        if (!src) return;
        
        // Извлекаем имя файла из пути.
        const filename = src.split('/').pop().split('?')[0]; // Удаляем query params, если есть
        if (altTranslations[lang] && altTranslations[lang][filename]) {
            img.alt = altTranslations[lang][filename];
        }
    });
}