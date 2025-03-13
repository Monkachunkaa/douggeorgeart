/**
 * Emergency fix for gallery display issues
 */

// Execute as soon as possible
(function() {
  // Basic gallery data with fallback to JPG only for reliability
  const artworks = [
    {
      id: 1,
      title: "Fishing Boats on Beach",
      description: "Colorful fishing boats resting on a peaceful shoreline at low tide.",
      image: "img/fishing_boats_on_beach.jpg",
      details: "Acrylic on canvas, 12\" x 16\"",
      price: "$200",
      framePrice: "$75"
    },
    {
      id: 2,
      title: "House With Red Field",
      description: "A rustic farmhouse set against a striking field of vibrant red wildflowers.",
      image: "img/house_with_red_field.jpeg",
      details: "Acrylic on canvas, 14\" x 14\"",
      price: "$250",
      framePrice: "$75"
    },
    {
      id: 3,
      title: "Country House with Red Roof",
      description: "A charming country house with a distinctive red roof nestled in a pastoral setting.",
      image: "img/country_house_with_red_roof.jpg",
      details: "Acrylic on canvas, 12\" x 16\"",
      price: "$250",
      framePrice: "$75"
    },
    {
      id: 4,
      title: "Pathway to the Beach",
      description: "A tranquil pathway leading through coastal dunes to a sun-drenched beach.",
      image: "img/pathway_to_the_beach.jpg",
      details: "Acrylic on canvas, 12\" x 16\"",
      price: "$275",
      framePrice: "$75"
    },
    {
      id: 5,
      title: "Country Walk",
      description: "A serene path winding through rural countryside, inviting peaceful exploration.",
      image: "img/country_walk.jpg",
      details: "Acrylic on canvas, 14\" x 14\"",
      price: "$300",
      framePrice: "$75"
    },
    {
      id: 6,
      title: "Trees in Townsend Forest",
      description: "Ancient trees standing majestically in the historic Townsend Forest.",
      image: "img/trees_in_townsend_forest.jpg",
      details: "Acrylic on canvas, 18\" x 18\"",
      price: "$400",
      framePrice: "$90"
    },
    {
      id: 7,
      title: "Townsend Forest II",
      description: "A different perspective of the beautiful Townsend Forest, capturing its depth and serenity.",
      image: "img/townsend_forest_II.jpg",
      details: "Acrylic on canvas, 16\" x 16\"",
      price: "$350",
      framePrice: "$75"
    },
    {
      id: 8,
      title: "Country House",
      description: "A quaint country house surrounded by natural beauty and tranquility.",
      image: "img/country_house.jpg",
      details: "Acrylic on canvas, 12\" x 16\"",
      price: "$350",
      framePrice: "$90"
    },
    {
      id: 9,
      title: "Townsend Forest IV",
      description: "Another captivating view of Townsend Forest in a different season.",
      image: "img/townsend_forest_IV.jpg",
      details: "Acrylic on canvas, 16\" x 16\"",
      price: "$350",
      framePrice: "$75"
    }
  ];

  // Simple function to ensure gallery displays
  function fixGallery() {
    console.log("Emergency gallery fix activated");
    
    // Get the gallery grid element
    const galleryGrid = document.getElementById('gallery-grid');
    
    // If gallery grid not found, try to locate it by class or create it
    if (!galleryGrid) {
      console.error("Gallery grid not found with ID 'gallery-grid'");
      return;
    }
    
    // Clear any existing content
    galleryGrid.innerHTML = '';
    
    // Simple, reliable HTML for each gallery item
    artworks.forEach(artwork => {
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';
      galleryItem.innerHTML = `
        <div class="gallery-image-container">
          <img src="${artwork.image}" alt="${artwork.title}" class="gallery-image">
        </div>
        <div class="gallery-caption">
          <h3>${artwork.title}</h3>
          <p>${artwork.description}</p>
          <p class="artwork-price">Painting: ${artwork.price} | Frame: ${artwork.framePrice}</p>
        </div>
      `;
      
      galleryGrid.appendChild(galleryItem);
      
      // Basic click to show modal
      galleryItem.addEventListener('click', function() {
        const modal = document.getElementById('image-modal');
        if (modal) {
          // Fill in modal content
          const modalTitle = document.getElementById('modal-title');
          const modalImage = document.getElementById('modal-image');
          const modalDescription = document.getElementById('modal-description');
          
          if (modalTitle) modalTitle.textContent = artwork.title;
          if (modalImage) modalImage.src = artwork.image;
          if (modalDescription) modalDescription.textContent = artwork.description;
          
          // Show modal
          modal.style.display = 'flex';
          setTimeout(() => {
            modal.classList.add('show');
          }, 10);
        }
      });
    });
    
    console.log("Gallery fix completed, added", artworks.length, "items");
  }

  // Run the fix when DOM is ready
  if (document.readyState !== 'loading') {
    fixGallery();
  } else {
    document.addEventListener('DOMContentLoaded', fixGallery);
  }
  
  // Also try again after window loads, as a fallback
  window.addEventListener('load', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length === 0) {
      console.log("No gallery items found on window load, trying fix again");
      fixGallery();
    }
  });
})();
