// Файл: js/vehicle-selection.js
// Описание: Этот модуль отвечает за создание и управление интерфейсом выбора автомобиля.

/**
 * Инициализирует блок выбора автомобиля.
 * Динамически создает карточки автомобилей на основе переданных данных и назначает обработчики событий.
 * @param {import('./data.js').Vehicle} vehicles - Объект с данными об автомобилях.
 */
export function initVehicleSelection(vehicles) {
    const vehicleGrid = document.querySelector('.hero__vehicle-selection-grid');

    if (!vehicleGrid) {
        console.error('Ошибка: Не найден контейнер для выбора автомобилей');
        return;
    }

    // TODO: В объекте `vehicles` в `data.js` отсутствует свойство `price`.
    // Это приводит к отображению "от undefined€". Необходимо добавить цены в данные
    // или обработать их отсутствие, например, скрывая блок цены.
    
    // Динамически генерируем HTML для сетки выбора автомобилей.
    vehicleGrid.innerHTML = Object.keys(vehicles).map(vehicleId => {
        const vehicle = vehicles[vehicleId];
        return `
        <div class="hero__vehicle-card" data-vehicle="${vehicleId}">
            <div class="hero__vehicle-image-container">
                <img src="${vehicle.images[0]}" alt="${vehicle.name}" class="hero__vehicle-card-image">
            </div>
            <div class="hero__vehicle-card-content">
                <div class="hero__vehicle-card-header">
                    <h4 class="hero__vehicle-card-title">${vehicle.name}</h4>
                    <span class="hero__vehicle-card-price">от ${vehicle.price || '...'}€</span>
                </div>
                <p class="hero__vehicle-card-description">${vehicle.description}</p>
                <div class="hero__vehicle-card-footer">
                    <button class="hero__vehicle-card-button" data-lang-key="hero.vehicle.select">Выбрать</button>
                </div>
            </div>
        </div>
    `}).join('');

    // Добавляем обработчики событий для каждой созданной карточки.
    vehicleGrid.querySelectorAll('.hero__vehicle-card').forEach(card => {
        const selectButton = card.querySelector('.hero__vehicle-card-button');
        const imageContainer = card.querySelector('.hero__vehicle-image-container');
        
        // Обработчик для кнопки "Выбрать".
        selectButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Предотвращаем всплытие события до родителя (карточки), чтобы не открылась галерея.
            
            // Находим ранее выбранную карточку, если она есть.
            const previousSelected = vehicleGrid.querySelector('.hero__vehicle-card--selected');
            if (previousSelected) {
                // Снимаем с нее класс выделения.
                previousSelected.classList.remove('hero__vehicle-card--selected');
                // Показываем на ней кнопку "Выбрать".
                const prevButton = previousSelected.querySelector('.hero__vehicle-card-button');
                if (prevButton) {
                    prevButton.style.display = 'block';
                }
            }

            // Выделяем текущую карточку.
            card.classList.add('hero__vehicle-card--selected');
            // Скрываем на ней кнопку "Выбрать", так как она уже выбрана.
            selectButton.style.display = 'none';
            
            // Вызываем функцию выбора, передавая ID автомобиля.
            const vehicleId = card.dataset.vehicle;
            selectVehicle(vehicleId);
        });

        // Обработчик для клика по изображению - открывает галерею.
        imageContainer.addEventListener('click', () => {
            // Проверяем, существует ли глобальная функция галереи.
            if (typeof window.openVehicleGallery === 'function') {
                const vehicleId = card.dataset.vehicle;
                window.openVehicleGallery(vehicleId);
            }
        });
    });
}

/**
 * Обрабатывает выбор автомобиля.
 * @param {string} vehicleId - ID выбранного автомобиля.
 */
function selectVehicle(vehicleId) {
    console.log('Выбран автомобиль:', vehicleId);
    
    // Создаем и отправляем кастомное событие 'vehicleSelected'.
    // Это позволяет другим частям приложения (например, главному скрипту)
    // реагировать на выбор автомобиля, не создавая жестких зависимостей.
    const event = new CustomEvent('vehicleSelected', { detail: { vehicleId } });
    document.dispatchEvent(event);
}