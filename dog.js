// K9 Paradise JavaScript Functionality

// ===== DATA: SERVICES (DRY) =====
const SERVICES = [
  {
    key: 'boarding',
    title: 'Boarding',
    description: 'We offer safe, comfortable, and loving dog boarding that feels just like home. Our climate-controlled facilities ensure your pet\'s comfort in any weather.',
    image: 'images/boarding.jpg',
    alt: 'Dog boarding facilities',
    formFields: ''
  },
  {
    key: 'training',
    title: 'Training',
    description: 'We believe every dog has the potential to be well-behaved and confident. Our certified trainers use positive reinforcement methods.',
    image: 'images/training.jpg',
    alt: 'Dog training session',
    formFields: `
      <div class="form-row">
        <div class="form-group">
          <label>Training Type</label>
          <select name="trainingType" required>
            <option value="">Select Training Type</option>
            <option value="obedience">Obedience Training</option>
            <option value="behavioral">Behavioral Correction</option>
            <option value="agility">Agility Training</option>
            <option value="socialization">Socialization</option>
            <option value="advanced">Advanced Training</option>
          </select>
        </div>
        <div class="form-group">
          <label>Preferred Date</label>
          <input type="date" name="trainingDate" required>
        </div>
      </div>
      <div class="form-group">
        <label>Training Goals & Requirements</label>
        <textarea name="trainingRequests" placeholder="What specific behaviors do you want to address? What are your training goals?"></textarea>
      </div>
    `
  },
  {
    key: 'veterinary',
    title: 'Veterinary',
    description: 'We provide compassionate veterinary care to keep your pets healthy and happy. Our onsite clinic offers routine checkups and emergency services.',
    image: 'images/vet.jpg',
    alt: 'Veterinary examination',
    formFields: `
      <div class="form-row">
        <div class="form-group">
          <label>Visit Type</label>
          <select name="visitType" required>
            <option value="">Select Visit Type</option>
            <option value="checkup">Routine Checkup</option>
            <option value="vaccination">Vaccination</option>
            <option value="sick">Sick Visit</option>
            <option value="emergency">Emergency</option>
            <option value="dental">Dental Cleaning</option>
          </select>
        </div>
        <div class="form-group">
          <label>Preferred Date</label>
          <input type="date" name="preferredDate" required>
        </div>
      </div>
      <div class="form-group">
        <label>Symptoms & Concerns</label>
        <textarea name="veterinaryRequests" placeholder="Describe any symptoms, concerns, or medical history..."></textarea>
      </div>
    `
  },
  {
    key: 'transfer',
    title: 'Transfer',
    description: 'We specialize in safe, stress-free transportation for your beloved dog. Our vehicles are equipped with climate control and safety harnesses.',
    image: 'images/transfer.jpg',
    alt: 'Dog in vehicle during transfer',
    formFields: `
      <div class="form-row">
        <div class="form-group">
          <label>Pickup Location</label>
          <input type="text" name="pickupLocation" required>
        </div>
        <div class="form-group">
          <label>Drop-off Location</label>
          <input type="text" name="dropoffLocation" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Pickup Date</label>
          <input type="date" name="pickupDate" required>
        </div>
        <div class="form-group">
          <label>Pickup Time</label>
          <input type="time" name="pickupTime" required>
        </div>
      </div>
      <div class="form-group">
        <label>Special Instructions</label>
        <textarea name="transferRequests" placeholder="Any special handling requirements or instructions..."></textarea>
      </div>
    `
  },
  {
    key: 'walks',
    title: 'Walks',
    description: 'Our dog walking service gives your furry friend the activity and fun they crave. We offer individual and group walks in nearby parks.',
    image: 'images/walk.jpg',
    alt: 'Dog being walked',
    formFields: `
      <div class="form-row">
        <div class="form-group">
          <label>Walk Type</label>
          <select name="walkType" required>
            <option value="">Select Walk Type</option>
            <option value="individual">Individual Walk</option>
            <option value="group">Group Walk</option>
            <option value="hiking">Hiking Adventure</option>
            <option value="training">Training Walk</option>
          </select>
        </div>
        <div class="form-group">
          <label>Preferred Date</label>
          <input type="date" name="walkDate" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Preferred Time</label>
          <input type="time" name="walkTime" required>
        </div>
        <div class="form-group">
          <label>Duration (minutes)</label>
          <select name="walkDuration" required>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">60 minutes</option>
            <option value="90">90 minutes</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>Special Requirements</label>
        <textarea name="walkRequests" placeholder="Any special instructions or requirements for the walk..."></textarea>
      </div>
    `
  }
];

// ===== DATA: ADOPTABLE DOGS (Breed names match Dog CEO API) =====
const DOGS = [
  { breed: 'rottweiler'},
  { breed: 'corgi'},
  { breed: 'affenpinscher'},
  { breed: 'beagle'},
  { breed: 'akita'},
  { breed: 'labrador'},
  { breed: 'boxer'},
  { breed: 'pomeranian'}
];

// Breed display name mapping (for nicer labels)
const BREED_DISPLAY_NAMES = {
  'rottweiler': 'Rottweiler',
  'corgi': 'Welsh Corgi',
  'affenpinscher': 'Affenpinscher',
  'beagle': 'Beagle',
  'akita': 'Akita',
  'labrador': 'Labrador Retriever',
  'boxer': 'Boxer',
  'pomeranian': 'Pomeranian'
};

// ===== COMMON FORM FIELDS =====
const COMMON_FORM_FIELDS = `
  <div class="form-row">
    <div class="form-group"><label>Owner Name</label><input type="text" name="ownerName" required></div>
    <div class="form-group"><label>Email Address</label><input type="email" name="email" required></div>
  </div>
  <div class="form-row">
    <div class="form-group"><label>Phone Number</label><input type="tel" name="phone" required></div>
  </div>
  <div class="form-row">
    <div class="form-group"><label>Dog's Breed</label><input type="text" name="breed" required></div>
    <div class="form-group"><label>Dog's Age</label><input type="number" name="age" min="1" max="20" required></div>
  </div>
`;

// ===== RENDER SERVICES =====
function renderServices() {
  const container = document.getElementById('services-container');
  if (!container) return;

  container.innerHTML = SERVICES.map(service => `
    <div class="service-box">
      <img src="${service.image}" alt="${service.alt}">
      <div class="service-content">
        <h3>${service.title}</h3>
        <p>${service.description}</p>
        <button class="btn service-btn" data-service="${service.key}">Book</button>
        <div class="service-form" id="${service.key}-service-form" style="display: none;">
          <h4>Book ${service.title} Service</h4>
          <form class="booking-form">
            ${COMMON_FORM_FIELDS}
            ${service.formFields}
            <button type="submit" class="btn-submit">Submit</button>
            <button type="button" class="btn-cancel">Cancel</button>
          </form>
        </div>
      </div>
    </div>
  `).join('');
}

// ===== FETCH DOG IMAGE FROM DOG CEO API =====
async function fetchDogImage(breed) {
  try {
    const url = `https://dog.ceo/api/breed/${breed}/images/random`;
    const response = await fetch(url);
    const data = await response.json();
    return data.status === 'success' ? data.message : null;
  } catch (error) {
    console.warn(`Failed to fetch image for breed: ${breed}`, error);
    return null;
  }
}

// ===== RENDER DOGS FROM API =====
async function renderDogs() {
  const container = document.getElementById('dogs-container');
  if (!container) return;

  container.innerHTML = '<p>Loading adorable dogs...</p>';

  const dogCards = [];
  for (const dog of DOGS) {
    const imageUrl = await fetchDogImage(dog.breed);
    const safeBreed = dog.breed.toLowerCase().replace(/\//g, '-');
    const displayName = BREED_DISPLAY_NAMES[dog.breed] || dog.breed;

    dogCards.push(`
      <div class="dog-card">
        <img 
          src="${imageUrl || 'https://place-puppy.com/300x300'}" 
          alt="Adoptable ${displayName}"
          onerror="this.src='https://place-puppy.com/300x300'"
        >
         Breed: ${displayName}</p>
        <div class="adopt-container">
          <a href="#" class="btn adopt-btn" data-dog="${dog.breed}">Adopt Me</a>
          <div class="adopt-form" id="adopt-form-${safeBreed}">
            <form class="adoption-form">
              <div class="form-row">
                <div class="form-group">
                  <label for="name-${safeBreed}">Full Name</label>
                  <input type="text" id="name-${safeBreed}" name="name" required>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="address-${safeBreed}">Address</label>
                  <input type="text" id="address-${safeBreed}" name="address" required>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="visit-date-${safeBreed}">Preferred Visit Date</label>
                  <input type="date" id="visit-date-${safeBreed}" name="visitDate" required>
                </div>
                <div class="form-group">
                  <label for="visit-time-${safeBreed}">Preferred Visit Time</label>
                  <input type="time" id="visit-time-${safeBreed}" name="visitTime" required>
                </div>
              </div>
              <div class="form-row">
                <button type="submit" class="btn-submit">Submit Request</button>
                <button type="button" class="btn-cancel" data-form="adopt-form-${safeBreed}">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `);
  }

  container.innerHTML = dogCards.join('');
}

// ===== EXISTING FUNCTIONALITY (UNCHANGED) =====

document.addEventListener('DOMContentLoaded', async function() {
  // Render content
  renderServices();
  await renderDogs();

  // Initialize interactions
  initializeServiceForms();
  initializeAdoptForms();
  setMinimumDates();
  initializeScrollEffects();
  initializeFormHelpers();
});

// ===== FORM INTERACTIONS =====
function initializeServiceForms() {
  document.querySelectorAll('.service-btn').forEach(button => {
    button.addEventListener('click', function() {
      const service = this.getAttribute('data-service');
      const form = document.getElementById(`${service}-service-form`);
      
      if (!form) {
        console.error(`Form with id ${service}-service-form not found`);
        return;
      }
      
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
      
      if (form.classList.contains('active')) {
        form.classList.remove('active');
        form.style.display = 'none';
        this.textContent = `Book ${capitalizeFirst(service)}`;
        this.classList.remove('cancel-btn');
      } else {
        form.classList.add('active');
        form.style.display = 'block';
        this.textContent = `Cancel ${capitalizeFirst(service)}`;
        this.classList.add('cancel-btn');
        setTimeout(() => {
          form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    });
  });

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

  document.querySelectorAll('.booking-form').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      handleFormSubmission(this, () => {
        resetServiceForm(this);
      });
    });
  });
}

function initializeAdoptForms() {
  document.querySelectorAll('.adopt-form').forEach(form => {
    form.classList.remove('active');
    form.style.display = 'none';
  });

  document.querySelectorAll('.adopt-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const dogBreed = this.getAttribute('data-dog');
      const safeBreed = dogBreed.toLowerCase().replace(/\//g, '-');
      const formId = `adopt-form-${safeBreed}`;
      const form = document.getElementById(formId);

      if (!form) {
        console.error(`Form with id ${formId} not found for breed: ${dogBreed}`);
        return;
      }

      document.querySelectorAll('.adopt-form').forEach(f => {
        if (f !== form) {
          f.classList.remove('active');
          f.style.display = 'none';
        }
      });

      if (form.classList.contains('active')) {
        form.classList.remove('active');
        form.style.display = 'none';
      } else {
        form.classList.add('active');
        form.style.display = 'block';
        setTimeout(() => {
          form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    });
  });

  document.querySelectorAll('.adopt-form .btn-cancel').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const form = this.closest('.adopt-form');
      form.classList.remove('active');
      form.style.display = 'none';
    });
  });

  document.querySelectorAll('.adoption-form').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      handleFormSubmission(this, () => {
        resetAdoptForm(this);
      });
    });
  });
}

function resetServiceForm(form) {
  form.reset();
  form.classList.remove('active');
  form.style.display = 'none';
  const serviceBtn = form.parentElement.querySelector('.service-btn');
  if (serviceBtn) {
    const service = serviceBtn.getAttribute('data-service');
    serviceBtn.textContent = `Book ${capitalizeFirst(service)}`;
    serviceBtn.classList.remove('cancel-btn');
  }
  showSuccessMessage('Your booking request has been submitted successfully!');
}

function resetAdoptForm(form) {
  form.reset();
  form.classList.remove('active');
  form.style.display = 'none';
  showSuccessMessage('Your adoption application has been submitted successfully!');
}

function showSuccessMessage(message) {
  let successDiv = document.getElementById('form-success-message');
  if (!successDiv) {
    successDiv = document.createElement('div');
    successDiv.id = 'form-success-message';
    successDiv.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #4CAF50;
      color: white;
      padding: 12px 24px;
      border-radius: 4px;
      z-index: 10000;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(successDiv);
  }
  
  successDiv.textContent = message;
  successDiv.style.opacity = '1';
  
  setTimeout(() => {
    successDiv.style.opacity = '0';
    setTimeout(() => {
      if (successDiv.parentNode) {
        successDiv.parentNode.removeChild(successDiv);
      }
    }, 300);
  }, 3000);
}

function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function setMinimumDates() {
  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(input => {
    input.setAttribute('min', today);
  });
}

function initializeScrollEffects() {}
function initializeFormHelpers() {}

function handleFormSubmission(form, onSuccessCallback) {
  console.log('Form submitted:', form);
  const submitBtn = form.querySelector('.btn-submit');
  if (submitBtn) {
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      if (onSuccessCallback) onSuccessCallback();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  } else {
    if (onSuccessCallback) onSuccessCallback();
  }
}