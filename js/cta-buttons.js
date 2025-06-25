/* ==========================================================================
   Функциональность CTA кнопок (Call-to-Action)
   ========================================================================== */

/**
 * Модуль для управления CTA кнопками
 * Отвечает за показ/скрытие кнопок в зависимости от прокрутки страницы
 */
export class CTAButtons {
    constructor() {
        // Элементы DOM
        this.cta = document.getElementById('cta-book-transfer');
        this.ctaMobile = document.getElementById('cta-book-transfer-mobile');
        this.hero = document.querySelector('.hero');
        this.bookingForm = document.querySelector('.hero__booking-form');
        this.footer = document.querySelector('footer');
        
        // Состояние видимости кнопок
        this.ctaVisible = false;
        this.ctaMobileVisible = false;
        
        // Привязываем методы к контексту
        this.checkShowCTA = this.checkShowCTA.bind(this);
        this.handleCTAClick = this.handleCTAClick.bind(this);
        this.handleCTAMobileClick = this.handleCTAMobileClick.bind(this);
        
        // Инициализация
        this.init();
    }
    
    /**
     * Инициализация модуля
     * Устанавливает обработчики событий и проверяет начальное состояние
     */
    init() {
        // Проверяем наличие необходимых элементов
        if (!this.cta || !this.ctaMobile || !this.hero || !this.bookingForm) {
            console.warn('CTA Buttons: Не все необходимые элементы найдены');
            return;
        }
        
        // Устанавливаем обработчики событий
        window.addEventListener('scroll', this.checkShowCTA);
        window.addEventListener('resize', this.checkShowCTA);
        
        // Обработчики кликов
        this.cta.addEventListener('click', this.handleCTAClick);
        this.ctaMobile.addEventListener('click', this.handleCTAMobileClick);
        
        // Проверяем состояние при загрузке
        this.checkShowCTA();
    }
    
    /**
     * Проверяет, нужно ли показать CTA кнопки
     * Анализирует позицию элементов на странице и показывает/скрывает кнопки
     */
    checkShowCTA() {
        const heroRect = this.hero.getBoundingClientRect();
        const isMobile = window.matchMedia('(max-width: 767px)').matches;
        let footerVisible = false;
        
        // Проверяем видимость футера
        if (this.footer) {
            const footerRect = this.footer.getBoundingClientRect();
            footerVisible = footerRect.top < window.innerHeight && footerRect.bottom > 0;
        }
        
        if (isMobile) {
            // Логика для мобильных устройств
            this.handleMobileCTA(heroRect, footerVisible);
        } else {
            // Логика для десктопных устройств
            this.handleDesktopCTA(heroRect);
        }
    }
    
    /**
     * Обрабатывает показ/скрытие CTA кнопки на мобильных устройствах
     * @param {DOMRect} heroRect - Размеры и позиция секции hero
     * @param {boolean} footerVisible - Видимость футера
     */
    handleMobileCTA(heroRect, footerVisible) {
        // Скрываем десктопную кнопку
        this.cta.style.display = 'none';
        this.ctaVisible = false;
        
        // Показываем мобильную кнопку после прокрутки героя и до футера
        if (heroRect.bottom <= 0 && !footerVisible) {
            if (!this.ctaMobileVisible) {
                this.ctaMobile.style.display = 'block';
                this.ctaMobileVisible = true;
            }
        } else {
            if (this.ctaMobileVisible) {
                this.ctaMobile.style.display = 'none';
                this.ctaMobileVisible = false;
            }
        }
    }
    
    /**
     * Обрабатывает показ/скрытие CTA кнопки на десктопных устройствах
     * @param {DOMRect} heroRect - Размеры и позиция секции hero
     */
    handleDesktopCTA(heroRect) {
        // Скрываем мобильную кнопку
        this.ctaMobile.style.display = 'none';
        this.ctaMobileVisible = false;
        
        // Показываем десктопную кнопку после прокрутки героя
        if (heroRect.bottom <= 0 && !this.ctaVisible) {
            this.cta.style.display = 'block';
            this.ctaVisible = true;
        } else if (heroRect.bottom > 0 && this.ctaVisible) {
            this.cta.style.display = 'none';
            this.ctaVisible = false;
        }
    }
    
    /**
     * Обработчик клика по десктопной CTA кнопке
     * Скрывает кнопку и прокручивает к форме бронирования
     */
    handleCTAClick() {
        // Резко скрываем кнопку без анимации
        this.cta.style.display = 'none';
        this.ctaVisible = false;
        
        // Плавно прокручиваем к форме
        this.bookingForm.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
    
    /**
     * Обработчик клика по мобильной CTA кнопке
     * Скрывает кнопку и прокручивает к форме бронирования
     */
    handleCTAMobileClick() {
        // Резко скрываем кнопку без анимации
        this.ctaMobile.style.display = 'none';
        this.ctaMobileVisible = false;
        
        // Плавно прокручиваем к форме
        this.bookingForm.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
    
    /**
     * Очистка ресурсов
     * Удаляет обработчики событий
     */
    destroy() {
        window.removeEventListener('scroll', this.checkShowCTA);
        window.removeEventListener('resize', this.checkShowCTA);
        
        if (this.cta) {
            this.cta.removeEventListener('click', this.handleCTAClick);
        }
        
        if (this.ctaMobile) {
            this.ctaMobile.removeEventListener('click', this.handleCTAMobileClick);
        }
    }
}

/**
 * Автоматическая инициализация при загрузке DOM
 */
document.addEventListener('DOMContentLoaded', () => {
    new CTAButtons();
}); 