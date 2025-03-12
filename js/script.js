document.addEventListener('DOMContentLoaded', function() {
    // Handle image loading errors
    document.querySelectorAll('img').forEach(img => {
        img.onerror = function() {
            this.src = 'img/placeholder.svg';
            this.onerror = null;
        };
    });

    // Art Gallery Data - Updated with CSV information and additional images
    const artworks = [
        {
            id: 1,
            title: "Fishing Boats on Beach",
            category: "landscape",
            description: "Colorful fishing boats resting on a peaceful shoreline at low tide.",
            image: "img/fishing_boats_on_beach.jpg",
            details: "Acrylic on canvas, 12\" x 16\"",
            price: "$200",
            framePrice: "$75"
        },
        {
            id: 2,
            title: "House With Red Field",
            category: "landscape",
            description: "A rustic farmhouse set against a striking field of vibrant red wildflowers.",
            image: "img/house_with_red_field.jpeg",
            details: "Acrylic on canvas, 14\" x 14\"",
            price: "$250",
            framePrice: "$75"
        },
        {
            id: 3,
            title: "Country House with Red Roof",
            category: "landscape",
            description: "A charming country house with a distinctive red roof nestled in a pastoral setting.",
            image: "img/country_house_with_red_roof.jpg",
            details: "Acrylic on canvas, 12\" x 16\"",
            price: "$250",
            framePrice: "$75"
        },
        {
            id: 4,
            title: "Pathway to the Beach",
            category: "landscape",
            description: "A tranquil pathway leading through coastal dunes to a sun-drenched beach.",
            image: "img/pathway_to_the_beach.jpg",
            details: "Acrylic on canvas, 12\" x 16\"",
            price: "$275",
            framePrice: "$75"
        },
        {
            id: 5,
            title: "Country Walk",
            category: "landscape",
            description: "A serene path winding through rural countryside, inviting peaceful exploration.",
            image: "img/country_walk.jpg",
            details: "Acrylic on canvas, 14\" x 14\"",
            price: "$300",
            framePrice: "$75"
        },
        {
            id: 6,
            title: "Trees in Townsend Forest",
            category: "landscape",
            description: "Ancient trees standing majestically in the historic Townsend Forest.",
            image: "img/trees_in_townsend_forest.jpg",
            details: "Acrylic on canvas, 18\" x 18\"",
            price: "$400",
            framePrice: "$90"
        },
        {
            id: 7,
            title: "Townsend Forest II",
            category: "landscape",
            description: "A different perspective of the beautiful Townsend Forest, capturing its depth and serenity.",
            image: "img/townsend_forest_II.jpg",
            details: "Acrylic on canvas, 16\" x 16\"",
            price: "$350",
            framePrice: "$75"
        },
        {
            id: 8,
            title: "Country House",
            category: "landscape",
            description: "A quaint country house surrounded by natural beauty and tranquility.",
            image: "img/country_house.jpg",
            details: "Acrylic on canvas, 12\" x 16\"",
            price: "$350",
            framePrice: "$90"
        },
        {
            id: 9,
            title: "Townsend Forest IV",
            category: "landscape",
            description: "Another captivating view of Townsend Forest in a different season.",
            image: "img/townsend_forest_IV.jpg",
            details: "Acrylic on canvas, 16\" x 16\"",
            price: "$350",
            framePrice: "$75"
        }
    ];

    // Initialize Gallery
    function initGallery() {
        const galleryGrid = document.getElementById('gallery-grid');
        
        // Create gallery items
        artworks.forEach(artwork => {
            const galleryItem = document.createElement('div');
            galleryItem.className = `gallery-item`;
            galleryItem.setAttribute('data-id', artwork.id);
            
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
            
            // Add click event to open modal
            galleryItem.addEventListener('click', () => openModal(artwork));
        });
    }

    // Modal functionality
    function openModal(artwork) {
        const modal = document.getElementById('image-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalDetails = document.getElementById('modal-details-text');
        
        // Set the title and description
        modalTitle.textContent = artwork.title;
        modalDescription.textContent = artwork.description;
        
        // Get the image container and reset the image element
        const modalImageContainer = document.querySelector('.modal-image-container');
        const oldModalImage = document.getElementById('modal-image');
        
        // Create a fresh image element with no event listeners attached
        const newModalImage = document.createElement('img');
        newModalImage.id = 'modal-image'; // Keep the same ID
        newModalImage.src = artwork.image;
        newModalImage.alt = artwork.title;
        newModalImage.style.cursor = 'zoom-in';
        
        // Replace the old image with the new one
        if (oldModalImage) {
            modalImageContainer.replaceChild(newModalImage, oldModalImage);
        }
        
        // Variables for drag functionality
        let isDragging = false;
        let startX, startY, translateX = 0, translateY = 0;
        let mouseDownTime = 0;
        let mouseDownX = 0;
        let mouseDownY = 0;
        
        // Event handlers
        function handleImageClick(e) {
            e.stopPropagation(); // Prevent modal from closing
            
            // Only handle clicks (not drags)
            const clickTime = new Date().getTime();
            const mouseUpX = e.clientX;
            const mouseUpY = e.clientY;
            const timeDiff = clickTime - mouseDownTime;
            const distance = Math.sqrt(
                Math.pow(mouseUpX - mouseDownX, 2) +
                Math.pow(mouseUpY - mouseDownY, 2)
            );
            
            // If this was a quick tap without movement (< 10px movement and < 300ms)
            if (timeDiff < 300 && distance < 10) {
                if (!this.classList.contains('zoomed')) {
                    // Zoom in
                    this.classList.add('zoomed');
                    this.style.transform = 'scale(1.5)';
                    this.style.cursor = 'grab';
                    translateX = 0;
                    translateY = 0;
                } else {
                    // Zoom out
                    this.classList.remove('zoomed');
                    this.style.transform = 'scale(1)';
                    this.style.cursor = 'zoom-in';
                }
            }
        }
        
        function handleImageMouseDown(e) {
            // Record mousedown time and position for all clicks
            mouseDownTime = new Date().getTime();
            mouseDownX = e.clientX;
            mouseDownY = e.clientY;
            
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
            
            translateX += dx;
            translateY += dy;
            
            // Calculate maximum drag bounds based on the image size and zoom level
            const rect = this.getBoundingClientRect();
            const zoomLevel = 1.5;
            const maxTranslateX = (rect.width * (zoomLevel - 1)) / 2;
            const maxTranslateY = (rect.height * (zoomLevel - 1)) / 2;
            
            // Apply the calculated bounds
            translateX = Math.max(-maxTranslateX, Math.min(translateX, maxTranslateX));
            translateY = Math.max(-maxTranslateY, Math.min(translateY, maxTranslateY));
            
            this.style.transform = `scale(1.5) translate(${translateX}px, ${translateY}px)`;
            
            startX = e.clientX;
            startY = e.clientY;
        }
        
        function handleImageMouseUp() {
            isDragging = false;
            if (this.classList.contains('zoomed')) {
                this.style.cursor = 'grab';
            }
        }
        
        function handleImageMouseLeave() {
            isDragging = false;
            if (this.classList.contains('zoomed')) {
                this.style.cursor = 'grab';
            }
        }
        
        // Add event listeners to the new image
        newModalImage.addEventListener('click', handleImageClick);
        newModalImage.addEventListener('mousedown', handleImageMouseDown);
        newModalImage.addEventListener('mousemove', handleImageMouseMove);
        newModalImage.addEventListener('mouseup', handleImageMouseUp);
        newModalImage.addEventListener('mouseleave', handleImageMouseLeave);
        
        // Build details text including pricing information
        const paintingPrice = parseInt(artwork.price.replace('$',''));
        const framePrice = parseInt(artwork.framePrice.replace('$',''));
        const totalPrice = `Total with frame: $${paintingPrice + framePrice}`;
        
        modalDetails.innerHTML = `
            <p><strong>Medium:</strong> ${artwork.details}</p>
            <p><strong>Painting:</strong> ${artwork.price}</p>
            <p><strong>Frame:</strong> ${artwork.framePrice}</p>
            <p><strong>${totalPrice}</strong></p>
            <p class="note"><em>All prices exclude sales tax, packaging, and shipping.</em></p>
        `;
        
        // Set up inquire button functionality
        const inquireButton = document.getElementById('inquire-button');
        
        function handleInquireClick() {
            // Close the modal
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                
                // Scroll to contact section
                const contactSection = document.getElementById('contact');
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const contactPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: contactPosition,
                    behavior: 'smooth'
                });
                
                // Pre-populate message field
                const messageField = document.getElementById('message');
                messageField.value = `Hello, I'm interested in your painting "${artwork.title}". Please provide more information about availability and purchasing details.`;
                
                // Set focus to the name field
                const nameField = document.getElementById('name');
                setTimeout(() => {
                    nameField.focus();
                }, 800);
            }, 300);
        }
        
        // Remove any existing event listener by using a new function each time
        inquireButton.onclick = handleInquireClick;
        
        // Show modal
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Prevent body scrolling while modal is open
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal when clicking close button
    const closeModal = document.querySelector('.close-modal');
    closeModal.addEventListener('click', () => {
        const modal = document.getElementById('image-modal');
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        
        // Allow body scrolling again
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('image-modal');
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
            
            // Allow body scrolling again
            document.body.style.overflow = 'auto';
        }
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate hamburger to X
        const lines = document.querySelectorAll('.hamburger .line');
        lines.forEach(line => line.classList.toggle('active'));
    });
    
    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                
                // Revert hamburger animation
                const lines = document.querySelectorAll('.hamburger .line');
                lines.forEach(line => line.classList.remove('active'));
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Calculate header height to adjust scroll position
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    // Form validation functions
    function validateName(name) {
        return name.trim().length >= 2;
    }
    
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function validatePhone(phone) {
        // Phone is optional, so empty is valid
        if (phone.trim() === '') return true;
        
        // Basic phone validation - accepts various formats
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return phoneRegex.test(phone.trim());
    }
    
    function validateMessage(message) {
        return message.trim().length >= 10;
    }
    
    // Real-time validation for each field
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');
        
        // Add validation CSS classes
        const addValidationStyles = () => {
            // Add these styles dynamically to avoid modifying the CSS file
            const style = document.createElement('style');
            style.textContent = `
                .form-group input.valid, .form-group textarea.valid {
                    border-color: #4caf50;
                    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%234caf50' viewBox='0 0 16 16'%3E%3Cpath d='M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z'/%3E%3C/svg%3E") no-repeat right 0.75rem center/16px 16px;
                }
                .form-group input.invalid, .form-group textarea.invalid {
                    border-color: #f44336;
                    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23f44336' viewBox='0 0 16 16'%3E%3Cpath d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/%3E%3Cpath d='M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z'/%3E%3C/svg%3E") no-repeat right 0.75rem center/16px 16px;
                }
                .error-message {
                    color: #f44336;
                    font-size: 0.75rem;
                    margin-top: 0.2rem;
                    display: block;
                    height: 0.8rem;
                }
                .form-group textarea.valid, .form-group textarea.invalid {
                    background-position: right 0.75rem top 0.75rem;
                }
            `;
            document.head.appendChild(style);
        };
        
        addValidationStyles();
        
        // Helper to create and update error messages
        const createErrorMessage = (input) => {
            const errorSpan = document.createElement('span');
            errorSpan.className = 'error-message';
            errorSpan.id = `${input.id}-error`;
            input.parentNode.appendChild(errorSpan);
            return errorSpan;
        };
        
        // Create error message elements
        const nameError = createErrorMessage(nameInput);
        const emailError = createErrorMessage(emailInput);
        const phoneError = createErrorMessage(phoneInput);
        const messageError = createErrorMessage(messageInput);
        
        // Event listeners for validation on blur (when user exits the field)
        nameInput.addEventListener('blur', function() {
            if (this.value.trim() !== '') { // Only validate if not empty
                const isValid = validateName(this.value);
                this.className = isValid ? 'valid' : 'invalid';
                nameError.textContent = isValid ? '' : 'Name must be at least 2 characters long';
            }
        });
        
        emailInput.addEventListener('blur', function() {
            if (this.value.trim() !== '') { // Only validate if not empty
                const isValid = validateEmail(this.value);
                this.className = isValid ? 'valid' : 'invalid';
                emailError.textContent = isValid ? '' : 'Please enter a valid email address';
            }
        });
        
        phoneInput.addEventListener('blur', function() {
            if (this.value.trim() !== '') { // Only validate if not empty
                const isValid = validatePhone(this.value);
                this.className = isValid ? 'valid' : 'invalid';
                phoneError.textContent = isValid ? '' : 'Please enter a valid phone number or leave empty';
            }
        });
        
        messageInput.addEventListener('blur', function() {
            if (this.value.trim() !== '') { // Only validate if not empty
                const isValid = validateMessage(this.value);
                this.className = isValid ? 'valid' : 'invalid';
                messageError.textContent = isValid ? '' : 'Message must be at least 10 characters long';
            }
        });
        
        // Clear error on focus (when user enters the field)
        const clearErrorOnFocus = (input, errorElement) => {
            input.addEventListener('focus', function() {
                this.className = '';
                errorElement.textContent = '';
            });
        };
        
        clearErrorOnFocus(nameInput, nameError);
        clearErrorOnFocus(emailInput, emailError);
        clearErrorOnFocus(phoneInput, phoneError);
        clearErrorOnFocus(messageInput, messageError);
        
        // Form submission handler
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = nameInput.value;
            const email = emailInput.value;
            const phone = phoneInput.value;
            const message = messageInput.value;
            
            // Validate all fields
            const isNameValid = validateName(name);
            const isEmailValid = validateEmail(email);
            const isPhoneValid = validatePhone(phone);
            const isMessageValid = validateMessage(message);
            
            // Trigger validation UI updates
            nameInput.className = isNameValid ? 'valid' : 'invalid';
            emailInput.className = isEmailValid ? 'valid' : 'invalid';
            phoneInput.className = isPhoneValid ? 'valid' : 'invalid';
            messageInput.className = isMessageValid ? 'valid' : 'invalid';
            
            // Show error messages
            nameError.textContent = isNameValid ? '' : 'Name must be at least 2 characters long';
            emailError.textContent = isEmailValid ? '' : 'Please enter a valid email address';
            phoneError.textContent = isPhoneValid ? '' : 'Please enter a valid phone number or leave empty';
            messageError.textContent = isMessageValid ? '' : 'Message must be at least 10 characters long';
            
            // Check if all validations pass
            if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
                // In a real website, you would send the form data to a server here
                // For demo purposes, we'll just show a success message
                formStatus.textContent = 'Thank you! Your message has been sent.';
                formStatus.className = 'form-status success';
                
                // Reset form
                contactForm.reset();
                
                // Reset validation classes
                nameInput.className = '';
                emailInput.className = '';
                phoneInput.className = '';
                messageInput.className = '';
                
                // Clear error messages
                nameError.textContent = '';
                emailError.textContent = '';
                phoneError.textContent = '';
                messageError.textContent = '';
                
                // Clear success message after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.className = 'form-status';
                }, 5000);
            } else {
                // Show general error message
                formStatus.textContent = 'Please fix the errors in the form before submitting.';
                formStatus.className = 'form-status error';
            }
        });
    }

    // Update current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.site-header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Initialize Gallery
    initGallery();
});