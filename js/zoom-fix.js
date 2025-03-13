/**
 * Zoom Functionality Fix
 * Restores zoom and pan functionality to modal images
 */

window.addEventListener('load', function() {
  console.log('Initializing zoom functionality...');
  
  // Set up zoom functionality
  function setupZoomFunctionality() {
    // Find the modal image
    const modalImage = document.getElementById('modal-image');
    
    if (!modalImage) {
      console.error('Modal image element not found');
      return;
    }
    
    console.log('Setting up zoom functionality for modal image');
    
    // Variables for drag functionality
    let isDragging = false;
    let startX, startY, translateX = 0, translateY = 0;
    let touchStartTime = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    let lastTapTime = 0;
    
    // Add zoom instruction if it doesn't exist
    const modalImageContainer = modalImage.closest('.modal-image-container');
    let zoomInstruction = document.getElementById('zoom-instruction');
    
    if (!zoomInstruction && modalImageContainer) {
      zoomInstruction = document.createElement('div');
      zoomInstruction.id = 'zoom-instruction';
      zoomInstruction.className = 'zoom-instruction';
      zoomInstruction.textContent = window.matchMedia("(max-width: 768px)").matches ? 
        'Double tap to zoom' : 'Click to zoom';
      modalImageContainer.appendChild(zoomInstruction);
    }
    
    // Toggle zoom function
    function toggleZoom(element) {
      if (!element.classList.contains('zoomed')) {
        // Zoom in
        element.classList.add('zoomed');
        element.style.transform = 'scale(1.5)';
        element.style.cursor = window.matchMedia("(min-width: 769px)").matches ? 'grab' : 'default';
        translateX = 0;
        translateY = 0;
      } else {
        // Zoom out
        element.classList.remove('zoomed');
        element.style.transform = 'scale(1)';
        element.style.cursor = window.matchMedia("(min-width: 769px)").matches ? 'zoom-in' : 'default';
      }
    }
    
    // Mouse events for desktop
    function handleImageClick(e) {
      e.stopPropagation(); // Prevent modal from closing
      
      // Only handle clicks (not drags) on desktop
      if (window.matchMedia("(min-width: 769px)").matches) {
        const clickTime = new Date().getTime();
        const mouseUpX = e.clientX;
        const mouseUpY = e.clientY;
        const timeDiff = clickTime - touchStartTime;
        const distance = Math.sqrt(
          Math.pow(mouseUpX - touchStartX, 2) +
          Math.pow(mouseUpY - touchStartY, 2)
        );
        
        // If this was a quick tap without movement (< 10px movement and < 300ms)
        if (timeDiff < 300 && distance < 10) {
          toggleZoom(this);
        }
      }
    }
    
    function handleImageMouseDown(e) {
      // Record mousedown time and position for all clicks
      touchStartTime = new Date().getTime();
      touchStartX = e.clientX;
      touchStartY = e.clientY;
      
      // Only start drag if image is zoomed
      if (this.classList.contains('zoomed')) {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        this.style.cursor = 'grabbing';
        e.preventDefault();
      }
    }
    
    function handleImageMouseMove(e) {
      if (!isDragging) return;
      
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      
      updateImagePosition(this, dx, dy);
      
      startX = e.clientX;
      startY = e.clientY;
    }
    
    function handleImageMouseUp() {
      isDragging = false;
      if (this.classList.contains('zoomed') && window.matchMedia("(min-width: 769px)").matches) {
        this.style.cursor = 'grab';
      }
    }
    
    function handleImageMouseLeave() {
      isDragging = false;
      if (this.classList.contains('zoomed') && window.matchMedia("(min-width: 769px)").matches) {
        this.style.cursor = 'grab';
      }
    }
    
    // Touch events for mobile
    function handleImageTouchStart(e) {
      // Prevent default to avoid page scrolling when dragging a zoomed image
      if (this.classList.contains('zoomed')) {
        e.preventDefault();
      }
      
      touchStartTime = new Date().getTime();
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      
      // Handle double tap for zoom toggle
      const now = new Date().getTime();
      const timeSinceLastTap = now - lastTapTime;
      
      if (timeSinceLastTap < 300) {
        // Double tap detected
        e.preventDefault(); // Prevent zoom due to double tap
        toggleZoom(this);
      }
      
      lastTapTime = now;
      
      // Start drag if image is zoomed
      if (this.classList.contains('zoomed')) {
        isDragging = true;
        startX = touch.clientX;
        startY = touch.clientY;
      }
    }
    
    function handleImageTouchMove(e) {
      if (!isDragging) return;
      
      // Prevent default to avoid page scrolling when dragging a zoomed image
      e.preventDefault();
      
      const touch = e.touches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      
      updateImagePosition(this, dx, dy);
      
      startX = touch.clientX;
      startY = touch.clientY;
    }
    
    function handleImageTouchEnd() {
      isDragging = false;
    }
    
    function updateImagePosition(element, dx, dy) {
      translateX += dx;
      translateY += dy;
      
      // Calculate maximum drag bounds based on the image size and zoom level
      const rect = element.getBoundingClientRect();
      const zoomLevel = 1.5;
      const maxTranslateX = (rect.width * (zoomLevel - 1)) / 2;
      const maxTranslateY = (rect.height * (zoomLevel - 1)) / 2;
      
      // Apply the calculated bounds
      translateX = Math.max(-maxTranslateX, Math.min(translateX, maxTranslateX));
      translateY = Math.max(-maxTranslateY, Math.min(translateY, maxTranslateY));
      
      element.style.transform = `scale(1.5) translate(${translateX}px, ${translateY}px)`;
    }
    
    // Clean up existing listeners to prevent duplicates
    const oldModalImage = modalImage.cloneNode(true);
    if (modalImage.parentNode) {
      modalImage.parentNode.replaceChild(oldModalImage, modalImage);
    }
    
    // Add mouse event listeners for desktop
    oldModalImage.addEventListener('click', handleImageClick);
    oldModalImage.addEventListener('mousedown', handleImageMouseDown);
    oldModalImage.addEventListener('mousemove', handleImageMouseMove);
    oldModalImage.addEventListener('mouseup', handleImageMouseUp);
    oldModalImage.addEventListener('mouseleave', handleImageMouseLeave);
    
    // Add touch event listeners for mobile
    oldModalImage.addEventListener('touchstart', handleImageTouchStart, { passive: false });
    oldModalImage.addEventListener('touchmove', handleImageTouchMove, { passive: false });
    oldModalImage.addEventListener('touchend', handleImageTouchEnd);
    
    console.log('Zoom functionality setup complete');
  }
  
  // Set up zoom when modal is shown
  const modal = document.getElementById('image-modal');
  if (modal) {
    // MutationObserver to detect when the modal becomes visible
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          if (modal.classList.contains('show')) {
            console.log('Modal shown, setting up zoom');
            setupZoomFunctionality();
          }
        }
      });
    });
    
    // Observe the modal for class changes
    observer.observe(modal, { attributes: true });
    
    // Also check style changes
    const originalSetDisplay = Object.getOwnPropertyDescriptor(modal.style, 'display').set;
    Object.defineProperty(modal.style, 'display', {
      set: function(value) {
        originalSetDisplay.call(this, value);
        if (value === 'flex') {
          console.log('Modal display changed to flex, setting up zoom');
          setTimeout(setupZoomFunctionality, 100);
        }
      }
    });
  }
  
  // Initial setup if the modal is already visible
  if (modal && (modal.style.display === 'flex' || modal.classList.contains('show'))) {
    setupZoomFunctionality();
  }
  
  console.log('Zoom functionality initialization complete');
});
