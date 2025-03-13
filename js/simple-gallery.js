/**
 * Ultra Simple Gallery Implementation - No frills, just works
 */

// Wait for document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Make sure variables are defined at the top
  let lastTapTime = 0;
  let translateX = 0, translateY = 0;
  let isDragging = false;
  let hasDragged = false; // Track whether we've actually dragged or just clicked
  let startX, startY;
  
  // Add WebP detection functionality
  function detectWebP() {
    const canvas = document.createElement('canvas');
    if (canvas.getContext && canvas.getContext('2d')) {
      // Was able to create a canvas element
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
  }
  
  // Add class to HTML element for WebP support
  if (detectWebP()) {
    document.documentElement.classList.add('webp');
  } else {
    document.documentElement.classList.add('no-webp');
  }
  
  // Define all our gallery items
  const artworks = [
    {
      id: 4,
      title: "Pathway to the Beach",
      description: "A tranquil pathway leading through coastal dunes to a sun-drenched beach.",
      webpImage: "img/pathway_to_the_beach.webp",
      image: "img/pathway_to_the_beach.jpg",
      paintingPrice: "$275",
      framePrice: "$75"
    },
    {
      id: 5,
      title: "Country Walk",
      description: "A serene path winding through rural countryside, inviting peaceful exploration.",
      webpImage: "img/country_walk.webp",
      image: "img/country_walk.jpg",
      paintingPrice: "$300",
      framePrice: "$75"
    },
    {
      id: 6,
      title: "Trees in Townsend Forest",
      description: "Ancient trees standing majestically in the Townsend Forest.",
      webpImage: "img/trees_in_townsend_forest.webp",
      image: "img/trees_in_townsend_forest.jpg",
      paintingPrice: "$400",
      framePrice: "$90"
    },
    {
      id: 7,
      title: "Townsend Forest II",
      description: "A different perspective of the beautiful Townsend Forest, capturing its depth and serenity.",
      webpImage: "img/townsend_forest_II.webp",
      image: "img/townsend_forest_II.jpg",
      paintingPrice: "$350",
      framePrice: "$75"
    },
    {
      id: 8,
      title: "Country House",
      description: "A quaint country house surrounded by natural beauty and tranquility.",
      webpImage: "img/country_house.webp",
      image: "img/country_house.jpg",
      paintingPrice: "$350",
      framePrice: "$90"
    },
    {
      id: 9,
      title: "Townsend Forest IV",
      description: "Another captivating view of Townsend Forest.",
      webpImage: "img/townsend_forest_IV.webp",
      image: "img/townsend_forest_IV.jpg",
      paintingPrice: "$350",
      framePrice: "$75"
    },
    {
      id: 1,
      title: "Fishing Boats on Beach",
      description: "Colorful fishing boats resting on a peaceful shoreline at low tide.",
      webpImage: "img/fishing_boats_on_beach.webp",
      image: "img/fishing_boats_on_beach.jpg",
      paintingPrice: "$200",
      framePrice: "$75"
    },
    {
      id: 2,
      title: "House With Red Field",
      description: "A rustic farmhouse set against a vibrant red field.",
      webpImage: "img/house_with_red_field.webp",
      image: "img/house_with_red_field.jpeg",
      paintingPrice: "$250",
      framePrice: "$75"
    },
    {
      id: 3,
      title: "Country House with Red Roof",
      description: "A charming country house with a distinctive red roof nestled in a rural setting.",
      webpImage: "img/country_house_with_red_roof.webp",
      image: "img/country_house_with_red_roof.jpg",
      paintingPrice: "$250",
      framePrice: "$75"
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
  
  // Function to convert price string to number
  function priceToNumber(priceStr) {
    return parseInt(priceStr.replace('$', ''));
  }
  
  // Create each gallery item
  artworks.forEach(artwork => {
    // Create the gallery item container
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.style.cursor = 'pointer';
    
    // Create the HTML content
    item.innerHTML = `
      <div class="gallery-image-container">
        <picture>
          <source srcset="${artwork.webpImage}" type="image/webp">
          <img src="${artwork.image}" alt="Painting: ${artwork.title} - ${artwork.description}" class="gallery-image">
        </picture>
      </div>
      <div class="gallery-caption">
        <h3>${artwork.title}</h3>
        <p>${artwork.description}</p>
        <p class="artwork-price">Painting: ${artwork.paintingPrice} | Frame: ${artwork.framePrice}</p>
      </div>
    `;
    
    // Add click handler directly to this element
    item.onclick = function() {
      // Get the modal elements
      const modal = document.getElementById('image-modal');
      const modalTitle = document.getElementById('modal-title');
      const modalDescription = document.getElementById('modal-description');
      const modalDetails = document.getElementById('modal-details-text');
      
      // Update the modal content - use picture element for WebP support
      if (modalTitle) modalTitle.innerText = artwork.title;
      if (modalDescription) modalDescription.innerText = artwork.description;
      
      // Replace image with picture element for WebP support
      const modalImageContainer = document.querySelector('.modal-image-container');
      if (modalImageContainer) {
        // Clear existing content
        modalImageContainer.innerHTML = '';
        
        // Create picture element
        const picture = document.createElement('picture');
        
        // Add WebP source
        const source = document.createElement('source');
        source.srcset = artwork.webpImage;
        source.type = 'image/webp';
        picture.appendChild(source);
        
        // Add image fallback
        const img = document.createElement('img');
        img.id = 'modal-image';
        img.src = artwork.image;
        img.alt = `Enlarged view of painting: ${artwork.title} - ${artwork.description}`;
        img.className = 'gallery-image';
        picture.appendChild(img);
        
        // Add to container
        modalImageContainer.appendChild(picture);
        
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
        const paintingPrice = priceToNumber(artwork.paintingPrice);
        const framePrice = priceToNumber(artwork.framePrice);
        
        modalDetails.innerHTML = `
          <p><strong>Medium:</strong> Acrylic on canvas</p>
          <p><strong>Painting: ${artwork.paintingPrice}</strong></p>
          <p><strong>Frame: ${artwork.framePrice}</strong></p>
          <p><strong>Total with frame: $${paintingPrice + framePrice}</strong></p>
          <p class="note"><em>All prices exclude sales tax, packaging, and shipping.</em></p>
        `;
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
  
  // Setup contact form validation
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form fields
      const nameField = document.getElementById('name');
      const emailField = document.getElementById('email');
      const messageField = document.getElementById('message');
      
      // Reset previous validation styling
      nameField.style.borderColor = '';
      emailField.style.borderColor = '';
      messageField.style.borderColor = '';
      
      // Track errors for each field
      let errors = [];
      
      // Validate name field
      if (!nameField.value.trim()) {
        nameField.style.borderColor = '#f44336';
        errors.push('Please enter your name');
      }
      
      // Validate email field
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailField.value.trim() || !emailPattern.test(emailField.value.trim())) {
        emailField.style.borderColor = '#f44336';
        errors.push('Please enter a valid email address');
      }
      
      // Validate message field
      if (!messageField.value.trim() || messageField.value.length < 10) {
        messageField.style.borderColor = '#f44336';
        errors.push('Please enter a message (at least 10 characters)');
      }
      
      // Display success or error message
      if (errors.length === 0) {
        // Success! Form is valid
        formStatus.innerHTML = '<p>Thank you! Your message has been received.</p>';
        formStatus.style.display = 'block';
        formStatus.style.color = '#4caf50';
        formStatus.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
        formStatus.style.padding = '1rem';
        formStatus.style.borderRadius = '2px';
        formStatus.style.marginTop = '1rem';
        
        // Reset form
        contactForm.reset();
        
        // Hide the success message after 5 seconds
        setTimeout(function() {
          formStatus.style.display = 'none';
        }, 5000);
      } else {
        // Error - show validation messages
        let errorHtml = '<ul style="margin: 0; padding-left: 1.5rem;">';
        errors.forEach(function(error) {
          errorHtml += `<li>${error}</li>`;
        });
        errorHtml += '</ul>';
        
        formStatus.innerHTML = errorHtml;
        formStatus.style.display = 'block';
        formStatus.style.color = '#f44336';
        formStatus.style.backgroundColor = 'rgba(244, 67, 54, 0.1)';
        formStatus.style.padding = '1rem';
        formStatus.style.borderRadius = '2px';
        formStatus.style.marginTop = '1rem';
      }
      
      // Scroll to formStatus if not in view
      if (errors.length > 0) {
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
    
    // Add focus event to reset validation styling
    const formFields = contactForm.querySelectorAll('input, textarea');
    formFields.forEach(function(field) {
      field.addEventListener('focus', function() {
        this.style.borderColor = '';
        formStatus.style.display = 'none';
      });
    });
  }

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
  
  // Handle "Inquire About This Piece" button
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
          
          // Pre-fill the message field with information about the artwork
          const messageField = document.getElementById('message');
          const titleElement = document.getElementById('modal-title');
          
          if (messageField && titleElement) {
            messageField.value = `Hello, I'm interested in your artwork "${titleElement.textContent}". Please provide more information about availability and pricing.`;
            messageField.focus();
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
