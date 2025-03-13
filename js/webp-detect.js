/**
 * WebP Format Detection Script
 * Adds 'webp' or 'no-webp' class to the HTML element based on browser support
 */

// Check for WebP support and add the appropriate class to the HTML element
(function() {
    // Create a test image with WebP data
    const webP = new Image();
    webP.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
    
    // Set up onload event handler
    webP.onload = webP.onerror = function() {
        // If height is set, WebP is supported
        const className = webP.height === 1 ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    };
}());
