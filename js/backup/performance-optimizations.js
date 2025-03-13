/**
 * Performance optimizations for the Doug George Art website
 * This file contains additional performance-related functions
 */

// Preload critical images on page load
window.addEventListener('load', function() {
    // Check for WebP support for optimal preloading
    const supportsWebP = document.documentElement.classList.contains('webp');
    
    // Preload the hero image in appropriate format
    const heroImage = new Image();
    heroImage.src = supportsWebP ? 'img/bg-hero-img.webp' : 'img/bg-hero-img.jpg';
    
    // Preload first few gallery images
    const preloadImages = supportsWebP 
        ? [
            'img/fishing_boats_on_beach.webp',
            'img/house_with_red_field.webp',
            'img/country_house_with_red_roof.webp'
        ]
        : [
            'img/fishing_boats_on_beach.jpg',
            'img/house_with_red_field.jpeg',
            'img/country_house_with_red_roof.jpg'
        ];
    
    preloadImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Debounce function for performance-intensive operations
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Optimize passive listening for supported browsers
function passiveListenerSupported() {
    let passive = false;
    
    try {
        const options = Object.defineProperty({}, 'passive', {
            get: function() {
                passive = true;
                return true;
            }
        });
        
        window.addEventListener('test', null, options);
        window.removeEventListener('test', null, options);
    } catch(err) {
        passive = false;
    }
    
    return passive;
}

// Apply passive listeners to scroll events where supported
const eventListenerOptions = passiveListenerSupported() ? { passive: true } : false;

// Cache frequently accessed DOM elements
const cachedElements = {};

function getElement(selector) {
    if (!cachedElements[selector]) {
        cachedElements[selector] = document.querySelector(selector);
    }
    return cachedElements[selector];
}

// Remove unused event listeners on page unload to prevent memory leaks
window.addEventListener('unload', function() {
    // Clear any timeouts or intervals that might be running
    const highestTimeoutId = setTimeout(";");
    for (let i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
    }
});

// Export these utility functions for use in main script.js
window.perfUtils = {
    debounce,
    passiveListenerSupported,
    getElement,
    eventListenerOptions
};
