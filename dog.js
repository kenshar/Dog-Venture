// K9 Paradise JavaScript Functionality

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Service form functionality
    initializeServiceForms();
    
    // Adoption form functionality
    initializeAdoptForms();
    
    // Set minimum date for all date inputs to today
    setMinimumDates();
    
    // Initialize any additional features
    initializeScrollEffects();

    // Initialize form helpers
    initializeFormHelpers();
});

/**
 * Initialize service form interactions
 */
function initializeServiceForms() {
    document.querySelectorAll('.service-btn').forEach(button => {
        button.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            const form = document.getElementById(`${service}-service-form`);
            
            if (!form) {
                console.error(`Form with id ${service}-service-form not found`);
                return;
            }
            
            // Hide all other service forms
            document.querySelectorAll('.service-form').forEach(f => {
                if (f !== form) {
                    f.classList.remove('active');
                    f.style.display = 'none';
                    const otherBtn = f.parentElement.querySelector('.service-btn');
                    if (otherBtn) {
                        const otherService = otherBtn.getAttribute('data-service');
                        otherBtn.textContent = `Book ${capitalizeFirst(otherService)}`;
                        otherBtn.classList.remove('cancel-btn');
                    }
                }
            });
            
            // Toggle current form visibility
            if (form.classList.contains('active')) {
                // Hide form
                form.classList.remove('active');
                form.style.display = 'none';
                this.textContent = `Book ${capitalizeFirst(service)}`;
                this.classList.remove('cancel-btn');
            } else {
                // Show form
                form.classList.add('active');
                form.style.display = 'block';
                this.textContent = `Cancel ${capitalizeFirst(service)}`;
                this.classList.add('cancel-btn');
                
                // Scroll to form
                setTimeout(() => {
                    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
    });

    // Cancel buttons inside service forms
    document.querySelectorAll('.service-form .btn-cancel').forEach(button => {
        button.addEventListener('click', function() {
            const form = this.closest('.service-form');
            const serviceBtn = form.parentElement.querySelector('.service-btn');
            if (serviceBtn) {
                const service = serviceBtn.getAttribute('data-service');
                form.classList.remove('active');
                form.style.display = 'none';
                serviceBtn.textContent = `Book ${capitalizeFirst(service)}`;
                serviceBtn.classList.remove('cancel-btn');
            }
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
 * Initialize adoption form interactions
 */
function initializeAdoptForms() {
    // Hide all adopt forms initially
    document.querySelectorAll('.adopt-form').forEach(form => {
        form.classList.remove('active');
        form.style.display = 'none';
    });

    // Show relevant adopt form when "Adopt Me" clicked
    document.querySelectorAll('.adopt-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const dogName = this.getAttribute('data-dog').toLowerCase().replace(/\s+/g, '-');
            const formId = `adopt-form-${dogName}`;
            const form = document.getElementById(formId);

            if (!form) {
                console.error(`Form with id ${formId} not found`);
                return;
            }

            // Hide other adopt forms
            document.querySelectorAll('.adopt-form').forEach(f => {
                if (f !== form) {
                    f.classList.remove('active');
                    f.style.display = 'none';
                }
            });

            // Toggle current form
            if (form.classList.contains('active')) {
                form.classList.remove('active');
                form.style.display = 'none';
            } else {
                form.classList.add('active');
                form.style.display = 'block';
                
                // Scroll to form
                setTimeout(() => {
                    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
    });

    // Cancel buttons inside adopt forms
    document.querySelectorAll('.adopt-form .btn-cancel').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const form = this.closest('.adopt-form');
            form.classList.remove('active');
            form.style.display = 'none';
        });
    });

    // Handle adopt form submissions
    document.querySelectorAll('.adoption-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    });
}

/**
 * Helper function to capitalize first letter
 */
function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Set minimum dates for date inputs
 */
function setMinimumDates() {
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(input => {
        input.setAttribute('min', today);
    });
}

/**
 * Initialize scroll effects
 */
function initializeScrollEffects() {
    // Add scroll animations if needed
}

/**
 * Initialize form helpers
 */
function initializeFormHelpers() {
    // Add any form validation or helper functions
}

/**
 * Handle form submission
 */
function handleFormSubmission(form) {
    // Add your form submission logic here
    console.log('Form submitted:', form);
    
    // You can add success message, validation, etc.
    const submitBtn = form.querySelector('.btn-submit');
    if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = 'Submitted!';
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }, 1500);
    }
}