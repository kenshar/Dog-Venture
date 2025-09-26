// K9 Paradise JavaScript Functionality

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Service form functionality
    initializeServiceForms();
    
    // Set minimum date for all date inputs to today
    setMinimumDates();
    
    // Initialize any additional features
    initializeScrollEffects();
});

/**
 * Initialize service form interactions
 */
function initializeServiceForms() {
    // Service button click handlers
    document.querySelectorAll('.service-btn').forEach(button => {
        button.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            const form = document.getElementById(`${service}-service-form`);
            
            // Hide all other service forms
            document.querySelectorAll('.service-form').forEach(f => {
                if (f !== form) {
                    f.style.display = 'none';
                    // Reset corresponding button text and style
                    const otherBtn = f.parentElement.querySelector('.service-btn');
                    const otherService = otherBtn.getAttribute('data-service');
                    otherBtn.textContent = `Book ${capitalizeFirst(otherService)}`;
                    otherBtn.style.background = '#f39c12';
                }
            });
            
            // Toggle current form visibility
            if (form.style.display === 'none' || form.style.display === '') {
                showServiceForm(form, this, service);
            } else {
                hideServiceForm(form, this, service);
            }
        });
    });

    // Cancel button functionality
    document.querySelectorAll('.btn-cancel').forEach(button => {
        button.addEventListener('click', function() {
            const form = this.closest('.service-form');
            const serviceBtn = form.parentElement.querySelector('.service-btn');
            const service = serviceBtn.getAttribute('data-service');
            
            hideServiceForm(form, serviceBtn, service);
        });
    });

    // Form submission for service forms
    document.querySelectorAll('.booking-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    });
}

/**
 * Show service form
 */
function showServiceForm(form, button, service) {
    form.style.display = 'block';
    button.textContent = `Cancel ${capitalizeFirst(service)}`;
    button.style.background = '#e74c3c';
    
    // Smooth scroll to form
    setTimeout(() => {
        form.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }, 100);
}

/**
 * Hide service form
 */
function hideServiceForm(form, button, service) {
    form.style.display = 'none';
    button.textContent = `Book ${capitalizeFirst(service)}`;
    button.style.background = '#f39c12';
    
    // Clear any success messages
    const successMsg = form.querySelector('.form-success');
    if (successMsg) {
        successMsg.style.display = 'none';
    }
}

/**
 * Handle form submission
 */
function handleFormSubmission(form) {
    // Create or show success message
    let successMsg = form.querySelector('.form-success');
    if (!successMsg) {
        successMsg = document.createElement('div');
        successMsg.className = 'form-success';
        successMsg.innerHTML = `
            <i class="fas fa-check-circle"></i> 
            Your booking request has been submitted successfully! We'll contact you shortly.
        `;
        form.insertBefore(successMsg, form.firstChild);
    }
    
    // Show success message with animation
    successMsg.style.display = 'block';
    successMsg.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });
    
    // Reset form
    form.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successMsg.style.display = 'none';
    }, 5000);
    
    // Log form data (for debugging/development)
    const formData = new FormData(form);
    console.log('Form submitted with data:', Object.fromEntries(formData));
}

/**
 * Set minimum date for date inputs to today
 */
function setMinimumDates() {
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(input => {
        input.setAttribute('min', today);
    });
}

/**
 * Initialize scroll effects and smooth navigation
 */
function initializeScrollEffects() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll event listener for navbar background opacity
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
        } else {
            header.style.backgroundColor = '#2c3e50';
        }
    });
}

/**
 * Utility function to capitalize first letter
 */
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Form validation helper
 */
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#e74c3c';
        } else {
            field.style.borderColor = '#ddd';
        }
    });
    
    return isValid;
}

/**
 * Email validation
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Phone number validation
 */
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Enhanced form validation with custom messages
 */
function validateFormWithMessages(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    let firstInvalidField = null;
    
    requiredFields.forEach(field => {
        let fieldValid = true;
        
        // Check if field is empty
        if (!field.value.trim()) {
            fieldValid = false;
        }
        
        // Email validation
        if (field.type === 'email' && field.value.trim() && !isValidEmail(field.value)) {
            fieldValid = false;
        }
        
        // Phone validation
        if (field.type === 'tel' && field.value.trim() && !isValidPhone(field.value)) {
            fieldValid = false;
        }
        
        // Age validation
        if (field.name === 'age' && field.value) {
            const age = parseInt(field.value);
            if (age < 1 || age > 20) {
                fieldValid = false;
            }
        }
        
        // Date validation (not in the past)
        if (field.type === 'date' && field.value) {
            const selectedDate = new Date(field.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                fieldValid = false;
            }
        }
        
        if (!fieldValid) {
            isValid = false;
            field.style.borderColor = '#e74c3c';
            if (!firstInvalidField) {
                firstInvalidField = field;
            }
        } else {
            field.style.borderColor = '#27ae60';
        }
    });
    
    // Focus on first invalid field
    if (firstInvalidField) {
        firstInvalidField.focus();
        firstInvalidField.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
    
    return isValid;
}

/**
 * Show loading state during form submission
 */
function showLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Submitting...';
    button.disabled = true;
    
    return function() {
        button.textContent = originalText;
        button.disabled = false;
    };
}

/**
 * Initialize tooltips or help text for form fields
 */
function initializeFormHelpers() {
    // Add helpful placeholders or tooltips
    const ageInputs = document.querySelectorAll('input[name="age"]');
    ageInputs.forEach(input => {
        input.setAttribute('title', 'Enter your dog\'s age in years (1-20)');
    });
    
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.setAttribute('title', 'We\'ll use this to send booking confirmations');
    });
    
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.setAttribute('title', 'Include country code for international numbers');
    });
}

// Initialize form helpers when DOM is ready
document.addEventListener('DOMContentLoaded', initializeFormHelpers);

// Export functions for potential external use
window.K9Paradise = {
    showServiceForm,
    hideServiceForm,
    validateFormWithMessages,
    capitalizeFirst
};