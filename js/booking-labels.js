// Booking labels module (BEM)
export const handleBookingLabels = () => {
  const bookingInputs = document.querySelectorAll('.booking__input');
  bookingInputs.forEach(input => {
    const label = input.nextElementSibling;
    if (!label || !label.classList.contains('booking__label')) return;
    const updateLabelStyle = () => {
      if (input === document.activeElement) {
        label.style.maxWidth = 'none';
        label.style.overflow = 'visible';
        label.style.textOverflow = 'clip';
      } else {
        label.style.maxWidth = 'calc(100% - 1rem)';
        label.style.overflow = 'hidden';
        label.style.textOverflow = 'ellipsis';
      }
    };
    input.addEventListener('focus', updateLabelStyle);
    input.addEventListener('blur', updateLabelStyle);
    updateLabelStyle();
  });
}; 