// datepicker.js
// Кастомный datepicker для полей даты поездки и даты возвращения
// Экспорт: initDatepicker(input, {min}), setMinDate(input, minDate)

function getToday() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
}

function formatDate(date) {
    if (!date) return '';
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
}

// Universal parseDate: supports DD.MM.YYYY and YYYY-MM-DD
function parseDate(str) {
    if (!str) return null;
    if (str instanceof Date) return str;
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(str)) {
        const [dd, mm, yyyy] = str.split('.');
        return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
        const [yyyy, mm, dd] = str.split('-');
        return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
    }
    const d = new Date(str);
    if (!isNaN(d)) return d;
    return null;
}

export { parseDate };

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

const datepickerState = new WeakMap();

export function initDatepicker(input, options = {}) {
    let minDate = options.min ? (typeof options.min === 'string' ? parseDate(options.min) : options.min) : getToday();
    let selectedDate = input.value ? parseDate(input.value) : minDate;
    if (!input.value) input.value = formatDate(selectedDate);
    datepickerState.set(input, { minDate, selectedDate });
    
    // Навешиваем обработчик focus на input
    input.addEventListener('focus', openDatepicker);
    // Если есть .hero__form-input-wrapper, навешиваем click на него
    const inputWrapper = input.parentNode && input.parentNode.classList.contains('hero__form-input-wrapper') ? input.parentNode : null;
    if (inputWrapper) {
        inputWrapper.addEventListener('click', openDatepicker);
        inputWrapper.addEventListener('select', openDatepicker); // если нужно
    } else {
        input.addEventListener('click', openDatepicker);
        input.addEventListener('select', openDatepicker);
    }
    
    // Иконка-календарь (ищем как img, так и svg)
    const icon = input.parentNode && input.parentNode.querySelector('.hero__form-icon');
    if (icon) {
        icon.addEventListener('click', openDatepicker);
    }
    
    function openDatepicker() {
        closeDatepicker();
        const rect = input.getBoundingClientRect();
        const state = datepickerState.get(input) || {};
        const dp = renderDatepicker(input, state.minDate, state.selectedDate, (date) => {
            input.value = formatDate(date);
            datepickerState.set(input, { minDate: state.minDate, selectedDate: date });
            closeDatepicker();
            input.dispatchEvent(new Event('change', { bubbles: true }));
        });
        dp._forInput = input;
        document.body.appendChild(dp);
        dp.style.position = 'absolute';
        dp.style.left = `${rect.left + window.scrollX}px`;
        dp.style.top = `${rect.bottom + window.scrollY + 2}px`;
        dp.style.zIndex = 9999;
        setTimeout(() => document.addEventListener('mousedown', onOutsideClick), 0);
    }
    
    function closeDatepicker() {
        const dp = document.getElementById('custom-datepicker');
        if (dp) dp.remove();
        document.removeEventListener('mousedown', onOutsideClick);
    }
    
    function onOutsideClick(e) {
        const dp = document.getElementById('custom-datepicker');
        if (dp && !dp.contains(e.target)) closeDatepicker();
    }
}

export function setMinDate(input, minDate) {
    let state = datepickerState.get(input) || {};
    state.minDate = typeof minDate === 'string' ? parseDate(minDate) : minDate;
    if (state.selectedDate && state.selectedDate < state.minDate) {
        state.selectedDate = state.minDate;
        input.value = formatDate(state.minDate);
        input.dispatchEvent(new Event('change', { bubbles: true }));
    }
    datepickerState.set(input, state);
    const dp = document.getElementById('custom-datepicker');
    if (dp && dp._forInput === input) {
        dp.remove();
        input.focus();
    }
}

function renderDatepicker(input, minDate, selectedDate, onSelect) {
    const today = getToday();
    let current = selectedDate || minDate || today;
    let year = current.getFullYear();
    let month = current.getMonth();
    const dp = document.createElement('div');
    dp.id = 'custom-datepicker';
    dp.style.background = '#181818';
    dp.style.border = '1px solid #a78d45';
    dp.style.borderRadius = '8px';
    dp.style.padding = '16px';
    dp.style.boxShadow = '0 4px 16px rgba(0,0,0,0.25)';
    dp.style.minWidth = '260px';
    dp.style.color = '#fff';
    dp.style.fontFamily = 'Rubik, sans-serif';
    dp.style.userSelect = 'none';
    dp.style.transition = 'box-shadow 0.2s';
    dp.tabIndex = -1;
    function update() {
        dp.innerHTML = '';
        const header = document.createElement('div');
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';
        header.style.marginBottom = '8px';
        const prev = document.createElement('button');
        prev.textContent = '<';
        prev.style.background = 'none';
        prev.style.border = 'none';
        prev.style.color = '#a78d45';
        prev.style.fontSize = '1.2rem';
        prev.style.cursor = 'pointer';
        prev.disabled = (year < minDate.getFullYear() || (year === minDate.getFullYear() && month <= minDate.getMonth()));
        prev.addEventListener('click', () => { if (month === 0) { year--; month = 11; } else { month--; } update(); });
        const next = document.createElement('button');
        next.textContent = '>';
        next.style.background = 'none';
        next.style.border = 'none';
        next.style.color = '#a78d45';
        next.style.fontSize = '1.2rem';
        next.style.cursor = 'pointer';
        next.addEventListener('click', () => { if (month === 11) { year++; month = 0; } else { month++; } update(); });
        const title = document.createElement('span');
        title.textContent = `${year} - ${String(month + 1).padStart(2, '0')}`;
        title.style.fontWeight = 'bold';
        title.style.fontSize = '1.1rem';
        header.appendChild(prev);
        header.appendChild(title);
        header.appendChild(next);
        dp.appendChild(header);
        const daysRow = document.createElement('div');
        daysRow.style.display = 'grid';
        daysRow.style.gridTemplateColumns = 'repeat(7, 1fr)';
        daysRow.style.marginBottom = '4px';
        ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].forEach(d => {
            const el = document.createElement('div');
            el.textContent = d;
            el.style.textAlign = 'center';
            el.style.fontSize = '0.9rem';
            el.style.color = '#a78d45';
            daysRow.appendChild(el);
        });
        dp.appendChild(daysRow);
        const grid = document.createElement('div');
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(7, 1fr)';
        grid.style.gap = '2px';
        const firstDay = new Date(year, month, 1).getDay() || 7;
        for (let i = 1; i < firstDay; i++) {
            const empty = document.createElement('div');
            grid.appendChild(empty);
        }
        const days = getDaysInMonth(year, month);
        for (let d = 1; d <= days; d++) {
            const date = new Date(year, month, d);
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = d;
            btn.className = 'datepicker-day';
            btn.tabIndex = -1;
            if (minDate && date < minDate) {
                btn.disabled = true;
                btn.style.color = '#888';
            } else if (selectedDate && date.getTime() === selectedDate.getTime()) {
                btn.style.background = 'none';
                btn.style.position = 'relative';
                btn.style.color = '#fff';
                btn.style.border = 'none';
                btn.style.borderRadius = '4px';
                btn.style.padding = '6px 0';
                btn.style.fontSize = '1rem';
                btn.style.cursor = (date >= minDate) ? 'pointer' : 'not-allowed';
                btn.disabled = date < minDate;
            } else {
                btn.style.background = 'none';
                btn.style.color = '#fff';
                btn.style.border = 'none';
                btn.style.borderRadius = '4px';
                btn.style.padding = '6px 0';
                btn.style.fontSize = '1rem';
                btn.style.cursor = 'pointer';
                btn.disabled = false;
            }
            btn.addEventListener('click', () => { if (date >= minDate) onSelect(date); });
            grid.appendChild(btn);
        }
        dp.appendChild(grid);
    }
    update();
    return dp;
}

/**
 * Связывает два поля: поле даты поездки (tripInput) и поле даты возврата (returnInput).
 * После выбора даты поездки минимальная дата для возврата всегда равна выбранной дате поездки.
 * При каждом изменении tripInput ограничения для returnInput обновляются и календарь перерисовывается.
 * При каждом открытии календаря returnInput minDate всегда актуальна.
 */
export function linkDateFields(tripInput, returnInput) {
    if (!tripInput || !returnInput) return;
    if (!datepickerState.has(tripInput)) initDatepicker(tripInput, { min: getToday() });
    if (!datepickerState.has(returnInput)) initDatepicker(returnInput, { min: getToday() });
    function updateReturnMinDate() {
        const tripDate = parseDate(tripInput.value);
        const minReturnDate = tripDate || getToday();
        setMinDate(returnInput, minReturnDate);
    }
    tripInput.addEventListener('change', updateReturnMinDate);
    tripInput.addEventListener('input', updateReturnMinDate);
    returnInput.addEventListener('focus', updateReturnMinDate);
    returnInput.addEventListener('click', updateReturnMinDate);
    updateReturnMinDate();
}

/**
 * Управляет динамическим созданием и удалением поля "дата возвращения" и кнопки "добавить обратный трансфер".
 * Вызывает initDatepicker и linkDateFields для новых полей.
 * @param {HTMLInputElement} tripDateInput - поле даты поездки
 * @param {string} savedLang - текущий язык
 * @param {object} translations - объект переводов
 */
export function manageReturnDateField(tripDateInput, savedLang, translations) {
    const addReturnTransferButton = document.getElementById('add-return-transfer');
    if (!addReturnTransferButton) return;
    let returnTransferGroup = null;
    let returnTransferInput = null;
    
    addReturnTransferButton.addEventListener('click', function() {
        // Создаем группу для поля даты обратного трансфера
        returnTransferGroup = document.createElement('div');
        returnTransferGroup.className = 'hero__form-group';
        returnTransferGroup.style.position = 'relative';
        
        // Label
        const label = document.createElement('label');
        label.className = 'hero__form-label';
        label.setAttribute('for', 'return-date');
        label.textContent = (translations && translations[savedLang] && translations[savedLang]['hero.form.returnDate']) || 'Дата возвращения';
        returnTransferGroup.appendChild(label);
        
        // Input wrapper
        const inputWrapper = document.createElement('div');
        inputWrapper.className = 'hero__form-input-wrapper';
        
        // Создаем иконку календаря
        const calendarIcon = document.createElement('img');
        calendarIcon.className = 'hero__form-icon';
        calendarIcon.src = 'img/icons/calendar.svg';
        calendarIcon.alt = 'Calendar';
        inputWrapper.appendChild(calendarIcon);
        
        // Input
        returnTransferInput = document.createElement('input');
        returnTransferInput.type = 'text';
        returnTransferInput.id = 'return-date';
        returnTransferInput.className = 'hero__form-input';
        returnTransferInput.placeholder = (translations && translations[savedLang] && translations[savedLang]['hero.form.returnDatePlaceholder']) || 'Выберите дату';
        inputWrapper.appendChild(returnTransferInput);
        returnTransferGroup.appendChild(inputWrapper);
        
        // Крестик (close button)
        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'hero__form-button--inline';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '0.2rem';
        closeBtn.style.right = '0.2rem';
        closeBtn.style.width = '28px';
        closeBtn.style.height = '28px';
        closeBtn.style.background = 'none';
        closeBtn.style.border = 'none';
        closeBtn.style.padding = '0';
        closeBtn.style.display = 'flex';
        closeBtn.style.alignItems = 'center';
        closeBtn.style.justifyContent = 'center';
        closeBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L16 16M16 2L2 16" stroke="#a78d45" stroke-width="2" stroke-linecap="round"/></svg>';
        closeBtn.title = (translations && translations[savedLang] && translations[savedLang]['hero.form.removeReturn']) || 'Убрать обратный трансфер';
        closeBtn.addEventListener('click', function() {
            // Удаляем поле и возвращаем кнопку
            if (returnTransferGroup && returnTransferGroup.parentNode) {
                // Создаем новый .hero__form-group для кнопки
                const newBtnGroup = document.createElement('div');
                newBtnGroup.className = 'hero__form-group';
                // Пустой label для выравнивания
                const label = document.createElement('label');
                label.className = 'hero__form-label';
                label.style.opacity = '0';
                label.textContent = 'Действие';
                newBtnGroup.appendChild(label);
                newBtnGroup.appendChild(addReturnTransferButton);
                // Заменяем поле на кнопку
                returnTransferGroup.parentNode.replaceChild(newBtnGroup, returnTransferGroup);
            }
            addReturnTransferButton.style.display = '';
        });
        returnTransferGroup.appendChild(closeBtn);
        
        // Вставляем returnTransferGroup вместо кнопки, сохраняя структуру flex
        const parent = addReturnTransferButton.parentNode;
        const row = parent.parentNode;
        row.replaceChild(returnTransferGroup, parent);
        
        // После вставки поля в DOM инициализируем datepicker и синхронизацию
        setTimeout(() => {
            const today = getToday();
            // Инициализируем datepicker для нового поля
            initDatepicker(returnTransferInput, { min: today });
            // Связываем поля дат
            linkDateFields(tripDateInput, returnTransferInput);
            // Сразу фокусируем, чтобы открыть календарь
            setTimeout(() => {
                returnTransferInput.focus();
            }, 0);
        }, 0);
    });
} 