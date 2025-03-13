/**
 * Modal Window Fix
 * Ensures the modal window works correctly
 */

window.addEventListener('load', function() {
  // Get modal elements
  const modal = document.getElementById('image-modal');
  const closeButton = document.querySelector('.close-modal');
  
  if (!modal || !closeButton) {
    console.error('Modal window elements not found');
    return;
  }
  
  // Add click event to close button
  closeButton.addEventListener('click', function() {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  });
  
  // Close modal when clicking outside
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.classList.remove('show');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
    }
  });
  
  console.log('Modal window fix initialized');
});
