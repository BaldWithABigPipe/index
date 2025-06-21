/**
 * @file Структурированные данные для страницы блога
 */

function insertBlogStructuredData() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "VIP Transfer Zurich Blog",
        "description": "Блог о премиальных трансферах, путешествиях и сервисе VIP Transfer Zurich.",
        "url": "https://viptransfer.com/blog.html",
        "publisher": {
            "@type": "Organization",
            "name": "VIP Transfer Zurich"
        }
    });
    document.head.appendChild(script);
}

insertBlogStructuredData(); 