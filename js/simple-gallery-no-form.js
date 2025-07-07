/**
 * Ultra Simple Gallery Implementation - No frills, just works
 * Modified version without form handling
 */

// Wait for document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Make sure variables are defined at the top
  let lastTapTime = 0;
  let translateX = 0, translateY = 0;
  let isDragging = false;
  let hasDragged = false; // Track whether we've actually dragged or just clicked
  let startX, startY;
  
  // All images are now WebP format
  document.documentElement.classList.add('webp');
  
  // Define all our gallery items
  const artworks = [
    {
      id: 14,
      title: "Spring Trees",
      image: "img/spring_trees.webp",
      paintingPrice: "$150",
      size: "16\"x16\""
    },
    {
      id: 13,
      title: "Wetlands One",
      image: "img/wetlands_one.webp",
      paintingPrice: "$125",
      size: "16\"x16\""
    },
    {
      id: 10,
      title: "Hibiscus 1",
      image: "img/hibiscus_1.webp",
      paintingPrice: "$150",
      size: "12\"x16\""
    },
    {
      id: 12,
      title: "House at Brown Summit",
      image: "img/house-at-brown-summit.webp",
      paintingPrice: "$250",
      size: "12\"x16\""
    },
    {
      id: 4,
      title: "Pathway to the Beach",
      image: "img/pathway_to_the_beach.webp",
      paintingPrice: "$175",
      size: "12\"x16\""
    },
    {
      id: 5,
      title: "Country Walk",
      image: "img/country_walk.webp",
      paintingPrice: "$200",
      size: "14\"x14\""
    },
    {
      id: 6,
      title: "Trees in Townsend Forest",
      image: "img/trees_in_townsend_forest.webp",
      paintingPrice: "$300",
      size: "18\"x18\""
    },
    {
      id: 7,
      title: "Townsend Forest Trees II",
      image: "img/townsend_forest_trees_II.webp",
      paintingPrice: "$250",
      size: "16\"x16\""
    },
    {
      id: 8,
      title: "The Orange Barn",
      image: "img/the_orange_barn.webp",
      paintingPrice: "$250",
      size: "12\"x16\""
    },
    {
      id: 9,
      title: "Field of Sunlight",
      image: "img/field_of_sunlight.webp",
      paintingPrice: "$250",
      size: "12\"x16\""
    },
    {
      id: 1,
      title: "Fishing Boats on Beach",
      image: "img/fishing_boats_on_beach.webp",
      paintingPrice: "$100",
      size: "12\"x16\""
    },
    {
      id: 2,
      title: "House With Red Field",
      image: "img/house_with_red_field.webp",
      paintingPrice: "$150",
      size: "14\"x14\""
    },
    {
      id: 3,
      title: "Country House with Red Roof",
      image: "img/country_house_with_red_roof.webp",
      paintingPrice: "$150",
      size: "12\"x16\""
    },
    {
      id: 15,
      title: "TED",
      image: "img/TED.webp",
      paintingPrice: "NOT FOR SALE",
      size: "12\"x16\""
    },
    {
      id: 11,
      title: "Lillies",
      image: "img/lillies.webp",
      paintingPrice: "SOLD",
      size: "16\"x12\""
    }
  ];
  
  // Find the gallery container
  const galleryGrid = document.getElementById('gallery-grid');
  
  // If we can't find the gallery container, don't continue
  if (!galleryGrid) {
    console.error("Could not find gallery-grid element!");
    return;
  }
  
  // Clear any existing content
  galleryGrid.innerHTML = '';
  
  // Gallery item creation section
  
  // Create each gallery item
  artworks.forEach(artwork => {
    // Create the gallery item container
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.style.cursor = 'pointer';
    
    // Create the HTML content
    item.innerHTML = `
      <div class="gallery-image-container">
        <img src="${artwork.image}" alt="Painting: ${artwork.title}" class="gallery-image">
      </div>
      <div class="gallery-caption">
        <h3>${artwork.title}</h3>
        <p class="artwork-medium">Medium: Acrylic</p>
        <p class="artwork-size">Size: ${artwork.size}</p>
        <p class="artwork-price ${artwork.paintingPrice === 'SOLD' ? 'sold-item' : artwork.paintingPrice === 'NOT FOR SALE' ? 'not-for-sale-item' : ''}">${artwork.paintingPrice === 'SOLD' ? 'SOLD' : artwork.paintingPrice === 'NOT FOR SALE' ? 'NOT FOR SALE' : `Price: ${artwork.paintingPrice}`}</p>
      </div>
    `;
    
    // Add click handler directly to this element
    item.onclick = function() {
      // Get the modal elements
      const modal = document.getElementById('image-modal');
      const modalTitle = document.getElementById('modal-title');
      const modalDescription = document.getElementById('modal-description');
      const modalDetails = document.getElementById('modal-details-text');
      
      // Update the modal content 
      if (modalTitle) modalTitle.innerText = artwork.title;
      if (modalDescription) modalDescription.innerText = ""; // Clear description
      
      // Replace image
      const modalImageContainer = document.querySelector('.modal-image-container');
      if (modalImageContainer) {
        // Clear existing content
        modalImageContainer.innerHTML = '';
        
        // Add image
        const img = document.createElement('img');
        img.id = 'modal-image';
        img.src = artwork.image;
        img.alt = `Enlarged view of painting: ${artwork.title}`;
        img.className = 'gallery-image';
        
        // Add to container
        modalImageContainer.appendChild(img);
        
        // Add zoom instruction if not present
        if (!document.getElementById('zoom-instruction')) {
          const zoomInstruction = document.createElement('div');
          zoomInstruction.id = 'zoom-instruction';
          zoomInstruction.className = 'zoom-instruction';
          zoomInstruction.textContent = window.matchMedia("(max-width: 768px)").matches ? 
            'Tap to zoom' : 'Click to zoom';
          modalImageContainer.appendChild(zoomInstruction);
        }
      }
      
      // Update pricing details
      if (modalDetails) {
        modalDetails.innerHTML = `
          <p><strong>Medium:</strong> Acrylic</p>
          <p><strong>Size:</strong> ${artwork.size}</p>
          <p><strong>${artwork.paintingPrice === 'SOLD' || artwork.paintingPrice === 'NOT FOR SALE' ? 'Status:' : 'Price:'}</strong> ${artwork.paintingPrice}</p>
          ${artwork.paintingPrice !== 'SOLD' && artwork.paintingPrice !== 'NOT FOR SALE' ? '<p class="note"><em>All prices exclude sales tax, packaging, and shipping.</em></p>' : ''}
        `;
        
        // Hide or show the inquire button based on sold status
        const inquireButton = document.getElementById('inquire-button');
        if (inquireButton) {
          if (artwork.paintingPrice === 'SOLD' || artwork.paintingPrice === 'NOT FOR SALE') {
            inquireButton.style.display = 'none';
          } else {
            inquireButton.style.display = 'block';
          }
        }
      }
      
      // Show the modal
      modal.style.display = 'flex';
      modal.classList.add('show');
      
      // Reset drag state when opening a new modal
      hasDragged = false;
      translateX = 0;
      translateY = 0;
    };
    
    // Add to the gallery
    galleryGrid.appendChild(item);
  });
  
  // *** REMOVED CONTACT FORM VALIDATION CODE ***

  // Handle mobile navigation
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
    
    // Also toggle with keyboard for accessibility
    hamburger.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navLinks.classList.toggle('active');
      }
    });
    
    // Close mobile menu when clicking on links
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        navLinks.classList.remove('active');
      });
    });
  }
  
  // Update current year in footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // Handle modal closing
  const closeButton = document.querySelector('.close-modal');
  const modal = document.getElementById('image-modal');
  
  if (closeButton && modal) {
    // Close on click
    closeButton.onclick = function() {
      modal.classList.remove('show');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
    };
    
    // Close on Enter or Space key (for accessibility)
    closeButton.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        modal.classList.remove('show');
        setTimeout(() => {
          modal.style.display = 'none';
        }, 300);
      }
    });
    
    // Close when clicking outside the content
    modal.onclick = function(event) {
      if (event.target === modal) {
        modal.classList.remove('show');
        setTimeout(() => {
          modal.style.display = 'none';
        }, 300);
      }
    };
  }
  
  // Handle "Inquire About This Piece" button - modified to not alter form
  const inquireButton = document.getElementById('inquire-button');
  if (inquireButton) {
    inquireButton.onclick = function() {
      // Close the modal
      modal.classList.remove('show');
      setTimeout(() => {
        modal.style.display = 'none';
        
        // Scroll to the contact section
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          const headerHeight = document.querySelector('.site-header').offsetHeight || 0;
          const contactPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: contactPosition,
            behavior: 'smooth'
          });
          
          // Store the message in sessionStorage instead of directly setting the field
          // This allows Basin to handle the form properly
          const titleElement = document.getElementById('modal-title');
          if (titleElement) {
            sessionStorage.setItem('artworkInquiry', 
              `Hello, I'm interested in your artwork "${titleElement.textContent}". Please provide more information about availability and pricing.`);
            
            // Check if there's contact-form.js to handle this
            // If not, try to set the field directly but don't interfere with submission
            const messageField = document.getElementById('message');
            if (messageField) {
              messageField.value = sessionStorage.getItem('artworkInquiry');
              messageField.focus();
            }
          }
        }
      }, 300);
    };
  }
  
  // Basic zoom functionality for the modal image
  document.addEventListener('click', function(event) {
    const modalImage = document.getElementById('modal-image');
    
    // Only handle clicks if we haven't just been dragging
    if (event.target === modalImage && !hasDragged) {
      if (modalImage.classList.contains('zoomed')) {
        // Zoom out
        modalImage.classList.remove('zoomed');
        modalImage.style.transform = 'scale(1)';
        // Reset translation values when zooming out
        translateX = 0;
        translateY = 0;
      } else {
        // Zoom in
        modalImage.classList.add('zoomed');
        modalImage.style.transform = 'scale(1.5)';
        // Reset translation values when zooming in
        translateX = 0;
        translateY = 0;
      }
    }
    
    // Reset drag flag after click is processed
    hasDragged = false;
  });
  
  // Add touch event support for dragging on mobile
  let touchIsDragging = false;
  let touchStartX, touchStartY;
  
  document.addEventListener('touchstart', function(e) {
    const modalImage = document.getElementById('modal-image');
    if (!modalImage) return;
    
    // Double tap detection
    const now = new Date().getTime();
    const timeSinceLastTap = now - lastTapTime;
    
    if (timeSinceLastTap < 300 && e.target === modalImage) {
      // Handle double tap to zoom
      e.preventDefault();
      
      if (modalImage.classList.contains('zoomed')) {
        // Zoom out
        modalImage.classList.remove('zoomed');
        modalImage.style.transform = 'scale(1)';
        translateX = 0;
        translateY = 0;
      } else {
        // Zoom in
        modalImage.classList.add('zoomed');
        modalImage.style.transform = 'scale(1.5)';
        translateX = 0;
        translateY = 0;
      }
      
      // Reset drag state on zoom toggle
      hasDragged = false;
    } else if (e.target === modalImage && modalImage.classList.contains('zoomed')) {
      // Start drag on zoomed image
      touchIsDragging = true;
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      e.preventDefault();
    }
    
    lastTapTime = now;
  }, { passive: false });
  
  document.addEventListener('touchmove', function(e) {
    const modalImage = document.getElementById('modal-image');
    if (!touchIsDragging || !modalImage || !modalImage.classList.contains('zoomed')) return;
    
    e.preventDefault(); // Prevent scrolling
    
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;
    
    // Set drag flag if we've moved significantly
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      hasDragged = true;
    }
    
    // Update position with bounds checking
    const newTranslateX = translateX + dx;
    const newTranslateY = translateY + dy;
    
    // Calculate maximum drag bounds
    const rect = modalImage.getBoundingClientRect();
    const zoomLevel = 1.5;
    const maxTranslateX = (rect.width * (zoomLevel - 1)) / 2;
    const maxTranslateY = (rect.height * (zoomLevel - 1)) / 2;
    
    // Apply bounds
    translateX = Math.max(-maxTranslateX, Math.min(newTranslateX, maxTranslateX));
    translateY = Math.max(-maxTranslateY, Math.min(newTranslateY, maxTranslateY));
    
    modalImage.style.transform = `scale(1.5) translate(${translateX}px, ${translateY}px)`;
    
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }, { passive: false });
  
  document.addEventListener('touchend', function() {
    touchIsDragging = false;
  });

  document.addEventListener('touchcancel', function() {
    touchIsDragging = false;
  });
  
  // Add dragging capability for zoomed images
  document.addEventListener('mousedown', function(e) {
    const modalImage = document.getElementById('modal-image');
    if (e.target === modalImage && modalImage.classList.contains('zoomed')) {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      modalImage.style.cursor = 'grabbing';
      e.preventDefault();
      
      // Reset drag flag at the start of a new drag
      hasDragged = false;
    }
  });
  
  document.addEventListener('mousemove', function(e) {
    const modalImage = document.getElementById('modal-image');
    if (!isDragging || !modalImage || !modalImage.classList.contains('zoomed')) return;
    
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    
    // Set the drag flag if we've moved more than a few pixels
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      hasDragged = true;
    }
    
    // Update position with bounds checking
    const newTranslateX = translateX + dx;
    const newTranslateY = translateY + dy;
    
    // Calculate maximum drag bounds
    const rect = modalImage.getBoundingClientRect();
    const zoomLevel = 1.5;
    const maxTranslateX = (rect.width * (zoomLevel - 1)) / 2;
    const maxTranslateY = (rect.height * (zoomLevel - 1)) / 2;
    
    // Apply bounds
    translateX = Math.max(-maxTranslateX, Math.min(newTranslateX, maxTranslateX));
    translateY = Math.max(-maxTranslateY, Math.min(newTranslateY, maxTranslateY));
    
    modalImage.style.transform = `scale(1.5) translate(${translateX}px, ${translateY}px)`;
    
    startX = e.clientX;
    startY = e.clientY;
  });
  
  document.addEventListener('mouseup', function(e) {
    if (isDragging) {
      // Just end the drag operation but don't zoom out
      isDragging = false;
      const modalImage = document.getElementById('modal-image');
      if (modalImage && modalImage.classList.contains('zoomed')) {
        modalImage.style.cursor = 'grab';
      }
      
      // Prevent the click event from firing immediately after drag
      if (hasDragged) {
        e.stopPropagation();
      }
    }
  });
  
  document.addEventListener('mouseleave', function() {
    if (isDragging) {
      isDragging = false;
      const modalImage = document.getElementById('modal-image');
      if (modalImage && modalImage.classList.contains('zoomed')) {
        modalImage.style.cursor = 'grab';
      }
    }
  });
});
