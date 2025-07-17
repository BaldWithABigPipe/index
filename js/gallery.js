// Gallery modal module (BEM)
export const openGallery = (galleryId) => {
  const modal = document.getElementById(`gallery-${galleryId}`);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

export const closeGallery = (galleryId) => {
  const modal = document.getElementById(`gallery-${galleryId}`);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

export const changeMainImage = (galleryId, imageSrc, thumbnailElement) => {
  const mainImage = document.getElementById(`main-image-${galleryId}`);
  const thumbnails = document.querySelectorAll(`#gallery-${galleryId} .gallery-modal__thumbnail`);
  if (mainImage) mainImage.src = imageSrc;
  thumbnails.forEach(thumb => thumb.classList.remove('active'));
  if (thumbnailElement) thumbnailElement.classList.add('active');
};

export const initGalleryModals = () => {
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('gallery-modal')) {
      const galleryId = event.target.id.split('-')[1];
      closeGallery(galleryId);
    }
  });
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      const activeModal = document.querySelector('.gallery-modal.active');
      if (activeModal) {
        const galleryId = activeModal.id.split('-')[1];
        closeGallery(galleryId);
      }
    }
  });
}; 