// Registration Form Handler
// Handles profile and organization form submissions

// API Configuration - Use the global API_BASE_URL from api.js
// const API_BASE_URL is already declared in api.js

// Get authentication token
function getAuthToken() {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
}

// Show loading state
function showLoading(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<span class="loading-spinner"></span> Saving...';
    button.disabled = true;
    return originalText;
}

// Hide loading state
function hideLoading(button, originalText) {
    button.innerHTML = originalText;
    button.disabled = false;
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 5000);
}

// Handle profile form submission
async function handleProfileSubmission(event) {
    event.preventDefault();

    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = showLoading(submitButton);

    try {
        // Get form data
        const formData = new FormData(form);
        const profileData = {};

        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            if (key === 'focusAreas') {
                // Handle multiple checkboxes
                if (!profileData[key]) profileData[key] = [];
                profileData[key].push(value);
            } else {
                profileData[key] = value;
            }
        }

        // Split fullName into firstName and lastName
        if (profileData.fullName) {
            const nameParts = profileData.fullName.trim().split(' ');
            profileData.firstName = nameParts[0] || '';
            profileData.lastName = nameParts.slice(1).join(' ') || '';
            delete profileData.fullName; // Remove the fullName field
        }

        // Convert date string to Date object
        if (profileData.dateOfBirth) {
            profileData.dateOfBirth = new Date(profileData.dateOfBirth);
        }

        // Convert notifications checkbox to boolean
        profileData.notifications = formData.has('notifications');

        console.log('Saving profile data:', profileData);

        // Send to backend
        const response = await fetch(`${window.API_BASE_URL}/profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify(profileData)
        });

        const result = await response.json();

        console.log('Profile save response:', result);

        if (result.success) {
            showNotification('Profile saved successfully!', 'success');

            // Move to next step (organization details)
            setTimeout(() => {
                showStep('organization');
            }, 1000);
        } else {
            throw new Error(result.message || 'Failed to save profile');
        }

    } catch (error) {
        console.error('Profile save error:', error);
        showNotification(`Failed to save profile: ${error.message}`, 'error');
    } finally {
        hideLoading(submitButton, originalText);
    }
}

// Handle organization form submission
async function handleOrganizationSubmission(event) {
    event.preventDefault();

    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = showLoading(submitButton);

    try {
        // Get form data
        const formData = new FormData(form);
        const organizationData = {};

        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            if (key === 'focusAreas') {
                // Handle multiple checkboxes
                if (!organizationData[key]) organizationData[key] = [];
                organizationData[key].push(value);
            } else {
                organizationData[key] = value;
            }
        }

        console.log('Saving organization data:', organizationData);

        // Send to backend
        const response = await fetch(`${window.API_BASE_URL}/organization`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify(organizationData)
        });

        const result = await response.json();

        console.log('Organization save response:', result);

        if (result.success) {
            showNotification('Organization details saved successfully!', 'success');

            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = './dashboard.html';
            }, 1500);
        } else {
            throw new Error(result.message || 'Failed to save organization details');
        }

    } catch (error) {
        console.error('Organization save error:', error);
        showNotification(`Failed to save organization details: ${error.message}`, 'error');
    } finally {
        hideLoading(submitButton, originalText);
    }
}

// Show specific step
function showStep(stepName) {
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

// Load existing data if available
async function loadExistingData() {
    try {
        // Load profile data
        const profileResponse = await fetch(`${window.API_BASE_URL}/profile`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        if (profileResponse.ok) {
            const profileResult = await profileResponse.json();
            if (profileResult.success && profileResult.data) {
                populateForm('profileDetailsForm', profileResult.data);
            }
        }

        // Load organization data
        const orgResponse = await fetch(`${window.API_BASE_URL}/organization`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        if (orgResponse.ok) {
            const orgResult = await orgResponse.json();
            if (orgResult.success && orgResult.data) {
                populateForm('organizationDetailsForm', orgResult.data);
            }
        }

    } catch (error) {
        console.error('Error loading existing data:', error);
    }
}

// Populate form with existing data
function populateForm(formId, data) {
    const form = document.getElementById(formId);
    if (!form) return;

    Object.keys(data).forEach(key => {
        const field = form.querySelector(`[name="${key}"]`);
        if (field) {
            if (field.type === 'checkbox') {
                field.checked = data[key];
            } else if (field.type === 'date') {
                field.value = new Date(data[key]).toISOString().split('T')[0];
            } else {
                field.value = data[key];
            }
        }
    });

    // Handle firstName + lastName -> fullName conversion for display
    if (data.firstName && data.lastName) {
        const fullNameField = form.querySelector('[name="fullName"]');
        if (fullNameField) {
            fullNameField.value = `${data.firstName} ${data.lastName}`.trim();
        }
    }
}

// Initialize form handlers
function initializeFormHandlers() {
    // Profile form handler
    const profileForm = document.getElementById('profileDetailsForm');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileSubmission);
    }

    // Organization form handler
    const organizationForm = document.getElementById('organizationDetailsForm');
    if (organizationForm) {
        organizationForm.addEventListener('submit', handleOrganizationSubmission);
    }

    // Skip button handler
    const skipButton = document.querySelector('.btn-secondary');
    if (skipButton) {
        skipButton.addEventListener('click', () => {
            showStep('organization');
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeFormHandlers();
    loadExistingData();
});

// Export functions for global access
window.registerForm = {
    handleProfileSubmission,
    handleOrganizationSubmission,
    showStep,
    loadExistingData
};
