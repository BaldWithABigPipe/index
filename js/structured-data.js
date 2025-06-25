/**
 * @file Структурированные данные JSON-LD
 * Schema.org разметка для лучшего понимания сайта поисковыми системами
 */

/**
 * Возвращает структурированные данные для LocalBusiness
 * @returns {Object} - JSON-LD объект
 */
export function getLocalBusinessSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "VIP Transfer Zurich",
        "description": "Premium VIP transfer services from Zurich to hotels and resorts in Switzerland and France.",
        "url": "https://viptransfer.com",
        "telephone": "+123456789",
        "email": "info@viptransfer.com",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Zurich",
            "addressCountry": "Switzerland"
        },
        "availableLanguage": ["Russian", "English"],
        "service": {
            "@type": "Service",
            "serviceType": "VIP Transfer",
            "areaServed": ["Switzerland", "France"],
            "provider": {
                "@type": "Organization",
                "name": "VIP Transfer Zurich"
            }
        }
    };
}

/**
 * Создает и вставляет JSON-LD скрипт в head документа
 */
export function insertStructuredData() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(getLocalBusinessSchema());
    document.head.appendChild(script);
} 