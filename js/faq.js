// FAQ accordion module (BEM)
export const handleFAQAccordion = () => {
  const faqItems = document.querySelectorAll('.faq-item__header');
  faqItems.forEach(item => {
    item.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      faqItems.forEach(otherItem => {
        if (otherItem !== this) {
          otherItem.setAttribute('aria-expanded', 'false');
          otherItem.nextElementSibling.setAttribute('aria-hidden', 'true');
        }
      });
      this.setAttribute('aria-expanded', !isExpanded);
      content.setAttribute('aria-hidden', isExpanded);
    });
  });
}; 