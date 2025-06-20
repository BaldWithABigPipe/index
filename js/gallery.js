// Файл: js/gallery.js
// Описание: Этот модуль управляет модальным окном галереи автомобилей.
// Он отвечает за открытие, закрытие, обновление контента и навигацию по изображениям.

/**
 * Инициализирует галерею автомобилей.
 * @param {import('./data.js').Vehicle} vehicles - Объект с данными об автомобилях.
 * @returns {{updateLanguage: function(string): void}} - Объект с функцией для обновления языка.
 */
export function initGallery(vehicles) {
    // Получаем все необходимые DOM-элементы модального окна.
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.querySelector('.gallery-modal__main-image');
    const modalTitle = document.querySelector('.gallery-modal__title');
    const modalDescription = document.querySelector('.gallery-modal__description');
    const modalSpecs = document.querySelector('.gallery-modal__specs');
    const thumbnailContainer = document.querySelector('.gallery-modal__thumbnail-container');
    const prevButton = document.querySelector('.gallery-modal__prev');
    const nextButton = document.querySelector('.gallery-modal__next');
    const closeButton = document.querySelector('.gallery-modal__close');
    
    // Переменные для хранения текущего состояния галереи.
    let currentVehicle = null;
    let currentImageIndex = 0;
    let currentLang = 'ru'; // Язык по умолчанию.

    // Проверка на наличие всех элементов.
    if (!modal || !modalImage || !modalTitle || !modalDescription || !modalSpecs || !thumbnailContainer || !prevButton || !nextButton || !closeButton) {
        console.error('Ошибка: Не найдены элементы галереи');
        return;
    }

    /**
     * Открывает модальное окно с данными указанного автомобиля.
     * @param {string} vehicleId - ID автомобиля (ключ в объекте `vehicles`).
     * @param {number} [imageIndex=0] - Индекс изображения для отображения.
     */
    function openModal(vehicleId, imageIndex = 0) {
        currentVehicle = vehicles[vehicleId];
        currentVehicle.id = vehicleId; // Сохраняем ID для использования в переводах
        currentImageIndex = imageIndex;
        modal.classList.remove('gallery-modal--hidden');
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
        updateModalContent();
    }

    /**
     * Обновляет содержимое модального окна на основе текущего состояния.
     */
    function updateModalContent() {
        if (!currentVehicle) return;

        modalImage.src = currentVehicle.images[currentImageIndex];
        
        // Используем переводы для названия и описания.
        const vehicleKey = currentVehicle.id;
        if (vehicleKey) {
            const nameKey = `vehicle.${vehicleKey}.name`;
            const descKey = `vehicle.${vehicleKey}.description`;
            
            // Получаем переводы из глобального объекта `window.translations`.
            const translations = window.translations || {};
            const currentTranslations = translations[currentLang] || {};
            
            modalTitle.textContent = currentTranslations[nameKey] || currentVehicle.name;
            modalDescription.textContent = currentTranslations[descKey] || currentVehicle.description;
        } else {
            // Запасной вариант, если ключ не найден.
            modalTitle.textContent = currentVehicle.name;
            modalDescription.textContent = currentVehicle.description;
        }
        
        // Заполняем список характеристик.
        modalSpecs.innerHTML = currentVehicle.specs.map(spec => `<li>${spec}</li>`).join('');
        
        // Генерируем миниатюры изображений.
        thumbnailContainer.innerHTML = currentVehicle.images.map((img, index) => `
            <img src="${img}" alt="${currentVehicle.name} ${index + 1}" class="gallery-modal__thumbnail${index === currentImageIndex ? ' gallery-modal__thumbnail--active' : ''}">
        `).join('');

        // Добавляем обработчики кликов на миниатюры.
        thumbnailContainer.querySelectorAll('.gallery-modal__thumbnail').forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                currentImageIndex = index;
                updateModalContent();
            });
        });
    }

    /**
     * Закрывает модальное окно и сбрасывает состояние.
     */
    function closeModal() {
        modal.classList.add('gallery-modal--hidden');
        document.body.style.overflow = ''; // Восстанавливаем прокрутку фона
        currentVehicle = null;
        currentImageIndex = 0;
    }

    /**
     * Обновляет язык отображения в модальном окне.
     * @param {string} lang - Новый код языка ('ru' или 'en').
     */
    function updateLanguage(lang) {
        currentLang = lang;
        // Если модальное окно открыто, обновляем его содержимое.
        if (currentVehicle) {
            updateModalContent();
        }
    }

    // Обработчик для кнопки "назад".
    prevButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + currentVehicle.images.length) % currentVehicle.images.length;
        updateModalContent();
    });

    // Обработчик для кнопки "вперед".
    nextButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % currentVehicle.images.length;
        updateModalContent();
    });

    // Обработчики для закрытия окна.
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(); // Закрыть по клику на фон.
    });

    // Карта для сопоставления `data-vehicle` из HTML с ключами в объекте `vehicles`.
    // Это временное решение для случаев, когда названия в данных и в разметке не совпадают.
    const fleetMap = {
        'mercedes-s': 'maybach-s680',
        'mercedes-v': 'v-class', // Прямое соответствие
        'mercedes-e': 'sprinter', // TODO: Заменить на корректный ключ, если E-class - это не Sprinter
        'bmw-7': 'maybach-gls',  // TODO: Заменить на корректный ключ для BMW
        'audi-a8': 'maybach-gls', // TODO: Заменить на корректный ключ для Audi
        'rolls-royce-phantom': 'maybach-s680' // TODO: Заменить на корректный ключ для Rolls-Royce
    };

    // Добавляем обработчики кликов на карточки автомобилей.
    document.querySelectorAll('[data-vehicle]').forEach(card => {
        card.addEventListener('click', () => {
            const cardId = card.dataset.vehicle;
            let vehicleId;
            
            // Определяем, из какого раздела карточка, и используем соответствующий ID.
            if (card.classList.contains('hero__vehicle-card')) {
                // Карточки в hero-секции могут иметь прямые ID.
                vehicleId = cardId;
            } else if (card.classList.contains('vehicles__card')) {
                // Карточки в fleet-секции используют карту `fleetMap`.
                vehicleId = fleetMap[cardId];
            } else {
                // Общий случай для других возможных карточек
                vehicleId = fleetMap[cardId] || cardId;
            }

            if (vehicleId && vehicles[vehicleId]) {
                openModal(vehicleId);
            } else {
                // Заглушка, если автомобиль не найден в данных.
                console.warn(`Автомобиль с ID "${cardId}" (сопоставлен с "${vehicleId}") не найден.`);
                openModal('maybach-s680'); // Открываем авто по-умолчанию как заглушку
            }
        });
    });

    // Делаем функцию открытия доступной глобально для вызова из других модулей, если потребуется.
    window.openVehicleGallery = openModal;

    // Возвращаем функцию обновления языка, чтобы ее можно было вызвать из главного скрипта.
    return { updateLanguage };
}