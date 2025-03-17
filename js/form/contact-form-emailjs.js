/**
 * Contact Form Handler using EmailJS
 * Handles form validation and submission without page redirect
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if EmailJS script is loaded
    if (typeof emailjs === 'undefined') {
        console.error("EmailJS library is not loaded. Make sure to include the EmailJS script in your HTML.");
        return;
    }
    
    // Initialize EmailJS with public key
    (function() {
        // https://dashboard.emailjs.com/admin/account
        emailjs.init({
            publicKey: "3bZXI322cqKC56DBj",
        });
    })();
    
    // Find the contact form
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    // Find the form status element
    let formStatus = document.getElementById('form-status');
    if (!formStatus) {
        // Create one if it doesn't exist
        const newStatus = document.createElement('div');
        newStatus.id = 'form-status';
        newStatus.className = 'form-status';
        contactForm.appendChild(newStatus);
        formStatus = newStatus;
    }
    
    // Create loading spinner function
    function showLoading() {
        // Create a loading spinner element if it doesn't exist
        if (!document.getElementById('form-loading')) {
            const loadingEl = document.createElement('div');
            loadingEl.id = 'form-loading';
            loadingEl.className = 'form-loading';
            loadingEl.innerHTML = `
                <div class="spinner"></div>
                <p>Sending message...</p>
            `;
            contactForm.appendChild(loadingEl);
        } else {
            document.getElementById('form-loading').style.display = 'flex';
        }
        
        // Disable submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
        }
    }
    
    // Hide loading spinner function
    function hideLoading() {
        const loadingEl = document.getElementById('form-loading');
        if (loadingEl) {
            loadingEl.style.display = 'none';
        }
        
        // Enable submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = false;
        }
    }
    
    // Add event listener to the form
    contactForm.addEventListener('submit', function(e) {
        // Prevent the default form submission
        e.preventDefault();
        
        // Reset previous validation styling
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const phoneField = document.getElementById('phone');
        const messageField = document.getElementById('message');
        
        nameField.style.borderColor = '';
        emailField.style.borderColor = '';
        if (phoneField) phoneField.style.borderColor = '';
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
        
        // If there are errors, prevent submission and show error
        if (errors.length > 0) {
            // Display errors
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
            
            // Scroll to formStatus if not in view
            formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            return;
        }
        
        // If validation passes, show loading spinner
        showLoading();
        
        // Send email using EmailJS
        // Replace "YOUR_SERVICE_ID" and "YOUR_TEMPLATE_ID" with your actual values
        emailjs.sendForm('honeybee_gmail_service', 'notif_to_doug', contactForm)
            .then(function(response) {
                // Success
                hideLoading();
                
                formStatus.innerHTML = '<p>Thank you! Your message has been sent successfully. Doug will be in touch soon.</p>';
                formStatus.style.display = 'block';
                formStatus.style.color = '#4caf50';
                formStatus.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
                formStatus.style.padding = '1rem';
                formStatus.style.borderRadius = '2px';
                formStatus.style.marginTop = '1rem';
                
                // Reset form
                contactForm.reset();
                
                // Clear any stored inquiry
                if (sessionStorage.getItem('artworkInquiry')) {
                    sessionStorage.removeItem('artworkInquiry');
                }
            })
            .catch(function(error) {
                // Error
                hideLoading();
                
                formStatus.innerHTML = '<p>Sorry, there was a problem sending your message. Please try again later.</p>';
                formStatus.style.display = 'block';
                formStatus.style.color = '#f44336';
                formStatus.style.backgroundColor = 'rgba(244, 67, 54, 0.1)';
                formStatus.style.padding = '1rem';
                formStatus.style.borderRadius = '2px';
                formStatus.style.marginTop = '1rem';
            });
    });
    
    // Add focus event to reset validation styling
    const formFields = contactForm.querySelectorAll('input, textarea');
    formFields.forEach(function(field) {
        field.addEventListener('focus', function() {
            this.style.borderColor = '';
        });
    });
    
    // Check if there's a specific artwork inquiry from sessionStorage
    window.addEventListener('load', function() {
        const inquiryText = sessionStorage.getItem('artworkInquiry');
        if (inquiryText) {
            const messageField = document.getElementById('message');
            if (messageField) {
                messageField.value = inquiryText;
                
                // Scroll to the contact section
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    setTimeout(() => {
                        const headerHeight = document.querySelector('.site-header').offsetHeight || 0;
                        const contactPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                        
                        window.scrollTo({
                            top: contactPosition,
                            behavior: 'smooth'
                        });
                        
                        // Focus on the name field after scrolling
                        setTimeout(() => {
                            document.getElementById('name').focus();
                        }, 1000);
                    }, 500);
                }
            }
        }
    });
});
