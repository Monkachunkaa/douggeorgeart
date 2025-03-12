# Doug George Art Website

This is a simple and elegant website designed to showcase Doug George's artwork and provide a contact form for inquiries.

## Features

- Responsive design that works on all device sizes
- Gallery with filtering functionality
- Image modal for detailed views
- Contact form for inquiries
- Clean, minimalist design that puts the focus on the artwork

## Structure

- `index.html` - Main HTML file
- `css/` 
  - `normalize.css` - CSS reset for consistent rendering
  - `styles.css` - Custom styles for the website
- `js/`
  - `script.js` - JavaScript for gallery functionality, contact form, and other interactions
- `img/` - Folder for all images
  - See the README.txt in this folder for details on required images

## Setup and Usage

1. Replace the placeholder images in the `img/` folder with actual artwork and photos
2. Update the artwork information in the `artworks` array in `js/script.js` if needed
3. For a live site, set up a backend for the contact form or use a service like Formspree

## Customization

- The color scheme can be easily changed by modifying the CSS variables in the `:root` section of `styles.css`
- Fonts can be changed by updating the Google Fonts link in `index.html` and the font-family properties in `styles.css`
- Additional gallery categories can be added by:
  1. Adding new filter buttons in the HTML
  2. Adding the corresponding category to artwork items in the `artworks` array

## Browser Compatibility

This website is built with modern CSS and JavaScript and works in all major browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Notes for Future Development

Potential enhancements:
- Add a dedicated page for each artwork
- Implement a lightbox gallery for artwork series
- Add an online shop for prints or originals
- Integrate with social media platforms
- Add a blog or news section for exhibitions and events
