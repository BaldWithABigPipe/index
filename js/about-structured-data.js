/**
 * @file Структурированные данные для страницы "О нас"
 */

function insertAboutStructuredData() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "VIP Transfer Zurich",
        "description": "Премиальные перевозки по Швейцарии и Европе.",
        "url": "https://viptransfer.com/about-us.html",
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
    });
    document.head.appendChild(script);
}

insertAboutStructuredData(); 