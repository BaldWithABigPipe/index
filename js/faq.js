// Файл: js/faq.js
// Описание: Этот модуль инициализирует функциональность аккордеона для раздела "Часто задаваемые вопросы" (FAQ).

/**
 * Инициализирует аккордеон в разделе FAQ.
 * Добавляет обработчики кликов к каждому вопросу, чтобы открывать и закрывать ответы.
 */
export function initFAQ() {
    // Находим все элементы вопросов в FAQ.
    const faqQuestions = document.querySelectorAll('.faq-item__question');

    // Если вопросы не найдены, выводим ошибку в консоль.
    if (!faqQuestions.length) {
        console.error('Ошибка: Не найдены элементы FAQ');
        return;
    }

    // Перебираем все найденные вопросы и назначаем им обработчик клика.
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            // Находим соответствующий ответ (следующий элемент после вопроса).
            const answer = question.nextElementSibling;
            // Проверяем, активен ли уже данный вопрос.
            const isActive = question.classList.contains('active');

            // Сначала закрываем все ранее открытые вопросы (логика аккордеона).
            document.querySelectorAll('.faq-item__question.active').forEach(activeQuestion => {
                activeQuestion.classList.remove('active');
                const activeAnswer = activeQuestion.nextElementSibling;
                activeAnswer.classList.remove('active');
                activeAnswer.style.maxHeight = '0'; // Схлопываем ответ.
            });

            // Если текущий вопрос не был активен, открываем его.
            if (!isActive) {
                question.classList.add('active');
                answer.classList.add('active');
                // Устанавливаем max-height равным полной высоте контента для плавной анимации.
                answer.style.maxHeight = `${answer.scrollHeight}px`;
            }
        });
    });
}