// Файл: js/autocomplete.js
// Описание: Этот модуль управляет функциональностью автозаполнения для полей "Откуда" и "Куда" в форме бронирования.

/**
 * Инициализирует автозаполнение для полей ввода маршрута.
 * @param {import('./data.js').Location[]} locations - Массив доступных местоположений.
 */
export function initAutocomplete(locations) {
    // Получаем необходимые DOM-элементы из документа.
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');
    const fromSuggestions = document.getElementById('from-suggestions');
    const toSuggestions = document.getElementById('to-suggestions');
    const fromIcon = fromInput?.parentElement.querySelector('.hero__form-icon');
    const toIcon = toInput?.parentElement.querySelector('.hero__form-icon');

    // Проверяем, найдены ли все элементы, и выводим ошибку, если нет.
    if (!fromInput || !toInput || !fromSuggestions || !toSuggestions || !fromIcon || !toIcon) {
        console.error('Ошибка: Не найдены элементы формы автодополнения');
        alert('Ошибка инициализации формы');
        return;
    }

    /**
     * Отображает список подсказок для указанного поля ввода.
     * @param {HTMLInputElement} input - Поле ввода, для которого отображаются подсказки.
     * @param {HTMLElement} suggestionsDiv - Контейнер для отображения подсказок.
     * @param {string} [value=''] - Текущее значение в поле ввода для фильтрации.
     */
    function showSuggestions(input, suggestionsDiv, value = '') {
        suggestionsDiv.innerHTML = ''; // Очищаем предыдущие подсказки.
        
        // Определяем "другое" поле, чтобы исключить его значение из подсказок.
        const otherInput = input === fromInput ? toInput : fromInput;
        const otherValue = otherInput.value.toLowerCase();

        // Фильтруем местоположения:
        // 1. По введенному значению (если оно есть).
        // 2. Исключаем значение, уже выбранное в другом поле.
        const filtered = value
            ? locations.filter(loc => 
                loc.name.toLowerCase().includes(value.toLowerCase()) && 
                loc.name.toLowerCase() !== otherValue)
            : locations.filter(loc => loc.name.toLowerCase() !== otherValue);

        if (filtered.length > 0) {
            // Если есть отфильтрованные результаты, создаем и добавляем их в контейнер.
            filtered.forEach(loc => {
                const div = document.createElement('div');
                div.textContent = loc.name;
                // При клике на подсказку, устанавливаем значение в поле и скрываем список.
                div.onclick = () => {
                    input.value = loc.name;
                    suggestionsDiv.classList.add('hero__suggestions--hidden');
                };
                suggestionsDiv.appendChild(div);
            });
            // Показываем контейнер с подсказками.
            suggestionsDiv.classList.remove('hero__suggestions--hidden');
        } else {
            // Если результатов нет, скрываем контейнер.
            suggestionsDiv.classList.add('hero__suggestions--hidden');
        }
    }

    // Добавляем обработчики событий для полей ввода и иконок.
    fromInput.addEventListener('input', () => showSuggestions(fromInput, fromSuggestions, fromInput.value));
    toInput.addEventListener('input', () => showSuggestions(toInput, toSuggestions, toInput.value));
    fromInput.addEventListener('focus', () => showSuggestions(fromInput, fromSuggestions));
    toInput.addEventListener('focus', () => showSuggestions(toInput, toSuggestions));
    fromIcon.addEventListener('click', () => showSuggestions(fromInput, fromSuggestions));
    toIcon.addEventListener('click', () => showSuggestions(toInput, toSuggestions));

    // Добавляем глобальный обработчик кликов для закрытия списков подсказок.
    document.addEventListener('click', (e) => {
        // Скрываем список, если клик был вне его области и не по связанным элементам.
        if (!fromSuggestions.contains(e.target) && e.target !== fromInput && e.target !== fromIcon && !fromInput.contains(e.target)) {
            fromSuggestions.classList.add('hero__suggestions--hidden');
        }
        if (!toSuggestions.contains(e.target) && e.target !== toInput && e.target !== toIcon && !toInput.contains(e.target)) {
            toSuggestions.classList.add('hero__suggestions--hidden');
        }
    });
}