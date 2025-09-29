// Registration Page Handler
// Handles the registration page UI and navigation

let currentStep = 'profile';

// Initialize registration page
function initializeRegistrationPage() {
    console.log('Initializing registration page...');

    // Set up step navigation
    setupStepNavigation();

    // Initialize form handlers
    initializeFormHandlers();

    // Load existing data if available
    loadExistingData();
}

// Setup step navigation
function setupStepNavigation() {
    const skipButton = document.querySelector('.btn-secondary');
    if (skipButton) {
        skipButton.addEventListener('click', () => {
            showStep('organization');
        });
    }
}

// Show specific step
function showStep(stepName) {
    currentStep = stepName;

    // Hide all form contents
    document.querySelectorAll('.form-content').forEach(content => {
        content.classList.add('hidden');
    });

    // Show target step
    const targetForm = document.getElementById(`${stepName}Form`);
    if (targetForm) {
        targetForm.classList.remove('hidden');
    }

    // Update progress bar
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const progress = stepName === 'profile' ? 50 : 100;
        progressBar.style.width = `${progress}%`;
    }

    // Update step indicators
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });

    const activeStep = document.querySelector(`[data-step="${stepName}"]`);
    if (activeStep) {
        activeStep.classList.add('active');
    }
}

// Initialize form handlers
function initializeFormHandlers() {
    // Profile form handler
    const profileForm = document.getElementById('profileDetailsForm');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (window.registerForm && window.registerForm.handleProfileSubmission) {
                window.registerForm.handleProfileSubmission(e);
            }
        });
    }

    // Organization form handler
    const organizationForm = document.getElementById('organizationDetailsForm');
    if (organizationForm) {
        organizationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (window.registerForm && window.registerForm.handleOrganizationSubmission) {
                window.registerForm.handleOrganizationSubmission(e);
            }
        });
    }
}

// Load existing data if available
async function loadExistingData() {
    if (window.registerForm && window.registerForm.loadExistingData) {
        await window.registerForm.loadExistingData();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeRegistrationPage);

// Export functions for global access
window.registrationPage = {
    showStep,
    initializeRegistrationPage
};
