// Preloader module (BEM)
export const showPreloader = () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) preloader.classList.remove('hide');
};

export const hidePreloader = () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) preloader.classList.add('preloader--hidden');
};

window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) preloader.classList.add('preloader--hidden');
}); 