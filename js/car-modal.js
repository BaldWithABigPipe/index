// Car modal module (BEM)
export const handleCarModal = () => {
  const fleetSection = document.querySelector('.fleet'); // Исправлено: ищем .fleet, а не .fleet__section
  const fleetItems = fleetSection ? fleetSection.querySelectorAll('.fleet__item') : [];
  const modals = document.querySelectorAll('.modal');
  const modalOverlays = document.querySelectorAll('.modal__overlay');
  const modalCloses = document.querySelectorAll('.modal__close');
  const modalThumbnails = document.querySelectorAll('.modal__thumbnail');
  fleetItems.forEach(item => {
    item.removeEventListener('click', handleFleetItemClick);
    item.addEventListener('click', handleFleetItemClick);
  });
  function handleFleetItemClick() {
    const carNumber = this.getAttribute('data-car');
    const modal = document.getElementById(`carModal${carNumber}`);
    if (modal) {
      modal.classList.add('modal--active');
      document.body.style.overflow = 'hidden';
    }
  }
  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
      const modal = overlay.closest('.modal');
      modal.classList.remove('modal--active');
      document.body.style.overflow = '';
    });
  });
  modalCloses.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      const modal = closeBtn.closest('.modal');
      modal.classList.remove('modal--active');
      document.body.style.overflow = '';
    });
  });
  document.addEventListener('keydown', (e) => {
    const activeModal = document.querySelector('.modal--active');
    if (!activeModal) return;
    if (e.key === 'Escape') {
      activeModal.classList.remove('modal--active');
      document.body.style.overflow = '';
    } else if (e.key === 'ArrowLeft') {
      const prevBtn = activeModal.querySelector('.modal__nav-btn--prev');
      if (prevBtn) prevBtn.click();
    } else if (e.key === 'ArrowRight') {
      const nextBtn = activeModal.querySelector('.modal__nav-btn--next');
      if (nextBtn) nextBtn.click();
    }
  });
  modalThumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
      const modal = thumbnail.closest('.modal');
      const mainImg = modal.querySelector('.modal__main-img');
      const newImageSrc = thumbnail.getAttribute('data-image');
      if (mainImg && newImageSrc) {
        mainImg.src = newImageSrc;
        mainImg.alt = thumbnail.alt;
      }
    });
  });
  const navButtons = document.querySelectorAll('.modal__nav-btn');
  navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const modal = button.closest('.modal');
      const direction = button.getAttribute('data-direction');
      const thumbnails = modal.querySelectorAll('.modal__thumbnail');
      const mainImg = modal.querySelector('.modal__main-img');
      if (!thumbnails.length || !mainImg) return;
      let currentIndex = 0;
      const currentSrc = mainImg.src;
      const currentFilename = currentSrc.split('/').pop();
      thumbnails.forEach((thumb, index) => {
        const thumbSrc = thumb.getAttribute('data-image');
        const thumbFilename = thumbSrc.split('/').pop();
        if (thumbFilename === currentFilename) {
          currentIndex = index;
        }
      });
      let newIndex;
      if (direction === 'prev') {
        newIndex = currentIndex > 0 ? currentIndex - 1 : thumbnails.length - 1;
      } else {
        newIndex = currentIndex < thumbnails.length - 1 ? currentIndex + 1 : 0;
      }
      const newThumbnail = thumbnails[newIndex];
      const newImageSrc = newThumbnail.getAttribute('data-image');
      const newImageAlt = newThumbnail.alt;
      mainImg.src = newImageSrc;
      mainImg.alt = newImageAlt;
    });
  });
}; 