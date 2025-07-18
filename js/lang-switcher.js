// Language switcher module (BEM)
export const getBasePath = () => {
  const path = window.location.pathname;
  return path.replace(/^\/(en|ru)/, '');
};

export const getCurrentLanguage = () => {
  const path = window.location.pathname;
  if (path.startsWith('/ru/')) return 'ru';
  if (path.startsWith('/en/')) return 'en';
  return 'en';
};

export const updateLangCurrent = (lang) => {
  const current = document.querySelector('.header__lang-current');
  if (current) current.textContent = lang === 'ru' ? 'RU' : 'EN';
};

export const navigateToLanguage = (lang) => {
  const basePath = getBasePath();
  let newPath;
  if (lang === 'en') newPath = basePath || '/';
  else newPath = `/${lang}${basePath}`;
  const currentPath = window.location.pathname;
  if (newPath !== currentPath) window.location.href = newPath;
};

export const initLangSwitcher = (showPreloader) => {
  let currentLang = getCurrentLanguage();
  document.querySelectorAll('.header__lang-option').forEach(option => {
    option.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const lang = option.getAttribute('data-lang');
      if (showPreloader) showPreloader();
      navigateToLanguage(lang);
    });
  });
  const langSwitch = document.getElementById('lang-switch');
  const langList = document.getElementById('lang-list');
  const langDropdown = langSwitch ? langSwitch.closest('.header__lang-dropdown') : null;
  const langIcon = langSwitch ? langSwitch.querySelector('.header__lang-icon svg') : null;
  const langArrow = langSwitch ? langSwitch.querySelector('.header__lang-arrow svg') : null;
  const header = document.querySelector('header.header');

  // Функция позиционирования
  const positionDropdown = () => {
    if (!langSwitch || !langList || !header) return;
    langList.style.position = 'absolute';
    langList.style.minWidth = langSwitch.offsetWidth + 'px';
    langList.style.zIndex = '9999';
    const btnRect = langSwitch.getBoundingClientRect();
    const headerRect = header.getBoundingClientRect();
    langList.style.left = (btnRect.right - headerRect.left - langList.offsetWidth) + 'px';
    langList.style.top = (btnRect.bottom - headerRect.top + 8) + 'px';
  };

  // Открытие/закрытие
  const openDropdown = () => {
    langSwitch.classList.add('active');
    langList.classList.add('active');
    positionDropdown();
    if (langIcon) langIcon.style.color = langIcon.style.stroke = '#F5B301';
    if (langArrow) langArrow.style.color = langArrow.style.stroke = '#F5B301';
  };
  const closeDropdown = () => {
    langSwitch.classList.remove('active');
    langList.classList.remove('active');
    langList.style.top = '';
    langList.style.left = '';
    langList.style.position = '';
    langList.style.zIndex = '';
    if (langIcon) langIcon.style.color = langIcon.style.stroke = '#fff';
    if (langArrow) langArrow.style.color = langArrow.style.stroke = '#fff';
  };
  if (langSwitch && langList) {
    langSwitch.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (!langSwitch.classList.contains('active')) {
        openDropdown();
      } else {
        closeDropdown();
      }
    };
    document.addEventListener('click', (e) => {
      if (!langList.contains(e.target) && e.target !== langSwitch) {
        closeDropdown();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDropdown();
      }
    });
    window.addEventListener('scroll', () => {
      if (langSwitch.classList.contains('active')) positionDropdown();
    });
    window.addEventListener('resize', () => {
      if (langSwitch.classList.contains('active')) positionDropdown();
    });
  }
  updateLangCurrent(currentLang);
  window.addEventListener('popstate', () => {
    const newLang = getCurrentLanguage();
    if (newLang !== currentLang) {
      currentLang = newLang;
      updateLangCurrent(newLang);
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initLangSwitcher();
}); 