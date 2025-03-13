/**
 * Direct Gallery Implementation
 * Completely standalone gallery that doesn't rely on other scripts
 */

// Run this code when the page has loaded
window.addEventListener('load', function() {
  console.log('Initializing direct gallery...');
  
  // Get the gallery container
  const galleryContainer = document.getElementById('gallery-grid');
  
  // If gallery container isn't found, try to find by tag/class or create it
  if (!galleryContainer) {
    console.error('Gallery container not found! Trying alternative approach...');
    const gallerySection = document.querySelector('.gallery');
    if (gallerySection) {
      const container = gallerySection.querySelector('.container');
      if (container) {
        // Create a new gallery grid
        const newGrid = document.createElement('div');
        newGrid.id = 'gallery-grid';
        newGrid.className = 'gallery-grid';
        
        // Add after the heading
        const heading = container.querySelector('h2');
        if (heading) {
          heading.after(newGrid);
        } else {
          container.appendChild(newGrid);
        }
        
        console.log('Created new gallery grid element');
      }
    }
  }
  
  // Check again after potential creation
  const galleryGrid = document.getElementById('gallery-grid');
  if (!galleryGrid) {
    console.error('Could not find or create gallery grid element!');
    return;
  }
  
  // Clear existing content
  galleryGrid.innerHTML = '';
  
  // Insert gallery items directly - Each as a separate element to ensure event binding works
  // First item
  const item1 = document.createElement('div');
  item1.className = 'gallery-item';
  item1.setAttribute('data-id', '1');
  item1.innerHTML = `
    <div class="gallery-image-container">
      <img src="img/fishing_boats_on_beach.jpg" alt="Fishing Boats on Beach" class="gallery-image">
    </div>
    <div class="gallery-caption">
      <h3>Fishing Boats on Beach</h3>
      <p>Colorful fishing boats resting on a peaceful shoreline at low tide.</p>
      <p class="artwork-price">Painting: $200 | Frame: $75</p>
    </div>
  `;
  galleryGrid.appendChild(item1);
  
  // Second item
  const item2 = document.createElement('div');
  item2.className = 'gallery-item';
  item2.setAttribute('data-id', '2');
  item2.innerHTML = `
    <div class="gallery-image-container">
      <img src="img/house_with_red_field.jpeg" alt="House With Red Field" class="gallery-image">
    </div>
    <div class="gallery-caption">
      <h3>House With Red Field</h3>
      <p>A rustic farmhouse set against a striking field of vibrant red wildflowers.</p>
      <p class="artwork-price">Painting: $250 | Frame: $75</p>
    </div>
  `;
  galleryGrid.appendChild(item2);
  
  // Third item
  const item3 = document.createElement('div');
  item3.className = 'gallery-item';
  item3.setAttribute('data-id', '3');
  item3.innerHTML = `
    <div class="gallery-image-container">
      <img src="img/country_house_with_red_roof.jpg" alt="Country House with Red Roof" class="gallery-image">
    </div>
    <div class="gallery-caption">
      <h3>Country House with Red Roof</h3>
      <p>A charming country house with a distinctive red roof nestled in a pastoral setting.</p>
      <p class="artwork-price">Painting: $250 | Frame: $75</p>
    </div>
  `;
  galleryGrid.appendChild(item3);
  
  // Fourth item
  const item4 = document.createElement('div');
  item4.className = 'gallery-item';
  item4.setAttribute('data-id', '4');
  item4.innerHTML = `
    <div class="gallery-image-container">
      <img src="img/pathway_to_the_beach.jpg" alt="Pathway to the Beach" class="gallery-image">
    </div>
    <div class="gallery-caption">
      <h3>Pathway to the Beach</h3>
      <p>A tranquil pathway leading through coastal dunes to a sun-drenched beach.</p>
      <p class="artwork-price">Painting: $275 | Frame: $75</p>
    </div>
  `;
  galleryGrid.appendChild(item4);
  
  // Fifth item
  const item5 = document.createElement('div');
  item5.className = 'gallery-item';
  item5.setAttribute('data-id', '5');
  item5.innerHTML = `
    <div class="gallery-image-container">
      <img src="img/country_walk.jpg" alt="Country Walk" class="gallery-image">
    </div>
    <div class="gallery-caption">
      <h3>Country Walk</h3>
      <p>A serene path winding through rural countryside, inviting peaceful exploration.</p>
      <p class="artwork-price">Painting: $300 | Frame: $75</p>
    </div>
  `;
  galleryGrid.appendChild(item5);
  
  // Sixth item
  const item6 = document.createElement('div');
  item6.className = 'gallery-item';
  item6.setAttribute('data-id', '6');
  item6.innerHTML = `
    <div class="gallery-image-container">
      <img src="img/trees_in_townsend_forest.jpg" alt="Trees in Townsend Forest" class="gallery-image">
    </div>
    <div class="gallery-caption">
      <h3>Trees in Townsend Forest</h3>
      <p>Ancient trees standing majestically in the historic Townsend Forest.</p>
      <p class="artwork-price">Painting: $400 | Frame: $90</p>
    </div>
  `;
  galleryGrid.appendChild(item6);
  
  // Seventh item
  const item7 = document.createElement('div');
  item7.className = 'gallery-item';
  item7.setAttribute('data-id', '7');
  item7.innerHTML = `
    <div class="gallery-image-container">
      <img src="img/townsend_forest_II.jpg" alt="Townsend Forest II" class="gallery-image">
    </div>
    <div class="gallery-caption">
      <h3>Townsend Forest II</h3>
      <p>A different perspective of the beautiful Townsend Forest, capturing its depth and serenity.</p>
      <p class="artwork-price">Painting: $350 | Frame: $75</p>
    </div>
  `;
  galleryGrid.appendChild(item7);
  
  // Eighth item
  const item8 = document.createElement('div');
  item8.className = 'gallery-item';
  item8.setAttribute('data-id', '8');
  item8.innerHTML = `
    <div class="gallery-image-container">
      <img src="img/country_house.jpg" alt="Country House" class="gallery-image">
    </div>
    <div class="gallery-caption">
      <h3>Country House</h3>
      <p>A quaint country house surrounded by natural beauty and tranquility.</p>
      <p class="artwork-price">Painting: $350 | Frame: $90</p>
    </div>
  `;
  galleryGrid.appendChild(item8);
  
  // Ninth item
  const item9 = document.createElement('div');
  item9.className = 'gallery-item';
  item9.setAttribute('data-id', '9');
  item9.innerHTML = `
    <div class="gallery-image-container">
      <img src="img/townsend_forest_IV.jpg" alt="Townsend Forest IV" class="gallery-image">
    </div>
    <div class="gallery-caption">
      <h3>Townsend Forest IV</h3>
      <p>Another captivating view of Townsend Forest in a different season.</p>
      <p class="artwork-price">Painting: $350 | Frame: $75</p>
    </div>
  `;
  galleryGrid.appendChild(item9);
  
  // Function to open the modal with artwork details
  function openModal(item) {
    console.log('Opening modal for item:', item.dataset.id);
    
    const modal = document.getElementById('image-modal');
    if (!modal) {
      console.error('Modal not found!');
      return;
    }
    
    // Get information from the gallery item
    const img = item.querySelector('.gallery-image');
    const title = item.querySelector('h3').textContent;
    const description = item.querySelector('p').textContent;
    const priceInfo = item.querySelector('.artwork-price').textContent;
    
    // Update modal content
    document.getElementById('modal-title').textContent = title;
    const modalImg = document.getElementById('modal-image');
    if (modalImg) modalImg.src = img.src;
    document.getElementById('modal-description').textContent = description;
    
    // Build and set details text with pricing information
    const detailsArea = document.getElementById('modal-details-text');
    if (detailsArea) {
      // Extract the painting and frame prices
      const priceParts = priceInfo.split('|');
      const paintingPrice = priceParts[0].trim();
      const framePrice = priceParts[1] ? priceParts[1].trim() : '';
      
      // Calculate total price if possible
      let totalPrice = '';
      try {
        const paintingValue = parseInt(paintingPrice.replace('Painting: $', '').trim());
        const frameValue = parseInt(framePrice.replace('Frame: $', '').trim());
        totalPrice = `<p><strong>Total with frame: $${paintingValue + frameValue}</strong></p>`;
      } catch (e) {
        console.error('Error calculating total price:', e);
      }
      
      detailsArea.innerHTML = `
        <p><strong>Medium:</strong> Acrylic on canvas</p>
        <p><strong>${paintingPrice}</strong></p>
        <p><strong>${framePrice}</strong></p>
        ${totalPrice}
        <p class="note"><em>All prices exclude sales tax, packaging, and shipping.</em></p>
      `;
    }
    
    // Show the modal
    modal.style.display = 'flex';
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);
  }
  
  // Add click handlers to each gallery item
  item1.addEventListener('click', function() { openModal(this); });
  item2.addEventListener('click', function() { openModal(this); });
  item3.addEventListener('click', function() { openModal(this); });
  item4.addEventListener('click', function() { openModal(this); });
  item5.addEventListener('click', function() { openModal(this); });
  item6.addEventListener('click', function() { openModal(this); });
  item7.addEventListener('click', function() { openModal(this); });
  item8.addEventListener('click', function() { openModal(this); });
  item9.addEventListener('click', function() { openModal(this); });
  
  // Alternate approach: add event listeners to all gallery items
  // This is a backup in case the individual event handlers don't work
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.cursor = 'pointer'; // Visual indication that items are clickable
    item.addEventListener('click', function() {
      console.log('Gallery item clicked via delegation:', this.dataset.id);
      openModal(this);
    });
  });
  
  console.log('Direct gallery initialized with manual event binding');
});
