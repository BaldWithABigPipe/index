// Файл: js/map.js
// Описание: Этот модуль отвечает за всю логику, связанную с картой Leaflet,
// включая инициализацию, отображение маркеров и построение маршрутов.

import { locations } from './data.js';

// Переменные на уровне модуля для хранения экземпляра карты и ее слоев (маркеры, линия маршрута).
// Это позволяет нам получать к ним доступ и удалять их при построении нового маршрута.
let map, fromMarker, toMarker, routeLine;

/**
 * Инициализирует карту Leaflet.
 * Устанавливает начальный центр карты, масштаб и добавляет слой с тайлами OpenStreetMap.
 */
export function initMap() {
    try {
        // Создаем экземпляр карты и привязываем его к div с id="map".
        map = L.map('map').setView([47.3769, 8.5417], 12); // Центр - Цюрих
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        // Делаем карту доступной глобально для отладки и вызова invalidateSize из других мест.
        window.map = map;
    } catch (error) {
        console.error('Ошибка инициализации карты:', error);
        alert('Не удалось загрузить карту. Пожалуйста, проверьте ваше интернет-соединение или попробуйте обновить страницу.');
    }
}

/**
 * Асинхронная функция для отображения маршрута на карте.
 * Вызывается при нажатии на кнопку "Показать маршрут".
 */
export async function showRoute() {
    // Получаем элементы формы.
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');
    
    // Простая валидация: проверяем, что ключевые поля заполнены.
    if (!fromInput.value || !toInput.value) {
        alert('Пожалуйста, выберите пункты отправления и назначения из списка.');
        return;
    }

    // Находим объекты местоположений в нашем массиве данных.
    const fromLoc = locations.find(loc => loc.name.toLowerCase() === fromInput.value.toLowerCase());
    const toLoc = locations.find(loc => loc.name.toLowerCase() === toInput.value.toLowerCase());

    if (!fromLoc || !toLoc) {
        alert('Пожалуйста, выберите действительные адреса из выпадающего списка.');
        return;
    }

    // Очищаем карту от предыдущих маркеров и маршрутов перед отрисовкой новых.
    if (fromMarker) map.removeLayer(fromMarker);
    if (toMarker) map.removeLayer(toMarker);
    if (routeLine) map.removeLayer(routeLine);

    // Создаем и добавляем маркеры для точек A и B.
    fromMarker = L.marker([fromLoc.lat, fromLoc.lng])
        .addTo(map)
        .bindPopup(`<b>Откуда:</b> ${fromLoc.name}`)
        .openPopup();
    toMarker = L.marker([toLoc.lat, toLoc.lng])
        .addTo(map)
        .bindPopup(`<b>Куда:</b> ${toLoc.name}`)
        .openPopup();

    try {
        // Выполняем запрос к API OSRM (Open Source Routing Machine) для получения геометрии маршрута.
        const response = await fetch(
            `https://router.project-osrm.org/route/v1/driving/${fromLoc.lng},${fromLoc.lat};${toLoc.lng},${toLoc.lat}?overview=full&geometries=geojson`
        );
        const data = await response.json();

        if (data.code === 'Ok' && data.routes.length > 0) {
            const route = data.routes[0].geometry.coordinates;
            // OSRM возвращает координаты в формате [lng, lat], а Leaflet ожидает [lat, lng].
            const latLngs = route.map(coord => [coord[1], coord[0]]); 
            
            // Рисуем линию маршрута на карте.
            routeLine = L.polyline(latLngs, { color: '#8B6F47', weight: 5 })
                .addTo(map);
        } else {
            alert('Не удалось построить маршрут. Пожалуйста, попробуйте выбрать другие адреса.');
        }
    } catch (error) {
        console.error('Ошибка при построении маршрута:', error);
        alert('Ошибка при построении маршрута. Проверьте ваше подключение к интернету.');
    }

    // Масштабируем карту так, чтобы весь маршрут был виден.
    const bounds = L.latLngBounds([fromLoc.lat, fromLoc.lng], [toLoc.lat, toLoc.lng]);
    map.fitBounds(bounds, { padding: [50, 50] });

    // --- Изменение состояния UI ---
    
    // Показываем блок выбора автомобилей.
    const vehicleSelection = document.getElementById('vehicle-selection');
    if (vehicleSelection) {
        vehicleSelection.classList.remove('hero__vehicle-selection--hidden');
    }

    // Скрываем форму и показываем контейнер с картой и заголовок.
    const form = document.querySelector('.hero__form');
    const mapContainer = document.querySelector('.hero__map-container');
    const mapTitle = document.querySelector('.hero__map-title');
    if (form) form.classList.add('hero__form--hidden');
    if (mapContainer) mapContainer.classList.remove('hero__map-container--hidden');
    if (mapTitle) {
        mapTitle.classList.remove('hero__map-title--hidden');
    }
    
    // Важный шаг: после того как контейнер карты стал видимым, нужно вызвать `invalidateSize`.
    // Это заставит Leaflet пересчитать размеры карты и правильно отрисовать все тайлы.
    setTimeout(() => { if (map) map.invalidateSize(); }, 200);
}
